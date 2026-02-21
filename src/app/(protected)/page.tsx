'use client';
import { ErrorInfo } from '@/src/components/error';
import { SearchInput } from '@/src/components/input';
import { ListStudents } from '@/src/components/list';
import { getStudents, getStudentsBySearch } from '@/src/service/studentService';
import { Spinner } from '@/src/components/spinner';
import { StudentWithSubscription } from '@/src/types/students';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type SearchStudentDTO = { searchValue: string };
export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<SearchStudentDTO>();
  const [searchedStudents, setSearchedStudents] = useState<StudentWithSubscription[] | null>(null);
  const [students, setStudents] = useState<StudentWithSubscription[] | null>(null);

  const cleanSearch = () => {
    setSearchedStudents(null);
    reset();
  };
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
       const {response, json} = await getStudents()
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
  const onSubmit: SubmitHandler<SearchStudentDTO> = async (data) => {
    try {
      setLoading(true);
      setSearchValue(data.searchValue);
      const {response, json} = await getStudentsBySearch(data.searchValue)
      if (!response.ok) throw new Error(json.messageError);
      setSearchedStudents(json);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading)
    return (
      <div className="flex justify-center content-center pt-10">
        <Spinner />
      </div>
    );
  if (students === null) return <ErrorInfo message="Não foi possível carregar os alunos. Tente novamente mais tarde."  href='/' />;
  if (students.length === 0) return <ErrorInfo message="Nenhum aluno encontrado. Tente criar um novo aluno."  href='/' />;
    if (searchedStudents && searchedStudents.length === 0) return <ErrorInfo message="Nenhum aluno encontrado com esse nome. Tente novamente." href='/'/>;

    return (
      <main className="max-w-full p-4 flex flex-col gap-4 justify-center ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchInput placeholder="Buscar Aluno" type="text" register={register('searchValue')} />
        </form>
        <div className="flex flex-col gap-4">
          <span>
            <h1>{searchedStudents ? `Resultados para a busca: ${searchValue}` : 'Seus Alunos'}</h1>
            {searchedStudents && (
              <button onClick={cleanSearch} className="text-gray-500 border-b border-gray-300 ">
                Limpar busca
              </button>
            )}
          </span>
          <>
            <h3>Total: {students.length}</h3>
            {searchedStudents ? <ListStudents students={searchedStudents} /> : <ListStudents students={students} />}
          </>
        </div>
      </main>
    );
}
