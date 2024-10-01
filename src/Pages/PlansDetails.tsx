import { PlanCard } from '../Components/PlanCard';
import Input from "../Components/Forms/Input";
import PlansService from '../Services/PlansService';
import { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import PageLoader  from '../Components/PageLoader';
import FormDependent from '../Components/FormDependent';
import DependentCardItem from '../Components/DependentCardItem';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCpfCnpj } from "../Utils/Masks";
import { formatTel } from "../Utils/Masks";
import { ToastContainer, toast } from 'react-toastify';

const planService = new PlansService();

var dependent:any|null = null;

export const PlansDetails = () => {

    let { token } = useParams();

    planService.setUUIDLocalStorage(token);

    planService.recoverLocalStorage();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [isFormDependent, setIsFormDependent] = useState(false);

    const [dependents, setDependents] = useState(planService.getDependentes());

    const schema = z.object({
        name: z.string().min(5, { message: "Nome deve ter pelo menos 5 caracteres" }),
        cpf: z.string().refine((doc) => {
            const replacedDoc = doc.replace(/\D/g, '');
            return replacedDoc.length >= 11;
        }, 'CPF deve conter no mínimo 11 caracteres.')
          .refine((doc) => {
            const replacedDoc = doc.replace(/\D/g, '');
            return !!Number(replacedDoc);
        }, 'CPF deve conter apenas números.')
        .refine((cpf) => {
            
            if (typeof cpf !== "string") return false

            cpf = cpf.replace(/[\s.-]*/igm, '');

            if (
                !cpf ||
                cpf.length !== 11 ||
                cpf === "00000000000" ||
                cpf === "11111111111" ||
                cpf === "22222222222" ||
                cpf === "33333333333" ||
                cpf === "44444444444" ||
                cpf === "55555555555" ||
                cpf === "66666666666" ||
                cpf === "77777777777" ||
                cpf === "88888888888" ||
                cpf === "99999999999" 
            ) {
                return false
            }
    
            let soma = 0
            let resto
            for (let i = 1; i <= 9; i++) 
                soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
            resto = (soma * 10) % 11
            if ((resto === 10) || (resto === 11))  resto = 0
            if (resto !== parseInt(cpf.substring(9, 10)) ) return false
            soma = 0
            for (let i = 1; i <= 10; i++) 
                soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
            resto = (soma * 10) % 11
            if ((resto === 10) || (resto === 11))  resto = 0
            if (resto !== parseInt(cpf.substring(10, 11) ) ) return false
            return true

        },  'CPF inválido.'),
        email: z.string().email({ message: "Email inválido" }),
        telefone: z.string().min(13, { message: "Telefone deve ter mínimo 13 caracteres. Ex: (11) 12345-6789" }),
    });

    type FormData = z.infer<typeof schema>;

    const { register, handleSubmit } = useForm<FormData>({ 
        resolver: zodResolver(schema)
    })

    const backToPlans = () => {

        setLoading(true);

        setTimeout(() => {
            
            setLoading(false);
    
            navigate("/planos");

        }, 500 );
    }

    const showFormAddDependent = () => {

        dependent = null;

        setIsFormDependent(true);
    }

    const closeFormDependent = () => {

        setIsFormDependent(false);
    }

    const continueToPayment = ( data: FormData) => {

        planService.name = data.name;
        
        planService.email = data.email;
        
        planService.cpf = data.cpf;
        
        planService.telefone = data.telefone;

        planService.saveLocalStorage();

        setLoading(true);

        setTimeout(() => {
            
            setLoading(false);
    
            navigate("/planos/checkout/" + token);

        }, 500 );
    }

    function onErrors(e: any) {
        
        document.querySelectorAll(".input-error").forEach((el: any) => {
            el.classList.remove("input-error");
        });

        for (let key in e) {
            toast.warn(e[key].message);
            e[key].ref.classList.add("input-error");
        }
    }


    const adicDependent = ( data : any, index: number | null) => {

        document.querySelectorAll(".input-error").forEach((el: any) => {
            el.classList.remove("input-error");
        });

        if (planService.getDependentes().length >= 5) {
            
            toast.warn("Limite de dependentes atingido");
           
            return false;
        }

        if (index !== null) {

            planService.editDependent(
                index, 
                data.dependent_name, 
                data.dependent_email,
                data.dependent_cpf,
                data.dependent_telefone,
                data.dependent_grau_parentesco
            );

        } else {
        
            planService.addDependent(
                data.dependent_name,
                data.dependent_email, 
                data.dependent_cpf, 
                data.dependent_telefone, 
                data.dependent_grau_parentesco, 
            )

        }

        setDependents(planService.getDependentes());

        setIsFormDependent(false);

        planService.saveLocalStorage();

    }

    const RemoveDependent = (index: number) => {
        
        planService.removeDependent(index);

        setDependents([...planService.getDependentes()]);

        planService.saveLocalStorage();

    }

    const EditDependent = (index: number) => {
        try{
            
            dependent = dependents[index];

            dependent.index = index;

            setIsFormDependent(true);

        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            <PageLoader 
                isShow={loading}
            />
            <div className="pt-4">
                <div className='border-2 grid gap-4 md:grid-cols-2 sm:grid-cols-1  bg-white border-border-grey border-solid p-8 rounded-3xl text-[#4b5563] mb-4'>
                    
                    <div className="w-full justify-between mb-6 flex col-span-2">
                    
                        <button className='textWhite bg-juripass text-white rounded-md p-2 flex' onClick={backToPlans}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width={20} height={24} id="chevron" className='relative pt-0.5 mr-3' fill='currentColor'><path className='text-white' d="M13.891 17.418a.697.697 0 0 1 0 .979.68.68 0 0 1-.969 0l-7.83-7.908a.697.697 0 0 1 0-.979l7.83-7.908a.68.68 0 0 1 .969 0 .697.697 0 0 1 0 .979L6.75 10l7.141 7.418z"></path></svg>

                            Escolher outro plano
                        </button>

                        <button className='textWhite bg-juripass text-white rounded-md p-2 flex' onClick={handleSubmit(continueToPayment, onErrors)}>
                            Seguir para o pagamento
                            <svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width={20} height={24} id="chevron" className='relative pt-0.5 ml-3' fill='currentColor'><path d="M13.25 10 6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L13.25 10z"></path></svg>

                        </button>
                    </div>

                    <div className="col-span-2">
                        <h3 className="text-center font-semibold text-lg mb-4">
                            Queremos conhecer mais sobre você! Preencha seus dados abaixo
                        </h3>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-center font-semibold text-lg">
                            Qual é o seu nome?
                        </h3>

                        <Input
                            name="name"
                            placeholder="Seu nome?"
                            type="text"
                            id="name"
                            value={planService.name}
                            register={register}
                        />

                    </div>

                    <div className="mb-6">
                        <h3 className="text-center font-semibold text-lg">
                            Diga-nos seu CPF
                        </h3>

                        <Input
                            name="cpf"
                            placeholder="Seu CPF?"
                            type="text"
                            id="cpf"
                            value={planService.cpf}
                            mask={formatCpfCnpj}
                            register={register}
                        />

                    </div>

                    <div className="mb-6">
                        <h3 className="text-center font-semibold text-lg">
                           Informe seu e-mail. 
                        </h3>

                        <Input
                            name="email"
                            placeholder="Email de contato?"
                            type="text"
                            id="email"
                            value={planService.email}
                            register={register}
                        />

                    </div>

                    <div className="mb-6">
                        <h3 className="text-center font-semibold text-lg">
                            Informe seu número de celular com whatsapp
                        </h3>

                        <Input
                            name="telefone"
                            placeholder="Telefone de contato?"
                            type="text"
                            id="telefone"
                            value={planService.telefone}
                            register={register}
                            mask={formatTel}
                        />

                    </div>

                    { planService.getIsAdditional() &&<div className="w-full mb-6 col-span-2">
                        
                        <button className='textWhite bg-juripass text-white rounded-md p-2 flex w-full text-xl' onClick={showFormAddDependent}>
                            <svg xmlns="http://www.w3.org/2000/svg"x="0" y="0" width={20} height={24} id="chevron" className='relative pt-0.5 mr-3' fill='currentColor'><path d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z"></path></svg>

                            <span className='w-full text-center'>
                                Adicionar Dependentes
                            </span>
                            
                        </button>

                    </div> }

                    
                    
                    { isFormDependent && 

                        <div className="w-full mb-6 col-span-2 relative">

                            <button className='text-red absolute right-0 top-0' onClick={closeFormDependent}>
                                <svg x="0" y="0" width={20} height={24} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"/>
                                </svg>
                            </button>
                        
                            <FormDependent 
                                adicDependent={adicDependent}
                                dependent={dependent}
                            />
                        </div>
                    }

                    <div className="grid grid-cols-3 col-span-2">

                    { 
                        dependents.map( 
                            (dependent: any, index: number) => {

                                return (

                                    <DependentCardItem 
                                        key={index}
                                        id={index}
                                        name={dependent.name}
                                        parentesco={dependent.grau_parentesco}
                                        cpf={dependent.cpf}
                                        onRemoveDependent={RemoveDependent}
                                        onEditDependent={EditDependent}
                                    />

                                )

                            }
                        )
                        
                    }

                    </div>


                </div>

                <div className='border-2 flex flex-wrap bg-white border-border-grey border-solid p-8 rounded-3xl text-[#4b5563]'>
                    
                    <div className="w-full">
                        <h3 className="text-center font-semibold text-2xl">
                            Plano escolhido
                        </h3>
                    </div>

                    <div className="w-2/4">
                        <PlanCard 
                            plan={{
                                planName: planService.planName,
                                planValue: planService.planValue,
                                planValueFormated: planService.planValueFormated,
                                planDesc: planService.planDesc,
                                planId: planService.planId,
                                benefits: planService.benefits
                            }}
                            hasCoupon={planService.hasCupon()} 
                            textCoupon={planService.planValueFormatedCoupon}
                            key={planService.planId}
                        />
                    </div>
                </div>

            </div>

            <ToastContainer />

        </>
    );
}