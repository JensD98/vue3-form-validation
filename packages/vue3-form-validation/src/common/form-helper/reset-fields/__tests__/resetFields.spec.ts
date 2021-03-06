import { Field, useValidation } from '../../../../composition/useValidation';

type FormData = {
  a: Field<string>;
  b: Field<string>;
  cs: {
    d: Field<string>;
    e: Field<string>;
  }[];
};

it('reset to default values', () => {
  const { form, resetFields } = useValidation<FormData>({
    a: { $value: '' },
    b: { $value: '' },
    cs: [
      { d: { $value: '' }, e: { $value: '' } },
      { d: { $value: '' }, e: { $value: '' } },
      { d: { $value: '' }, e: { $value: '' } }
    ]
  });

  form.a.$value = 'a';
  form.b.$value = 'b';
  form.cs[0].d.$value = 'd1';
  form.cs[0].e.$value = 'e1';
  form.cs[1].d.$value = 'd2';
  form.cs[1].e.$value = 'e2';
  form.cs[2].d.$value = 'd3';
  form.cs[2].e.$value = 'e3';

  resetFields();

  expect(form).toStrictEqual<typeof form>({
    a: {
      $uid: expect.any(Number),
      $value: '',
      $errors: [],
      $hasError: false,
      $validating: false,
      $onBlur: expect.any(Function)
    },
    b: {
      $uid: expect.any(Number),
      $value: '',
      $errors: [],
      $hasError: false,
      $validating: false,
      $onBlur: expect.any(Function)
    },
    cs: [
      {
        d: {
          $uid: expect.any(Number),
          $value: '',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        },
        e: {
          $uid: expect.any(Number),
          $value: '',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        }
      },
      {
        d: {
          $uid: expect.any(Number),
          $value: '',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        },
        e: {
          $uid: expect.any(Number),
          $value: '',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        }
      },
      {
        d: {
          $uid: expect.any(Number),
          $value: '',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        },
        e: {
          $uid: expect.any(Number),
          $value: '',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        }
      }
    ]
  });
});

it('reset to specific values', () => {
  const { form, resetFields } = useValidation<FormData>({
    a: { $value: '' },
    b: { $value: '' },
    cs: [
      { d: { $value: '' }, e: { $value: '' } },
      { d: { $value: '' }, e: { $value: '' } },
      { d: { $value: '' }, e: { $value: '' } }
    ]
  });

  resetFields({
    a: 'a',
    b: 'b',
    cs: [
      {
        d: 'd1',
        e: 'e1'
      },
      {
        d: 'd2',
        e: 'e2'
      }
    ]
  });

  expect(form).toStrictEqual<typeof form>({
    a: {
      $uid: expect.any(Number),
      $value: 'a',
      $errors: [],
      $hasError: false,
      $validating: false,
      $onBlur: expect.any(Function)
    },
    b: {
      $uid: expect.any(Number),
      $value: 'b',
      $errors: [],
      $hasError: false,
      $validating: false,
      $onBlur: expect.any(Function)
    },
    cs: [
      {
        d: {
          $uid: expect.any(Number),
          $value: 'd1',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        },
        e: {
          $uid: expect.any(Number),
          $value: 'e1',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        }
      },
      {
        d: {
          $uid: expect.any(Number),
          $value: 'd2',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        },
        e: {
          $uid: expect.any(Number),
          $value: 'e2',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        }
      },
      {
        d: {
          $uid: expect.any(Number),
          $value: '',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        },
        e: {
          $uid: expect.any(Number),
          $value: '',
          $errors: [],
          $hasError: false,
          $validating: false,
          $onBlur: expect.any(Function)
        }
      }
    ]
  });
});
