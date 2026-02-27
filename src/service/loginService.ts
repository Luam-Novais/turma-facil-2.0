import { AuthCredentials,TeacherCreateDTO } from '../types/auth';
export async function loginService(data: AuthCredentials) {
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data),
   });
  const json = await response.json();
  if(response.ok){
    localStorage.setItem('token', json.token);
  }
  return { response, json };
}
export async function createAccountService(data: TeacherCreateDTO){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/create-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });
  const json = await response.json();
  return { response, json };
}