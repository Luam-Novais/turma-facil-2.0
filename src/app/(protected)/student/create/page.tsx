'use client';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import { CreateStudentDTO } from '@/src/types/students';
import { Input, Select, TextArea } from '@/src/components/input';
import { Button } from '@/src/components/button';
import { useState } from 'react';
import {toast, ToastContainer} from 'react-toastify'
import { TitlePage } from '@/src/components/header';
import { createStudentService } from '@/src/service/studentService';
import { PageContainer } from '@/src/components/container';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<CreateStudentDTO>();
  const notifySucess = (message: string)=> {
    toast(message, {
      type: 'success'
    });
  }
const notifyError = (message:string) => {
  toast(message, {
    type: 'error',
  });
};
  const onSubmit: SubmitHandler<CreateStudentDTO> = async (data) => {
    try {
      if(!subscriptionTypes.includes(data.subscription_type)){
        notifyError('O campo de vínculo deve ter um valor válido.');
        throw new Error()
      }
      setLoading(true);
      const {response, json} = await createStudentService(data)
      if(response.ok){
        notifySucess(json.message)
        reset()
      }else{
        notifyError('Ocorreu um erro ao criar o aluno. Por favor, tente novamente.');
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageContainer>
      <TitlePage title="Criar Aluno" href='/student'/>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white p-4 rounded shadow">
        <Input label="Nome" register={register('name', {required: true})} />
        <Input label="Telefone" register={register('phone', {required: true})} />
        <Input label="CPF" register={register('cpf', {required: true})} />
        <Input label="Data de Nascimento" type="date" register={register('date_birth', {required: true})} />
        <TextArea label="Observações" register={register('observations', { required: false })} />
        <Select label= 'Escolher Vínculo' options={subscriptionTypes} register={register('subscription_type', {required: true})} />
        <Button loadingState={loading}>Criar</Button>
      </form>
      <ToastContainer/>
    </PageContainer>
  );
}
const subscriptionTypes = ['EXPERIMENTAL', 'MENSAL_1X', 'MENSAL_2X'];
