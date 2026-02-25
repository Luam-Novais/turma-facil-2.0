import { data_post } from '../utils/fecthOpt';
import { AuthCredentials,TeacherCreateDTO } from '../types/auth';
export async function loginService(data: AuthCredentials) {
  const { url, options } = data_post('auth/login', data);
  const res = await fetch(url, options as RequestInit);
  const json = await res.json();
  return { res, json };
}
export async function createAccountService(data: TeacherCreateDTO){
  const { url, options } = data_post('auth/create-account', data);
  const response = await fetch(url, options as RequestInit);
  const json = await response.json();
  return { response, json };
}