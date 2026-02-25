export interface CreatePaymentDTO {
  payment_method: string;
  student_id: number;
  payment_date: string;
  payment_reason: PaymentReason;
}
type PaymentReason = 'mensal_2x' | 'mensal_1x' | 'aula_avulsa' | 'experimental' | 'experimental_E_mensal' | 'matricula_E_mensal';

export interface Payment {
  id: number;
  payment_method: string;
  value: number;
  payment_reason: string;
  student_id: number;
  payment_date: Date;
}
type StudentInPayment ={
  id: number;
  name: string;
  phone: string
}
export interface PaymentWithStudent extends Payment{
  student: StudentInPayment
}

