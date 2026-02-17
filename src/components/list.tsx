import { Student, StudentWithSubscription } from '../types/students';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Pencil } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { useOpenModal } from '../stores/modalStore';
import { handleStatusService } from '../service/studentService';

export function ListStudents({ students }: { students: StudentWithSubscription[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h1>Total: {students.length}</h1>
      <ul className="flex flex-col gap-4">
        {students.map((student) => {
          return <CardStudent key={student.id} student={student} />;
        })}
      </ul>
    </div>
  );
}
export function CardStudent({ student }: { student: StudentWithSubscription }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function handleDropState() {
    setIsOpen((prev) => !prev);
  }
  return (
    <li key={student.id} onClick={handleDropState}>
      <div className={`flex flex-col gap-4 border-2 border-gray-300 p-2 shadow-xl rounded-sm content-center ${!student.subscription.isActive ? 'inactive' : ''}`}>
        <span className="grid grid-cols-[2fr_60px_20px]">
          <p className="text-base">{student.name}</p>
          <p className={`${student.subscription.isActive ? 'text-green-400' : 'inactive'}`}>{student.subscription.isActive ? 'Ativo' : 'Inativo'}</p>
          <button className="transition-all">{isOpen ? <ChevronUp /> : <ChevronDown />}</button>
        </span>
        <span className={`${isOpen ? 'block' : 'hidden'} flex flex-col gap-3 text-sm min-w-full`}>
          <InfoCard title="Telefone: " desc={student.phone} />
          <InfoCard title="Vínculo: " desc={student.subscription.subscription_type} />
          <InfoCard title="Data de inicio: " desc={formatDate(new Date(student.subscription.start_date as Date))} />
          {!student.subscription.isActive && <InfoCard title="Data de encerramento" desc={student.subscription.end_date as string} />}
          {student.observations && (
            <span>
              <h4 className="font-semibold text-sm">Observações: </h4>
              <p>{student.observations}</p>
            </span>
          )}
        </span>
      </div>
    </li>
  );
}
type InfoCardProps = {
  title?: string;
  desc?: string;
  className?: string;
};
function InfoCard({ title, desc }: InfoCardProps) {
  if (desc) {
    const formatFirst = desc.slice(0, 1).toUpperCase();
    const concatString = formatFirst.concat(desc.slice(1));
    return (
      <span className="flex gap-2">
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="font-normal">{concatString}</p>
      </span>
    );
  }
}

export function ListToUpdate({ students }: { students: StudentWithSubscription[] }) {
  return (
    <ol className="flex flex-col gap-4 min-h-screen h-full">
      {students.map((student, index) => {
        return <CardUpdate student={student} index={index} key={student.id} />;
      })}
    </ol>
  );
}

export function CardUpdate({ student, index }: { student: StudentWithSubscription; index: number }) {
  const { handleModal } = useOpenModal();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(student.subscription.isActive);
  function activeModal() {
    handleModal(true, student.id);
  }
  function handleDropState() {
    setIsOpen((prev) => !prev);
  }
  async function handleStatusStudent(){
    try {
      const { response, json } = await handleStatusService(student.id, !isActive);
      if (response) {
        setIsActive((prev) => !prev);
      }
      
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <li key={student.id} onClick={handleDropState}>
      <div className={`flex flex-col gap-4 border-2 border-gray-300 p-2 shadow-xl rounded-sm content-center ${!isActive? 'inactive' : ''}`}>
        <span className="grid grid-cols-[2fr_60px_20px]">
          <p className="text-base">{student.name}</p>
          <p className={`${isActive? 'text-green-400' : 'inactive'}`}>{isActive? 'Ativo' : 'Inativo'}</p>
          <button>{isOpen ? <ChevronUp /> : <ChevronDown />}</button>
        </span>
        <span className={`${isOpen ? 'block' : 'hidden'} flex justify-between gap-3 text-sm min-w-full`}>
          <button onClick={handleStatusStudent}>{isActive? 'Desativar Cadastro' : 'Ativar Cadastro'}</button>
          <button onClick={activeModal} className="max-w-fit px-4 py-1.5 rounded-sm shadow bg-yellow-500 flex gap-2 justify-center items-center text-yellow-900">
            editar
            <Pencil size={15} />
          </button>
        </span>
      </div>
    </li>
  );
}
