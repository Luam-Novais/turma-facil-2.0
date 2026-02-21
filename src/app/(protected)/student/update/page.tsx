'use client';
import { ErrorInfo } from '@/src/components/error';
import { TitlePage } from '@/src/components/header';
import { List} from '@/src/components/list';
import { CardUpdate } from '@/src/components/card';
import { UpdateModal } from '@/src/components/modal';
import { getStudents } from '@/src/service/studentService';
import { useOpenModal } from '@/src/stores/modalStore';
import { useToastStore } from '@/src/stores/toastStore';
import { StudentWithSubscription } from '@/src/types/students';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { PageContainer } from '@/src/components/container';
import { Spinner } from '@/src/components/spinner';


export default function Page() {
  const { modal, handleModal } = useOpenModal();
  const [loading, setLoading] = useState<boolean>(false)
  const [students, setStudents] = useState<StudentWithSubscription[] | null>(null);
  const { toastState } = useToastStore();
  const notifySucess = (message: string, state: 'error' | 'success') => {
    toast(message, {
      type: state,
    });
  };
  useEffect(() => {
    if (toastState.isVisible) {
      notifySucess(toastState.message, toastState.state as 'error' | 'success');
    }
  }, [toastState]);
  useEffect(() => {
    async function get() {
      try {
        setLoading(true)
        const { response, json } = await getStudents();
        if (response.ok) {
          setStudents(json);
        }
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    }
    get();
  }, []);

  if(loading) return <Spinner/>
  if (students === null) return <ErrorInfo message="Não foi possível carregar os alunos. Tente novamente mais tarde." href='/update'/>;
  if (students.length === 0) return <ErrorInfo message="Nenhum aluno encontrado. Tente criar um novo aluno." href='/student/update' />;

  return (
    <PageContainer>
      <ToastContainer />
      <TitlePage title="Editar aluno" />
      <div className="flex flex-col gap-4 p-4 min-h-screen h-full bg-white rounded-md shadow-md">
        <h1>Lista de alunos</h1>
        <p>Total: {students.length}</p>
        {modal && <UpdateModal/>}
        <List students={students} TypeCard={CardUpdate}/>
      </div>
    </PageContainer>
  );
}
