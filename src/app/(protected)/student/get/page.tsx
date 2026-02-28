'use client';
import { ErrorInfo } from '@/src/components/error';
import { SearchInput } from '@/src/components/input';
import { List} from '@/src/components/list';
import { CardStudent } from '@/src/components/card';
import { getStudents, getStudentsBySearch } from '@/src/service/studentService';
import { Spinner } from '@/src/components/spinner';
import { StudentWithSubscription } from '@/src/types/students';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PageContainer } from '@/src/components/container';
import { TitlePage } from '@/src/components/header';
import { ButtonCleanSearch } from '@/src/components/button';

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

     if (students === null) return <ErrorInfo message="Não foi possível carregar os alunos. Tente novamente mais tarde." />;
     if (students.length === 0) return <ErrorInfo message="Nenhum aluno encontrado. Tente criar um novo aluno." />;
     if (searchedStudents && searchedStudents.length === 0) return <ErrorInfo message="Nenhum aluno encontrado com esse nome. Tente novamente." />;
  return (
    <PageContainer>
      <TitlePage title="Central de Alunos" href="/student" />
      <form className="flex flex-col gap-4 items-start">
        <SearchInput placeholder="Buscar Aluno" type="text" handleChange={handleChange} />
        {searchedStudents && <ButtonCleanSearch cleanSearch={cleanSearch}>Limpar busca</ButtonCleanSearch>}
      </form>
      <div className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-md">
        {searchedStudents ? (
          <span>
            <h3>
              Encontramos {searchedStudents.length} resultado para a busca "{searchValue}"
            </h3>
          </span>
        ) : (
          <h1>Seus Alunos</h1>
        )}
        {searchedStudents && searchedStudents.length === 0 && <ErrorInfo message="Nenhum aluno encontrado com esse nome. Tente novamente." />}
        {students && students.length === 0 && <ErrorInfo message="Nenhum aluno encontrado com esse nome. Tente novamente." />}
        {<List TypeCard={CardStudent} students={searchedStudents ? searchedStudents : students} />}
      </div>
    </PageContainer>
  );
}
