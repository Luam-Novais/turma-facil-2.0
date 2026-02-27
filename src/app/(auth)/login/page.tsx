'use client'
import { Button } from "@/src/components/button";
import { Input, InputPassword } from "@/src/components/input";
import { loginService } from "@/src/service/loginService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

interface AuthCredentialsDTO{
  identifier: string,
  password: string
}
export default function Login(){
  const {handleSubmit, register} = useForm<AuthCredentialsDTO>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const onSubmit: SubmitHandler<AuthCredentialsDTO> = async (data)=>{
    console.log(data)
    try {
      setLoading(true)
      const { response, json } = await loginService(data);
      if(response.ok){
        setError(null)
        router.push('/home')        
      }
      else{
        setError(json.messageError)
      }
    } catch (error:any) {
      setError(error.messageError)
    }finally{
      setLoading(false)
    }
  }
    return (
      <div className="p-4 flex flex-col gap-6 h-screen">
        <span>
          <h1>Login</h1>
          <p className="text-sm text-gray-600">Entre com seu nome de usuário e senha</p>
          {error && <p className="text-red-600">{error}</p>}
        </span>
        <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
          <Input label="Nome de usuário" type="text" placeholder="" register={register('identifier')} />
          <InputPassword label="Senha" type="password" register={register('password')} />
          <Button loadingState={loading}>Entrar</Button>
        </form>
        <Link className="text-right text-gray-600" href="create">
          Criar conta
        </Link>
      </div>
    );
}