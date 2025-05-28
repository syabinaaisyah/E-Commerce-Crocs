import { hashSync, genSaltSync, compareSync } from "bcryptjs";

export const hashPassword = (password: string) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

export const comparePassword = (password: string, hashPassword: string) => {
  return compareSync(password, hashPassword);
};
