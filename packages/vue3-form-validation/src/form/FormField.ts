import { computed, isReactive, isRef, reactive, ref, unref } from 'vue';
import { isArray, isObject, isDefined } from '../common';
import { deepCopy } from '../common/deep-copy/deep-copy';
import { Rule } from '../composition/useValidation';

export class FormField {
  private _errors: (string | null)[];
  private _initialModelValue: any;

  name: string;
  rulesValidating = ref(0);
  modelValue: ReturnType<typeof ref> | ReturnType<typeof reactive>;
  touched = false;
  errors = computed(() => this._errors.filter(isDefined));
  validating = computed(() => this.rulesValidating.value > 0);
  hasError = computed(() => this.errors.value.length > 0);

  constructor(name: string, modelValue: any, rules: Rule[]) {
    this.name = name;
    this._errors = reactive(rules.map(() => null));

    if (isRef(modelValue) || isReactive(modelValue)) {
      this.modelValue = modelValue;
      this._initialModelValue = deepCopy(unref(modelValue));
    } else if (isObject(modelValue)) {
      this.modelValue = reactive(modelValue);
      this._initialModelValue = deepCopy(this.modelValue);
    } else {
      this.modelValue = ref(modelValue);
      this._initialModelValue = deepCopy(unref(modelValue));
    }
  }

  setError(ruleNumber: number, error: string | null) {
    this._errors[ruleNumber] = error;
  }

  reset(toDefaultValues: boolean) {
    this.touched = false;

    if (toDefaultValues) {
      if (isRef(this.modelValue)) {
        if (isArray(this.modelValue.value)) {
          this.modelValue.value = deepCopy(this._initialModelValue);
        } else {
          this.modelValue.value = this._initialModelValue;
        }
      } else {
        const copy = deepCopy(this._initialModelValue);
        Object.assign(this.modelValue, copy);
      }
    }

    Object.assign(
      this._errors,
      this._errors.map(() => null)
    );
  }
}
