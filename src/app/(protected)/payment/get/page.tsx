'use client';
import { PageContainer } from '@/src/components/container';
import { TitlePage } from '@/src/components/header';
import { PaymentWithStudent } from '@/src/types/payment';
import { getPaymentsService, getAllPaymentsService, getpaymentsByPeriodService, getCurrentMonthPaymentsService, createReportService} from '@/src/service/paymentService';
import { useEffect, useState } from 'react';
import { ListFilter } from 'lucide-react';
import {  CardPayment } from '@/src/components/card';
import { Spinner } from '@/src/components/spinner';

export default function Page() {
  const [payments, setPayments] = useState<PaymentWithStudent[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  async function fetchPayments() {
    try {
      setLoading(true);
      const { response, json } = await getPaymentsService('get-payments');
      if (response.ok) {
        setPayments(json);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  async function getByPeriod(period: number) {
    setPayments(null);
    try {
      setLoading(true);
      const { response, json } = await getpaymentsByPeriodService(period);
      if (response.ok) setPayments(json);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  async function getCurrentMonthPayments() {
    setPayments(null);
    try {
      setLoading(true);
      const { response, json } = await getPaymentsService('get-current-month-payments');
      if (response.ok) setPayments(json);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await getByPeriod(+e.target.value);
  }
  async function createReport(){
   if(payments){
     const {response} = await createReportService(payments);
     if(response.ok){

     }
   }
  }
  useEffect(() => { 
    fetchPayments();
  }, []);
  return (
    <PageContainer>
      <TitlePage title="Pagamentos" href="/payment" />
      <div className='relative'>
        <button onClick={createReport} className='fixed bg-green-600 text-white px-4 py-2 rounded-2xl shadow-xl  right-2 bottom-20'>Gerar Relatório</button>
        <span className="flex flex-col">
          <h3 className="flex items-center gap-4 text-xl">
            Filtros <ListFilter />
          </h3>
          <span className="py-4 flex gap-4 overflow-x-scroll flex-nowrap">
            <button onClick={fetchPayments} className="text-sm border-2 border-gray-200 p-2 rounded-2xl shadow-md bg-white min-w-fit ">
              Todos os pagamentos
            </button>
            <button onClick={getCurrentMonthPayments} className="text-sm border-2 border-gray-200 p-2 rounded-2xl shadow-md bg-white min-w-fit ">
              Pagamentos do mês atual
            </button>
            <select name="" id="" onChange={handleChange}>
              <option value="">escolher periodo</option>
              <option value="30">ultimos 30 dias</option>
              <option value="60">ultimos 60 dias</option>
              <option value="90">ultimos 90 dias</option>
            </select>
          </span>
        </span>
        <div>
          {loading && <Spinner />}
          <ul className="bg-white p-4 rounded-md shadow-md flex flex-col gap-8">{payments && payments.length > 0 ? payments.map((payment) => <CardPayment paymentData={payment} key={payment.id} />) : <p>Nenhum Pagamento encontrado.</p>}</ul>
        </div>
      </div>
    </PageContainer>
  );
}
