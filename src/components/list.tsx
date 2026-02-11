import { StudentWithSubscription } from '../types/students';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate } from '../utils/formatDate';

export  function ListStudents({ students }: { students: StudentWithSubscription[] }) {
    return (
      <div className='flex flex-col gap-4'>
        <h1>Total: {students.length}</h1>
        <ul>
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
