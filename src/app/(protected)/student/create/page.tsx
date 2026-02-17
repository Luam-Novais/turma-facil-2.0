'use client';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import { CreateStudentDTO } from '@/src/types/students';
import { Input, Select, TextArea } from '@/src/components/input';
import { Button } from '@/src/components/button';
import { useState } from 'react';
import { data_post } from '@/src/utils/fecthOpt';
import { TitlePage } from '@/src/components/header';
import { createStudentService } from '@/src/service/studentService';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<CreateStudentDTO>();
  const onSubmit: SubmitHandler<CreateStudentDTO> = async (data) => {
    try {
      if(!subscriptionTypes.includes(data.subscription_type)){
        alert('O campo de vínculo deve ter um valor válido.');
        throw new Error()
      }
      setError(null);
      setLoading(true);
      const {response, json} = await createStudentService(data)
      if(response.ok){
        reset()
      }
    } catch (error) {
      console.error(error);
      setError('Ocorreu um erro ao criar o aluno. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 p-4 min-h-screen bg-gray-100 rounded-md shadow-xl">
      <TitlePage title="Criar Aluno" />
      {error && <p className='text-red-600'>{error}</p>}
      <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white p-4 rounded shadow">
        <Input label="Nome" register={register('name', {required: true})} />
        <Input label="Telefone" register={register('phone', {required: true})} />
        <Input label="CPF" register={register('cpf', {required: true})} />
        <Input label="Data de Nascimento" type="date" register={register('date_birth', {required: true})} />
        <TextArea label="Observações" register={register('observations', { required: false })} />
        <Select options={subscriptionTypes} register={register('subscription_type', {required: true})} />
        <Button loadingState={loading}>Criar</Button>
      </form>
    </div>
  );
}
const subscriptionTypes = ['EXPERIMENTAL', 'MENSAL_1X', 'MENSAL_2X'];
