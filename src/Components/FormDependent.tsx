import Input from "../Components/Forms/Input";
import Select from "../Components/Forms/Select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatCpfCnpj } from "../Utils/Masks";
import { formatTel } from "../Utils/Masks";

const schema = z.object({
    dependent_name: z.string().min(5, { message: "Nome do dependente deve ter pelo menos 5 caracteres" }),
    dependent_cpf: z.string().refine((doc) => {
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
    // dependent_email: z.string().email({ message: "Email inválido" }),
    dependent_telefone: z.string().min(10, { message: "Telefone deve ter minimo 10 caracteres. Ex: (11) 12345-6789" }),
    dependent_grau_parentesco: z.string(),
});


type FormData = z.infer<typeof schema>;

export default function FormDependent({
    adicDependent,
    dependent
    }: any) {

    const { register, handleSubmit } = useForm<FormData>({ 
        resolver: zodResolver(schema)
    })

    async function handleSubmitDependent(data: FormData) {
        
        document.querySelectorAll(".input-error").forEach((el: any) => {
            el.classList.remove("input-error");
        });

        return adicDependent(data, dependent ? dependent.index : null);
        
    }

    async function onErrors(e: any) {
        document.querySelectorAll(".input-error").forEach((el: any) => {
            el.classList.remove("input-error");
        });

        for (let key in e) {
            toast.warn(e[key].message);

            e[key].ref.classList.add("input-error");

        }
    }
    
    return (
        <div className="">
            <form className="grid grid-cols-2 gap-4" 
                onSubmit={handleSubmit(handleSubmitDependent, onErrors)} 
            >
                <div className="mb-4">

                    <h3 className="text-center font-semibold text-lg">
                        Qual o nome do seu dependente?
                    </h3>

                    <Input
                        name="dependent_name"
                        placeholder="Nome do dependente"
                        type="text"
                        register={register}
                        value={dependent ? dependent.name : ''}
                    />

                </div>

                <div className="mb-4">
                    <h3 className="text-center font-semibold text-lg">
                        Informe o CPF do seu dependente 
                    </h3>

                    <Input
                        name="dependent_cpf"
                        placeholder="CPF do dependente"
                        type="text"
                        register={register}
                        mask={formatCpfCnpj}
                        value={dependent ? dependent.cpf : ''}
                    />

                </div>

                <div className="mb-4">
                    <h3 className="text-center font-semibold text-lg">
                        Informe o email do seu dependente (não obrigatório)
                    </h3>

                    <Input
                        name="dependent_email"
                        placeholder="Email do dependente"
                        type="text"
                        register={register}
                        value={dependent ? dependent.email : ''}
                    />

                </div>

                <div className="mb-4">
                    <h3 className="text-center font-semibold text-lg">
                        Informe o número de celular com whatsapp do seu dependente
                    </h3>

                    <Input
                        name="dependent_telefone"
                        placeholder="telefone do dependente"
                        type="text"
                        register={register}
                        mask={formatTel}
                        value={dependent ? dependent.telefone : ''}
                    />

                </div>

                <div className="mb-4">
                    <h3 className="text-center font-semibold text-lg">
                    	Qual o grau de parentesco do dependente?
                    </h3>

                    <Select
                        name="dependent_grau_parentesco"
                        placeholder="Grau de parentesco do dependente"
                        options={[{name: "Filho(a)", value: "filho"},{name: "Irmao(a)", value: "irmao"}, {name: "Pai", value: "pai"}, {name: "Conjunge", value: "conjunge"}, {name: "Mãe", value: "mãe"}]}
                        register={register}
                        selectedItem={dependent ? dependent.grau_parentesco : ''}
                    />

                </div>

                <button 
                    className='textWhite bg-juripass text-white rounded-md p-2 flex w-full text-xl col-span-2' 
                    type="submit"
                >
                    
                    <svg x="0" y="0" width={32} height={32} version="1.1" className='relative pt-0.5 mr-3' fill='currentColor' xmlns="http://www.w3.org/2000/svg">
                        <g id="Double_Check"><polygon fill="none" points="22.722,8.293 22.722,8.293 22.722,8.293  "/>
                            <polygon fill="none" points="31.704,8.293 31.704,8.293 31.704,8.293  "/>
                                <path d="M22.722,8.293L22.722,8.293C22.821,8.391,22.919,8.488,22.722,8.293z" />
                                <path d="M22.722,8.293L22.722,8.293c-0.395-0.391-1.034-0.391-1.429,0L7.006,22.486l-5.282-5.193   c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414l5.999,5.899c0.39,0.386,1.039,0.386,1.429,0L22.722,9.707   C23.117,9.317,23.116,8.684,22.722,8.293z" />
                                <path d="M22.722,8.293L22.722,8.293C22.525,8.098,22.623,8.195,22.722,8.293z" />
                                <path d="M31.704,8.293L31.704,8.293C31.507,8.098,31.606,8.195,31.704,8.293z" />
                                <path d="M31.704,8.293L31.704,8.293C31.803,8.391,31.901,8.488,31.704,8.293z" />
                                <path d="M31.704,8.293L31.704,8.293c-0.395-0.391-1.034-0.391-1.429,0L15.988,22.486l-1.282-1.193   c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414l1.999,1.899c0.39,0.386,1.039,0.386,1.429,0L31.704,9.707   C32.099,9.317,32.099,8.684,31.704,8.293z" />
                        </g>
                    </svg>

                    <span className='w-full text-center'>
                        confirmar dependente
                    </span>
                    
                </button>
            </form>

            <ToastContainer />
        </div>
    );
}