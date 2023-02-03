import { z } from "zod";

type AnyObj = Record<PropertyKey, unknown>;

type ZodObj<T extends AnyObj> = {
  [key in keyof T]: z.ZodType<T[key]>;
};

export const zObject = <T extends AnyObj>(arg: ZodObj<T>) => z.object(arg);
