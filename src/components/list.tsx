import { ElementType} from 'react';
import { StudentWithSubscription } from '../types/students';
import { CardStudent} from './card';
import { ErrorInfo } from './error';

export function ListStudents({ students }: { students: StudentWithSubscription[] }) {

  if(students.length === 0) return <ErrorInfo message="Nenhum aluno encontrado. Tente criar um novo aluno."/>;
  return (
      <ul className="flex flex-col gap-4">
        {students.map((student) => {
          return <CardStudent key={student.id} student={student} />;
        })}
      </ul>
  );
}
type ListProps = {
  TypeCard: ElementType
  students: StudentWithSubscription[]
}
export function List({TypeCard, students}: ListProps){
return (
  <ul className="flex flex-col gap-4 min-h-screen h-full">
    {students.map((student, index) => {
      return <TypeCard student={student} index={index} key={student.id} />;
    })}
  </ul>
);
}