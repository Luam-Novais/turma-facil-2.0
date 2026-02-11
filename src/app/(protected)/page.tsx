'use client';
import { ErrorInfo } from '@/src/components/error';
import { SearchInput } from '@/src/components/input';
import { CardStudent, ListStudents } from '@/src/components/list';
import { Spinner } from '@/src/components/spinner';
import { StudentWithSubscription } from '@/src/types/students';
import { data_get, data_post } from '@/src/utils/fecthOp';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';

type SearchStudentDTO = {searchValue: string}
export default function Home() {
  const [loading,setLoading] = useState<boolean>(false)
  const [searchValue, setSeatchValue] = useState<string | null>(null)
  const { register, handleSubmit,reset } = useForm<SearchStudentDTO>();
  const [searchedStudents, setSearchedStudents] = useState<StudentWithSubscription[] | null>(null)
  const [students, setStudents] = useState<StudentWithSubscription[] | null>(null);

  const cleanSearch = ()=>{
    setSearchedStudents(null)
    reset()
  }
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true)
        const { url, options } = data_get('student/get');
        const response = await fetch(url, options as Request);
        const json = await response.json();
        if (!response.ok) throw new Error(json.messageError);
        setStudents(json);
      } catch (error:any) {
        console.error(error.message);
      } finally{
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])
  const onSubmit:SubmitHandler<SearchStudentDTO> = async (data)=>{
       try {
        setLoading(true)
        setSeatchValue(data.searchValue)
         const { url, options } = data_get(`student/get-by-search?searchName=${data.searchValue}`);
         const response = await fetch(url, options as Request);
         const json = await response.json();
         if (!response.ok) throw new Error(json.messageError);
         setSearchedStudents(json);
       } catch (error:any) {
          console.error(error.message)
       }finally{
        setLoading(false)
       }
  }
  if(loading) return (
    <div className='flex justify-center content-center pt-10'>
      <Spinner />
    </div>
  );
  if(students === null) return <ErrorInfo message="Não foi possível carregar os alunos. Tente novamente mais tarde." />;
  if(students.length === 0) return <ErrorInfo message="Nenhum aluno encontrado. Tente criar um novo aluno." />;
  if(searchedStudents && searchedStudents.length === 0) return <ErrorInfo message="Nenhum aluno encontrado com esse nome. Tente novamente." />
  
  return (
    <main className="max-w-full p-4 flex flex-col gap-4 justify-center ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchInput placeholder="Buscar Aluno" type="text" register={register('searchValue')} />
      </form>
      <div className="flex flex-col gap-4">
        <span>
          <h1>{searchedStudents ? `Resultados para a busca: ${searchValue}` : 'Seus Alunos'}</h1>
          {searchedStudents && <button onClick={cleanSearch} className='text-gray-500 border-b-2 border-gray-300 '>Limpar busca</button>}
        </span>
        {searchedStudents ? <ListStudents students={searchedStudents} /> : <ListStudents students={students} />}
      </div>
    </main>
  );
}
