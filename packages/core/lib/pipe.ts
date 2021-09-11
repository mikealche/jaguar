import * as Yup from "yup";

export type FunctionType<T extends Yup.ObjectSchema<any, any, any, any>, R> = (
  params: Yup.Asserts<T>
) => R;

const pipe = <T extends Yup.ObjectSchema<any, any, any, any>, R>(
  yupSchema: T,
  func: FunctionType<T, R>
) => {
  return async (params: Yup.Asserts<T>): Promise<R> => {
    //@ts-ignore
    const isValid = yupSchema.isValidSync(params);
    if (isValid) {
      return func(params);
    } else {
      throw new Error("Invalid params");
    }
  };
};

export default pipe;
