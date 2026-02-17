'use client';
import { ErrorInfo } from '@/src/components/error';
import { TitlePage } from '@/src/components/header';
import { ListToUpdate } from '@/src/components/list';
import { UpdateModal } from '@/src/components/modal';
import { getStudents } from '@/src/service/studentService';
import { useOpenModal } from '@/src/stores/modalStore';
import { StudentWithSubscription } from '@/src/types/students';
import { useEffect, useState } from 'react';

export default function Page() {
  const {modal, handleModal} = useOpenModal()
  const [students, setStudents] = useState<StudentWithSubscription[] | null>(null);

  useEffect(() => {
    async function get() {
      try {
        const { response, json } = await getStudents();
        console.log(response, json);
        if (response.ok) {
          setStudents(json);
        }
      } catch (error) {
        console.error(error)
      }
    }
    get();
  }, []);
  if (students === null) return <ErrorInfo message="Não foi possível carregar os alunos. Tente novamente mais tarde." />;
  if (students.length === 0) return <ErrorInfo message="Nenhum aluno encontrado. Tente criar um novo aluno." />;
  return (
    <div className="relative bg-gray-100 rounded-md  shadow-md p-2 md:p-4 min-h-screen h-full">
      <TitlePage title="Editar aluno" />
      <div className="flex flex-col gap-4 p-2 md:p-4 min-h-screen h-full bg-white rounded-md shadow-md">
        <h1>Lista de alunos | total: {students.length}</h1>
        {modal && <UpdateModal />}
        <ListToUpdate students={students} />
      </div>
    </div>
  );
}
