import PlansService from '../Services/PlansService';
import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import PageLoader  from '../Components/PageLoader';
import { Payment, initMercadoPago } from '@mercadopago/sdk-react'
import { PlanCard } from '../Components/PlanCard';

const planService = new PlansService();

export const PlansCheckout = () => {

    let { token } = useParams();

    planService.setUUIDLocalStorage(token);

    planService.recoverLocalStorage();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    
    try{
       
        initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY || "");
    
    }catch(error){
        console.log(error);
    }

    const customization = {
        paymentMethods: {
            maxInstallments: 10,
            ticket: ["all"],
            atm: ["all"],
            debitCard: ["all"],
            bankTransfer: ["all"],
            creditCard: ["all"],
        }
    };
    
    const backToDetails = () => {
        setLoading(true);

        setTimeout(() => {
            
            setLoading(false);
    
            navigate("/planos/detalhes/" + token);

        }, 500 );
    }

    async function  handlePayment (data: any) {
        
        setLoading(true);

        data.servicePlan = planService;

        fetch(process.env.REACT_APP_BACK_URL + "/process_payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setLoading(false);

            console.log(data);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            
        });
    }

    return (
        <>
            <PageLoader 
                isShow={loading}
            />

            <div className="pt-4">

                <div className='p-0 rounded-3xl text-[#4b5563] mb-4'>

                    <div className="w-full justify-between mb-6 flex col-span-2">
                        
                        <button className='textWhite bg-juripass text-white rounded-md p-2 flex' onClick={backToDetails}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width={20} height={24} id="chevron" className='relative pt-0.5 mr-3' fill='currentColor'><path className='text-white' d="M13.891 17.418a.697.697 0 0 1 0 .979.68.68 0 0 1-.969 0l-7.83-7.908a.697.697 0 0 1 0-.979l7.83-7.908a.68.68 0 0 1 .969 0 .697.697 0 0 1 0 .979L6.75 10l7.141 7.418z"></path></svg>

                            Voltar para detalhes
                        </button>

                       
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">

                    <div className='border-2 bg-white border-[#e5e7eb] border-solid p-4 rounded-3xl text-[#4b5563]'>

                        <h3 className='text-center font-semibold text-lg mb-4'>
                            Formas de pagamento
                        </h3>                 
                        
                        <Payment
                            initialization={{ amount: planService.planValue }}
                            customization={customization}
                            locale="pt-BR"
                            onRenderNextStep={() => console.log("onRenderNextStep")}
                            onSubmit={handlePayment}
                        />

                    </div>

                    <div className='border-2 bg-white border-[#e5e7eb] border-solid p-4 rounded-3xl text-[#4b5563]'>

                        <h3 className='text-center font-semibold text-lg mb-4'>
                            Resumo do pedido
                        </h3>   

                        <PlanCard 
                            plan={{
                                planName: planService.planName,
                                planValue: planService.planValue,
                                planValueFormated: planService.planValueFormated,
                                planDesc: planService.planDesc,
                                planId: planService.planId,
                                benefits: planService.benefits
                            }}
                            key={planService.planId}
                        />              

                    </div>

                </div>
            </div>

        </>
    );
}