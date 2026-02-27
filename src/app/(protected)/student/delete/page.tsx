'use client';
import { useEffect } from 'react';
import { getStudents, getStudentsBySearch } from '@/src/service/studentService';
import { ErrorInfo } from '@/src/components/error';
import { PageContainer } from '@/src/components/container';
import { TitlePage } from '@/src/components/header';
import { SearchInput } from '@/src/components/input';
import { StudentWithSubscription } from '@/src/types/students';
import { useState } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';
import { Spinner } from '@/src/components/spinner';
import { List } from '@/src/components/list';
import { CardDelete } from '@/src/components/card';
import { useOpenModal } from '@/src/stores/modalStore';
import { DeleteModal } from '@/src/components/modal';
import {toast, ToastContainer} from 'react-toastify'
import { useToastStore } from '@/src/stores/toastStore';


type SearchStudentDTO = { searchValue: string };
export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<SearchStudentDTO>();
  const [searchedStudents, setSearchedStudents] = useState<StudentWithSubscription[] | null>(null);
  const [students, setStudents] = useState<StudentWithSubscription[] | null>(null);
  const {modal} = useOpenModal()

    const { toastState } = useToastStore();
    const notifyToast = (message: string, state: 'error' | 'success') => {
      toast(message, {
        type: state,
      });
    };
    useEffect(() => {
      if (toastState.isVisible) {
        notifyToast(toastState.message, toastState.state as 'error' | 'success');
      }
    }, [toastState]);

  const cleanSearch = () => {
    setSearchedStudents(null);
    setSearchValue(null)
  };
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const { response, json } = await getStudents();
        if (!response.ok) throw new Error(json.messageError);
        setStudents(json);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);
      const fetchSearchStudent = async (search: string) => {
        try {
          const { response, json } = await getStudentsBySearch(search);
          setLoading(true);
          if (response.ok) {
            setSearchedStudents(json);
          } else {
            setError(json.messageError);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {
        if (!searchValue || searchValue.length < 0 || searchValue === null) {
          setError('Pesquisa inváldia.');
          return;
        }
        const delay = setTimeout(() => {
          fetchSearchStudent(searchValue);
        }, 600);

        return () => clearTimeout(delay);
      }, [searchValue]);
   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setSearchValue(e.target.value);
    }
    useEffect(() => {
      if (modal) {
       window.scrollTo(0,0)
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'auto';
        };
      }
    });
  if (loading)
    return (
      <div className="flex justify-center content-center pt-10">
        <Spinner />
      </div>
    );
  if (students === null) return <ErrorInfo message="Não foi possível carregar os alunos. Tente novamente mais tarde." />;
  if (students.length === 0) return <ErrorInfo message="Nenhum aluno encontrado. Tente criar um novo aluno."/>;
  if (searchedStudents && searchedStudents.length === 0) return <ErrorInfo message="Nenhum aluno encontrado com esse nome. Tente novamente."/ >;


  return (
    <PageContainer>
      <ToastContainer />
      <TitlePage title="Deletar aluno" href="/student" />
      <div className="flex flex-col gap-4 p-4 min-h-screen h-full bg-white rounded-md">
        <SearchInput placeholder="Buscar Aluno" type="text" handleChange={handleChange} />
        {searchedStudents && (
          <button className="text-gray-500 text-left py-4 px-2" onClick={cleanSearch}>
            Limpar busca
          </button>
        )}
        <div className="flex flex-col gap-4">
          {modal && <DeleteModal />}
          {searchedStudents && (
            <span>
              <h3>
                Encontramos {searchedStudents.length} para a busca {searchValue}
              </h3>
            </span>
          )}
          {<List TypeCard={CardDelete} students={searchedStudents ? searchedStudents : students} />}
        </div>
      </div>
    </PageContainer>
  );
}
