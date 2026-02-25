'use client';
import { Card} from '@/src/components/card';
import { Plus, List } from 'lucide-react';

export default function Page() {
  return (
    <section className="flex flex-col gap-4 px-2 py-8 bg-gray-100 min-h-300">
        <h1>Central de Pagamentos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
        {paymentsPagesInfo.map((payment) => {
          return <Card item={payment} key={payment.title} />;
        })}
      </div>
    </section>
  );
}

const paymentsPagesInfo = [
  {
    href: '/payment/get',
    icon: List,
    title: 'Ver Pagamentos',
    desc: 'Veja todos os seus pagamentos por completo ou intervalo de datas.',
  },
  {
    href: '/payment/create',
    icon: Plus,
    title: 'Criar Pagamento',
    desc: 'Adicione os pagamentos feitos pelos alunos.',
  },
];
