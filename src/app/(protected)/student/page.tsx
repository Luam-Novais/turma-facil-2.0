import { Card, CardProps } from "@/src/components/card";
import {Plus, Trash, Pencil, List} from 'lucide-react'

export default function Page() {
  return (
    <section className="flex flex-col gap-4 px-2 py-8 bg-gray-100 min-h-300">
        <h1>Central de Alunos</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 md:p-8">
        {studentPagesInfo.map((page, index) => {
          return <Card item={page} key={index} />;
        })}
      </div>
    </section>
  );
}

const studentPagesInfo: CardProps[] = [
  {
    href: '/student/create',
    icon: Plus,
    title: 'Criar',
    desc: 'Criar seu aluno.'
  },
  {
    href: '/student/update',
    icon: Pencil,
    title: 'Editar',
    desc: 'Edite a informações dos seu aluno.'
  },
  {
    href: '/student/delete',
    icon: Trash,
    title: 'Deletar',
    desc: 'Exclua um aluno.'
  },
  {
    href: '/student/get',
    icon: List,
    title: 'Ver alunos',
    desc: 'Veja todos os seus alunos com filtros.'
  },
//   {
//     href: '/student/',
//     icon: Plus,
//     title: '',
//   },
];