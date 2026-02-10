import { data_post } from "../utils/fecthOp";
import { AuthCredentials } from "../types/auth";
export async function loginService(data: AuthCredentials) {
  const { url, options } = data_post('auth/login', data);
  const res = await fetch(url, options as RequestInit);
  const json = await res.json();
  return { res, json };
}
