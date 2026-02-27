'use client';
import { ErrorInfo } from '@/src/components/error';
import { SearchInput } from '@/src/components/input';
import { List, ListStudents } from '@/src/components/list';
import { getStudents, getStudentsBySearch } from '@/src/service/studentService';
import { Spinner } from '@/src/components/spinner';
import { StudentWithSubscription } from '@/src/types/students';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CardStudent } from '@/src/components/card';

type SearchStudentDTO = { searchValue: string };
export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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
    
    const fetchSearchStudent = async (search: string) => {
      try {
        const { response, json } = await getStudentsBySearch(search);
        setLoading(true)
        if (response.ok) {
          setSearchedStudents(json);
        }else{
          setError(json.messageError)
        }
      } catch (error) {
        console.error(error)
      }
      finally{
        setLoading(false)
      }
    };
    useEffect(() => {
      if(!searchValue || searchValue.length < 0 || searchValue === null){
        setError('Pesquisa inváldia.')
        return
      }
      const delay = setTimeout(()=>{
        fetchSearchStudent(searchValue)
      }, 600)

      return ()=> clearTimeout(delay)
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

    return (
      <main className="max-w-full p-4 flex flex-col gap-4 justify-center ">
        <form action="">
          <SearchInput placeholder="Buscar Aluno" type="text" handleChange={handleChange} />
          {searchedStudents && <button onClick={cleanSearch}>Limpar busca</button>}
        </form>
        <div className="flex flex-col gap-4">
          {searchedStudents && (
            <div>
              <List TypeCard={CardStudent} students={searchedStudents} />
            </div>
          )}
          {searchedStudents && searchedStudents.length === 0 && <ErrorInfo message="Nenhum aluno encontrado com esse nome. Tente novamente." />}
          {students && <List TypeCard={CardStudent} students={students} />}
        </div>
      </main>
    );
}
