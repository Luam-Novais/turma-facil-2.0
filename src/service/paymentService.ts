import { CreatePaymentDTO, PaymentWithStudent } from '../types/payment';
import { data_get, data_post } from '../utils/fecthOpt';
import { formatDate } from '../utils/formatDate';
import { formatName } from '../utils/formatName';
import { formatPrices } from '../utils/formats';

interface TableBodyPayment {
  name: string;
  data: string;
  forma: string;
  value: string;
  reason: string;
}
export async function createPaymentService(data: CreatePaymentDTO) {
  const { url, options } = data_post('payment/create', data);
  const response = await fetch(url, options as RequestInit);
  const json = await response.json();
  return { response, json };
}
export async function createReportService(payments: PaymentWithStudent[]) {
  const formatPayments: TableBodyPayment[] = payments.map((payment) => {
    return {
      name: formatName(payment.student.name),
      data: formatDate(payment.payment_date),
      reason: payment.payment_reason,
      forma: formatName(payment.payment_method),
      value: payment.value.toString(),
    };
  });

  const { url, options } = data_post('report/payment', formatPayments);
  const response = await fetch(url, options as RequestInit);
  const blob = await response.blob();
  if(!response.ok) throw new Error("Erro ao gerar pdf.")
    
  const urlPdf = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = urlPdf;
  a.download = 'relatorio-pdf';
  a.click();

  return { response, blob };
}
export async function getAllPaymentsService() {
  const { url, options } = data_get('payment/get-payments');
  const response = await fetch(url, options as RequestInit);
  const json = await response.json();
  return { response, json };
}
export async function getPaymentsService(path: string){
   const { url, options } = data_get(`payment/${path}`);
   const response = await fetch(url, options as RequestInit);
   const json = await response.json();
   return { response, json };
}
export async function getCurrentMonthPaymentsService() {
  const { url, options } = data_get('payment/get-current-month-payments');
  const response = await fetch(url, options as RequestInit);
  const json = await response.json();
  return { response, json };
}
export async function getpaymentsByPeriodService(period: number) {
  const { url, options } = data_get(`payment/get-payments-by-period?period=${period}`);
  const response = await fetch(url, options as RequestInit);
  const json = await response.json();
  return { response, json };
}
