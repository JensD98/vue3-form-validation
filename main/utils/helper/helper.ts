import { isReactive, watch } from 'vue';
import { Field, TransformedField } from '../../composition/useValidation';
import useUid from '../../composition/useUid';
import Form from '../../Form';

const isField = (
  field: any
): field is Field<unknown, false> & Partial<Field<unknown, true>> =>
  typeof field === 'object' ? '$value' in field : false;

const isTransformedField = <T>(field: any): field is TransformedField<T> =>
  typeof field === 'object' ? '$uid' in field && '$value' in field : false;

export function transformFormData(form: Form, formData: any) {
  Object.entries(formData).forEach(([key, value]) => {
    if (isField(value)) {
      const uid = useUid();
      const formField = form.registerField(
        uid,
        value.$rules ?? [],
        value.$value
      );

      formData[key] = {
        $uid: uid,
        $value: formField.modelValue,
        $errors: formField.getErrors(),
        $hasError: formField.hasError(),
        $validating: formField.validating(),
        async $onBlur() {
          if (!formField.touched) {
            formField.touched = true;
            await form.validate(uid);
          }
        },
        async $validate() {
          await form.validate(uid);
        }
      };

      if (value.$manualValidation) {
        formField.touched = true;
        delete formData[key].$onBlur;
      } else {
        watch(formField.modelValue, () => {
          if (formField.touched) {
            form.validate(uid);
          }
        });
      }

      return;
    }

    if (typeof value === 'object') {
      transformFormData(form, value);
    }
  });
}

export function resetFields(formData: any, transformedFormData: any) {
  Object.entries(formData).forEach(([key, value]) => {
    const transformedValue = transformedFormData[key];

    if (isTransformedField(transformedValue)) {
      if (
        isReactive(transformedValue.$value) &&
        !Array.isArray(transformedValue.$value)
      ) {
        Object.assign(transformedValue.$value, value);
      } else {
        transformedValue.$value = value;
      }

      return;
    }

    if (typeof value === 'object') {
      resetFields(value, transformedFormData[key]);
    }
  });
}

export function cleanupForm(form: Form, formData: any) {
  Object.values(formData).forEach(value => {
    if (isTransformedField(value)) {
      form.onDelete(value.$uid);
      return;
    }

    if (typeof value === 'object') {
      cleanupForm(form, value);
    }
  });
}

export function getResultFormData(formData: any, resultFormData: any) {
  Object.entries(formData).forEach(([key, value]) => {
    if (isTransformedField(value)) {
      resultFormData[key] =
        typeof value.$value === 'object'
          ? JSON.parse(JSON.stringify(value.$value))
          : value.$value;
      return;
    }

    if (typeof value == 'object') {
      resultFormData[key] = {};
    } else {
      resultFormData[key] = value;
      return;
    }

    if (Array.isArray(value)) {
      resultFormData[key] = [];
    }

    getResultFormData(value, resultFormData[key]);
  });
}
