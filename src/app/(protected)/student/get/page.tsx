'use client';
import { ErrorInfo } from '@/src/components/error';
import { SearchInput } from '@/src/components/input';
import { ListStudents } from '@/src/components/list';
import { getStudents, getStudentsBySearch } from '@/src/service/studentService';
import { Spinner } from '@/src/components/spinner';
import { StudentWithSubscription } from '@/src/types/students';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PageContainer } from '@/src/components/container';
import { TitlePage } from '@/src/components/header';

type SearchStudentDTO = { searchValue: string };
export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<SearchStudentDTO>();
  const [searchedStudents, setSearchedStudents] = useState<StudentWithSubscription[] | null>(null);
  const [students, setStudents] = useState<StudentWithSubscription[] | null>(null);
  const [error, setError] = useState<string | null>(null);


  const cleanSearch = () => {
    setSearchedStudents(null);
    reset();
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
  if (loading)
    return (
      <div className="flex justify-center content-center pt-10">
        <Spinner />
      </div>
    );

  return (
    <PageContainer>
      <TitlePage title="Central de Alunos" href="/student" />
      <form>
        <SearchInput placeholder="Buscar Aluno" type="text" handleChange={handleChange} />
      </form>
      <div className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-md">
        <span>
          <h1>{searchedStudents ? `Resultados para a busca: ${searchValue}` : 'Seus Alunos'}</h1>
          {searchedStudents && (
            <button onClick={cleanSearch} className="text-gray-500 border-b border-gray-300 ">
              Limpar busca
            </button>
          )}
        </span>
        {students && (
          <>
            <h3>Total: {students.length}</h3>
            {searchedStudents ? <ListStudents students={searchedStudents} /> : <ListStudents students={students} />}
          </>
        )}
      </div>
    </PageContainer>
  );
}
