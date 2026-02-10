'use client';
import { SearchInput } from '@/src/components/input';
import { ListStudents } from '@/src/components/list';
import { StudentWithSubscription } from '@/src/types/students';
import { data_get, data_post } from '@/src/utils/fecthOp';
import { useState } from 'react';
import { useForm, SubmitHandler, set} from 'react-hook-form';

const students: StudentWithSubscription[] = [
  {
    id: 1,
    name: 'Luam pablo ',
    cpf: '18342258769',
    date_birth: '03/04/2002',
    phone: '24998763577',
    subscription: {
      id: 1,
      isActive: true,
      subscription_type: 'MENSAL_2X',
      start_date: '03/01/2026',
    },
  },
  {
    id: 2,
    name: 'gaby reis',
    cpf: '18342258769',
    date_birth: '03/04/2002',
    phone: '24998763577',
    subscription: {
      id: 1,
      isActive: false,
      subscription_type: 'MENSAL_1X',
      start_date: '03/01/2026',
      end_date: '07/02/2026',
    },
  },
  {
    id: 3,
    name: 'gaby reis campos',
    cpf: '18342258769',
    date_birth: '03/04/2002',
    phone: '24998763577',
    observations: 'Dor nas costas ao maximo esforco.',
    subscription: {
      id: 1,
      isActive: false,
      subscription_type: 'MENSAL_1X',
      start_date: '03/01/2026',
      end_date: '03/02/2026',
    },
  },
  {
    id: 4,
    name: 'gaby reis campos',
    cpf: '18342258769',
    date_birth: '03/04/2002',
    phone: '24998763577',
    observations: 'Dor nas costas ao maximo esforco.',
    subscription: {
      id: 2,
      isActive: true,
      subscription_type: 'MENSAL_1X',
      start_date: '03/01/2026',
    },
  },
];
type SearchStudentDTO = {searchValue: string}
export default function Home() {
  const { register, handleSubmit } = useForm<SearchStudentDTO>();
  const [searchedStudents, setSearchedStudents] = useState<StudentWithSubscription[] | null>(null)
  // const [students, setStudents] = useState<StudentWithSubscription[] | null>(null);

  const onSubmit:SubmitHandler<SearchStudentDTO> = async (data)=>{
       try {
         const { url, options } = data_get(`student/get-by-search?searchName=${data.searchValue}`);
         const response = await fetch(url, options as Request);
         const json = await response.json();
         if (!response.ok) throw new Error(json.messageError);
         setSearchedStudents(json);
       } catch (error:any) {
          console.error(error.message)
       }
  }
  console.log(searchedStudents)
  
  return (
    <main className="max-w-full p-4 flex flex-col gap-4 justify-center ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchInput placeholder="Buscar Aluno" type="text" register={register('searchValue')} onSubmit={onSubmit} />
      </form>
        <div className='flex flex-col gap-4'>
          <h1>Seus alunos</h1>
          <ListStudents students={students}/>
        </div>
    </main>
  );
}
