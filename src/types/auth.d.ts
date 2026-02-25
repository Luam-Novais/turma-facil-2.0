export type AuthCredentials = {
  identifier: string;
  password: string;
};
export interface TeacherCreateDTO {
  name: string;
  password: string;
  identifier: string;
}