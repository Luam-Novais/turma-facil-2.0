export interface CreatePaymentDTO {
  payment_method: string;
  student_id: number;
  payment_date: string;
  payment_reason: PaymentReason;
}
type PaymentReason = 'mensal_2x' | 'mensal_1x' | 'aula avulsa' | 'experimental' | 'Experimental + matricula' | 'Matricula + mensal'