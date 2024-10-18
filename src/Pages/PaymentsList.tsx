
import { useState, useEffect } from 'react';
import PageLoader from "../Components/PageLoader";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

var payments: any = [];

export const PaymentsList = () => {
    
    const schema = z.object({
        cpf: z.string()
    });

    const [loading, setLoading] = useState(false);
    
    const [paymentsFiltered, setPaymentsFiltered] = useState<any>([]);
    
    type FormData = z.infer<typeof schema>;

    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const loadPayment = (params:any) => {

        setLoading(true);

        fetch(process.env.REACT_APP_BACK_URL + "/list-payments")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                
                setLoading(false);

                if (parseInt(data.status) === 200){
                    payments = data.data;
                }

                filterPayment([]);

            }).catch((error) => {
                
                setLoading(false);
                
                console.log(error);
            }
        );
    };

    const filterPayment = (params:any) => {

        setPaymentsFiltered(
            payments.filter((payment:any) => {
                let isFiltered = true;

                if (params.cpf && params.cpf.length > 0){

                    if (!payment.request.servicePlan.cpf.replace(/\D/g, '').includes(params.cpf)){
                        isFiltered = false;
                    }
                }

                if (isFiltered)
                    return true;
                
                return false;
            })
        );

        return paymentsFiltered;
    }

    useEffect(() => {

        loadPayment({
          offset: 0,
          limit: 100,
        });

    }, []);

    async function handleSubmitFilter(data: FormData) {
        filterPayment(data);
    }

    async function onErrors(e: any) {
        

    }

    return <>

        <PageLoader isShow={loading} />

        <form
            className="flex-col gap-4"
            onSubmit={handleSubmit(handleSubmitFilter, onErrors)}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-left mb-4">
                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        CPF
                    </label>
                    <div className="flex">
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cpf" type="text" placeholder="CPF" {...register("cpf")}></input>

                        <button type="submit" className="text-center cursor-pointer text-white bg-juripass font-semibold py-2 px-6 hover:text-[#d9d9d9] transition duration-500 ease-in-out">
                            Filtrar
                        </button>
                    </div>
                </div>
                
            </div>
        </form>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                            CPF
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Telefone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tipo usuário
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Grau parentesco
                        </th>
                        <th scope="col" className="px-6 py-3">
                            CPF Vinculado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Plano
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Data
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Valor
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cupon
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Forma de pagamento
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {paymentsFiltered.map((payment:any) => {

                        let className = payment.status === "approved" ? "bg-white border-b" : "bg-red-100 border-b";
                        return (
                            <>
                                <tr className={className} key={payment.id}>

                                    <td scope="col" className="px-6 py-4">
                                        {payment.request.servicePlan.name}
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        {payment.request.servicePlan.cpf}
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        {payment.request.servicePlan.telefone}
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        {payment.request.servicePlan.email}
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        Principal
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        {payment.request.servicePlan.cpf}
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        {payment.request.servicePlan.planName}
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        {payment.created_at}
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        {payment.request.servicePlan.planValue.toFixed(2)}
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        {payment.request.servicePlan.coupon}
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        {payment.request.servicePlan.payment_method_id}
                                    </td>
                                    <td scope="col" className="px-6 py-4">
                                        {payment.status}
                                    </td>
                                </tr>
                                { payment.request.servicePlan.dependentes.length > 0 && 
                                    payment.request.servicePlan.dependentes.map((dependent:any) => {
                                        return (
                                            <>
                                                <tr className="bg-white border-b " key={payment.id}>

                                                    <td scope="col" className="px-6 py-4">
                                                        {dependent.name}
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                        {dependent.cpf}
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                        {dependent.telefone}
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                        {dependent.email}
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                        Dependente
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                        {dependent.grau_parentesco}
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                        {payment.request.servicePlan.cpf}
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                       
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                        
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                        
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                        
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                        
                                                    </td>
                                                    <td scope="col" className="px-6 py-4">
                                                        
                                                    </td>
                                                </tr>
                                            </>
                                        )   
                                })}
                            </>
                        );
                    })}                   
                </tbody>
            </table>
        </div>
    </>
}

