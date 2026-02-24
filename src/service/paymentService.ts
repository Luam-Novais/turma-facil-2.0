import { CreatePaymentDTO } from "../types/payment";
import { data_post } from "../utils/fecthOpt";

export async function createPaymentService(data: CreatePaymentDTO){
    const {url, options} = data_post('payment/create', data)
    const response = await fetch(url, options as RequestInit)
    const json = await response.json()
    return {response, json}

}