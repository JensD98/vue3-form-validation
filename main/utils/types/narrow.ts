// https://github.com/microsoft/TypeScript/issues/30680#issuecomment-752725353

type Cast<A, B> = A extends B ? A : B;

type Narrowable = string | number | bigint | boolean;

export type Narrow<A, K = ''> = Cast<
  A,
  | (A extends Narrowable ? (K extends '$manualValidation' ? A : never) : never)
  | {
      [K in keyof A]: Narrow<A[K], K>;
    }
>;
