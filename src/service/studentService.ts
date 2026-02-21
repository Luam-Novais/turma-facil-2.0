import { CreateStudentDTO, UpdateStudentDTO } from '../types/students';
import { data_del, data_get, data_post,  data_put, data_put_no_body } from '../utils/fecthOpt';

export async function getStudents() {
  const { url, options } = data_get('student/get');
  const response = await fetch(url, options as Request)
  const json = await response.json()
  return {response, json}
}export async function getStudentsBySearch(searchValue: string) {
  const { url, options } = data_get(`student/get-by-search?searchName=${searchValue}`);
  const response = await fetch(url, options as Request);
  const json = await response.json();
  return { response, json };
}
export async function createStudentService(data: CreateStudentDTO) {
  const { url, options } = data_post('student/create', data);
  const response = await fetch(url, options as RequestInit);
  const json = await response.json();

  return { response, json };
}
export async function updateStudentService(student_id: number, data:UpdateStudentDTO){
    const { url, options } = data_put(`student/update?id=${student_id}`, data);
    const response = await fetch(url, options as RequestInit)
    const json = await response.json()
    return { response, json };
}
export async function handleStatusService(student_id: number, currentStatus: boolean) {
  const status = returnStatusString(currentStatus)
  const dataStatus = {status: currentStatus}
  const { url, options } = data_put(`student/${status}?id=${student_id}`, dataStatus); 
  const response = await fetch(url, options as RequestInit);
  const json = await response.json();
  return { response, json };
}
export async function deleteStudentService(studentId: number){
  const {url, options} = data_del(`student/delete?id=${studentId}`)
  const response = await fetch(url, options as Request)
  const json = await response.json()
  return {response, json}
}
function returnStatusString(status:boolean){
  return status ? 'active' : 'desactive'
}