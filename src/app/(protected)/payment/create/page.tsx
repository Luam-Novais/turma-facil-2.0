'use client'
import { TitlePage } from "@/src/components/header";
import { PageContainer } from "@/src/components/container";
import {User, Check} from 'lucide-react'
import { useState } from "react";
import { useOpenModal } from "@/src/stores/modalStore";
import { SearchStudentModal } from "@/src/components/modal";
import { Input, Select } from "@/src/components/input";
import { SubmitHandler, useForm, FormProvider, Watch } from "react-hook-form";
import { CreatePaymentDTO } from "@/src/types/payment";
import { Button } from "@/src/components/button";
import {toast, ToastContainer} from 'react-toastify'
import { createPaymentService } from "@/src/service/paymentService";



export default function Page(){
    const [selectedStudent, setSelectedStudent] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const {modal, handleModal} = useOpenModal()
    const methods = useForm<CreatePaymentDTO>()
    const {register, handleSubmit, watch, reset} = methods
    const studentId = watch('student_id')

    function activeModal(){
        handleModal(true)
    }
      const notifyToast = (message: string, state: 'error' | 'success') => {
          toast(message, {
            type: state,
          });
        };
    const onSubmit: SubmitHandler<CreatePaymentDTO> = async (data)=>{
          const {response, json } = await createPaymentService(data)
          if(response.ok){
            notifyToast(json.message, 'success')
            reset()
          }else notifyToast(json.messageError, 'error')
    }
    return (
      <PageContainer>
        <TitlePage title="Criar Pagamento" href="/payment" />
        <ToastContainer/>
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col gap-2">
          <FormProvider {...methods}>
            <form className="flex flex-col gap-8" action="" onSubmit={handleSubmit(onSubmit)}>
              {modal && <SearchStudentModal selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} />}
              <button type="button" onClick={activeModal} className={`w-full flex justify-between items-center border border-gray-200 py-2 px-4  rounded-md shadow ${studentId ? 'border-green-600 bg-green-50' : ''}`}>
                {studentId ? `Aluno Selecionado` : `Selecione o aluno`}
                {studentId ? <Check color="green" /> : <User />}
              </button>
              <input type="hidden" {...register('student_id', {required: true})} />
              <Input type="date" label="Insira a data do pagamento" register={register('payment_date', {required: true})} />
              <Input type="text" label="Insira a forma de pagamento" register={register('payment_method', {required: true})} />
              <Select options={reasonsPayment} register={register('payment_reason', {required: true})} />
              <Button loadingState={loading}>Efetuar Lançamento</Button>
            </form>
          </FormProvider>
        </div>
      </PageContainer>
    );
}

const reasonsPayment = ['mensal_2x', 'mensal_1x', 'aula_avulsa', 'experimental', 'experimental_E_mensal', 'matricula_E_mensal'];
