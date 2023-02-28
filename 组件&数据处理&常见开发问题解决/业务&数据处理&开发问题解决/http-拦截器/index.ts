import { userApi } from "./path/user";
import { shoporderApi } from "./path/shoporder";

export const api = {
  ...userApi,
  ...shoporderApi,
};
