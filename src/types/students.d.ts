export interface Student {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  date_birth: string | Date;
  observations?: string;
  subscription_type: SubscriptionType;
}
interface SubscriptionBasicData {
  id: number;
  isActive: boolean;
  subscription_type: SubscriptionType;
  start_date: string | Date;
  end_date?: string | Date;
}
export interface StudentWithSubscription {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  date_birth: string | Date;
  observations?: string;
  subscription: SubscriptionBasicData;
}
export interface CreateStudentDTO {
  name: string;
  phone: string;
  cpf: string;
  date_birth: Date;
  observations?: string;
  subscription_type: SubscriptionType;
}
type SubscriptionType = 'EXPERIMENTAL' | 'MENSAL_1X' | 'MENSAL_2X';

export interface UpdateStudentDTO {
  id: number;
  name?: string;
  phone?: string;
  cpf?: string;
  date_birth?: Date;
  observations?: string;
  subscription_type?: SubscriptionType;
}
