'use client';
import Link from 'next/link';
import { LucideIcon, Trash } from 'lucide-react';
import { StudentWithSubscription } from '../types/students';
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Pencil } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { useOpenModal } from '../stores/modalStore';
import { handleStatusService } from '../service/studentService';
import { formatName } from '../utils/formatName';

export interface CardProps {
  href: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}
export function Card({ item }: { item: CardProps }) {
  return (
    <Link href={item.href} className="w-full h-50 bg-white border-l-6 border-violet-600 p-4 rounded-xl shadow-xl flex flex-col gap-4">
      <span className="flex justify-between">
        <h2 className="text-2xl">{item.title}</h2>
        {<item.icon />}
      </span>
      <p className="text-gray-600">{item.desc}</p>
    </Link>
  );
}
type ContainerCardProps = {
  student: StudentWithSubscription
  children: React.ReactNode
  isActive: boolean
}
export function ContainerCard({student, children, isActive}: ContainerCardProps){
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const studentName = formatName(student.name as string)
   function handleDropState() {
     setIsOpen((prev) => !prev);
   }
  return (
    <li onClick={handleDropState}>
      <div className={`flex flex-col gap-4 border border-gray-300 p-2 shadow-xl rounded-sm content-center ${isActive ? 'inactive' : ''}`}>
        <span className={`grid grid-cols-[2fr_60px_20px] ${isActive ? '' : 'inactive'}`}>
          <p className={`text-base ${isActive ? 'text-black' : 'text-gray-500'}`}>{studentName}</p>
          <p className={`${isActive ? 'text-green-600' : 'inactive'}`}>{isActive ? 'Ativo' : 'Inativo'}</p>
          <button className="">{isOpen ? <ChevronUp /> : <ChevronDown />}</button>
        </span>
        <span className={`${isOpen ? 'block' : 'hidden'}`}>{children}</span>
      </div>
    </li>
  );
}
export function CardStudent({ student }: { student: StudentWithSubscription }) {
  const isActive = student.subscription.isActive

  return (
    <ContainerCard student={student} isActive={isActive}>
      <span className="flex flex-col gap text-sm min-w-full">
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
    </ContainerCard>
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
      <span className="flex gap-2 p-2 text-gray-700">
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="font-normal">{concatString}</p>
      </span>
    );
  }
}
export function CardUpdate({ student }: { student: StudentWithSubscription; index: number }) {
  const { handleModal } = useOpenModal();
  const [isActive, setIsActive] = useState<boolean>(student.subscription.isActive);
  function activeModal() {
    handleModal(true, student.id);
  }
  async function handleStatusStudent() {
    try {
      const { response, json } = await handleStatusService(student.id, !isActive);
      if (response) {
        setIsActive((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <ContainerCard isActive={isActive} student={student} >
      <span className={`flex justify-between gap-3 text-sm min-w-full`}>
        <button onClick={handleStatusStudent}>{isActive ? 'Desativar Cadastro' : 'Ativar Cadastro'}</button>
        <button onClick={activeModal} className="max-w-fit px-4 py-1.5 rounded-sm shadow bg-yellow-500 flex gap-2 justify-center items-center text-yellow-900">
          editar
          <Pencil size={15} />
        </button>
      </span>
    </ContainerCard>
  );
}
export function CardDelete({ student }: { student: StudentWithSubscription; index: number }) {
  const {handleModal} = useOpenModal()
  function activeModal(){
    handleModal(true, student.id)
  }

  return (
    <li key={student.id} className="flex justify-between border border-gray-300 shadow-md rounded-md px-2 py-1 md:px-4 items-center ">
      
      <p>{student.name}</p>
      <button className="flex justify-center gap-2 items-center bg-red-600 px-4 py-2 text-white shadow-xl rounded-md" onClick={activeModal}>
        {<Trash size={16} />}
      </button>
    </li>
  );
}