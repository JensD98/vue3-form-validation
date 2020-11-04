import { isReactive, isRef, reactive, ref, watch } from 'vue';
import useUid from './useUid';
import Form from '../Form';
import { path } from '../utils';

export type SimpleRule<T = any> = (
  value: T
) => Promise<string | unknown> | string | unknown;
export type KeyedRule<T = any> = { key: string; rule: SimpleRule<T> };
export type Rule<T = any> = SimpleRule<T> | KeyedRule<T>;

export type Field<T> = {
  value: T;
  rules?: Rule<T>[];
};

export type TransformedField<T> = {
  uid: number;
  value: T;
  errors: string[];
  validating: boolean;
};

type ValidateFormData<T> = T extends unknown
  ? {
      [K in keyof T]: T[K] extends { value: infer TValue }
        ? Field<TValue>
        : T[K] extends Array<infer TArray>
        ? ValidateFormData<TArray>[]
        : never;
    }
  : never;

type UseValidation<T> = T extends unknown
  ? {
      [K in keyof T]: T[K] extends { value: infer TValue }
        ? TransformedField<TValue>
        : T[K] extends Array<infer TArray>
        ? UseValidation<TArray>[]
        : never;
    }
  : never;

type FormData<T> = T extends unknown
  ? {
      [K in keyof T]: T[K] extends { value: infer TValue }
        ? TValue
        : T[K] extends Array<infer TArray>
        ? FormData<TArray>[]
        : never;
    }
  : never;

export const isSimpleRule = (rule: Rule): rule is SimpleRule =>
  typeof rule === 'function';

export const isKeyedRule = (rule: Rule): rule is KeyedRule =>
  'key' in rule &&
  'rule' in rule &&
  typeof rule.key === 'string' &&
  isSimpleRule(rule.rule);

export const isField = <T>(field: any): field is Field<T> => 'value' in field;

export const isTransformedField = <T>(
  field: any
): field is TransformedField<T> =>
  'uid' in field &&
  'value' in field &&
  'errors' in field &&
  'validating' in field;

/**
 *
 * @param form Form object with methods like `registerField` and `validate`.
 * @param formData The form data to transform.
 * @description In place transformation of a given form data object.
 * Recursively add's some metadata to every form field.
 */
export function transformFormData(form: Form, formData: any) {
  Object.entries(formData).forEach(([key, value]) => {
    if (isField(value)) {
      const uid = useUid();
      const formField = form.registerField(uid, value.rules ?? []);

      formField.modelValue = value.value;

      formData[key] = {
        uid,
        value: isReactive(formData[key]) ? value.value : ref(value.value),
        errors: formField.getErrors(),
        validating: formField.validating(),
        async onBlur() {
          if (!formField.touched) {
            formField.touched = true;
            await form.validate(uid);
          }
        }
      };

      const watchHandler = async (modelValue: unknown) => {
        formField.modelValue = modelValue;
        if (formField.touched) {
          await form.validate(uid);
        }
      };

      if (isRef(formData[key].value)) {
        watch(formData[key].value, watchHandler);
      } else {
        watch(() => formData[key].value, watchHandler);
      }

      return;
    }

    transformFormData(form, value);
  });
}

export function cleanupForm(form: Form, formData: any) {
  Object.values(formData).forEach(value => {
    if (isTransformedField(value)) {
      form.onDelete(value.uid);
      return;
    }

    cleanupForm(form, value);
  });
}

export function getResultFormData(formData: any, resultFormData: any) {
  for (const [key, value] of Object.entries(formData)) {
    if (isTransformedField<any>(value)) {
      resultFormData[key] = value.value;
      continue;
    }

    if (Array.isArray(value) && value.length) {
      resultFormData[key] = [];
    }

    if (!isNaN(key as any)) {
      resultFormData[key] = {};
    }

    getResultFormData(value, resultFormData[key]);
  }
}

export function useValidation<T>(formData: T & ValidateFormData<T>) {
  const form = new Form();
  const formDataRef = reactive(formData) as any;

  transformFormData(form, formDataRef);

  return {
    form: formDataRef as UseValidation<T>,
    onSubmit: (success: (formData: FormData<T>) => void) => {
      form.validateAll().then(hasError => {
        if (!hasError) {
          const resultFormData = {} as any;
          getResultFormData(formDataRef, resultFormData);
          success(resultFormData);
        }
      });
    },
    add(pathToArray: (string | number)[], value: Record<string, unknown>) {
      const xs = path(pathToArray, formDataRef);

      transformFormData(form, value);

      if (Array.isArray(xs)) {
        xs.push(value);
      }
    },
    remove(pathToArray: (string | number)[], index: number) {
      const xs = path(pathToArray, formDataRef);

      if (Array.isArray(xs)) {
        const deleted = xs.splice(index, 1);
        deleted.forEach(deleted => cleanupForm(form, deleted));
      }
    }
  };
}
