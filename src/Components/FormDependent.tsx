import Input from "../Components/Forms/Input";
import Select from "../Components/Forms/Select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatCpfCnpj } from "../Utils/Masks";
import { formatTel } from "../Utils/Masks";

const schema = z.object({
  dependent_name: z
    .string()
    .min(5, { message: "Nome do dependente deve ter pelo menos 5 caracteres" }),
  dependent_cpf: z
    .string()
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, "");
      return replacedDoc.length >= 11;
    }, "CPF deve conter no mínimo 11 caracteres.")
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, "");
      return !!Number(replacedDoc);
    }, "CPF deve conter apenas números.")
    .refine((cpf) => {
      if (typeof cpf !== "string") return false;

      cpf = cpf.replace(/[\s.-]*/gim, "");

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
        return false;
      }

      let soma = 0;
      let resto;
      for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(9, 10))) return false;
      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(10, 11))) return false;
      return true;
    }, "CPF inválido."),
  // dependent_email: z.string().email({ message: "Email inválido" }),
  dependent_telefone: z
    .string()
    .min(10, {
      message: "Telefone deve ter minimo 10 caracteres. Ex: (11) 12345-6789",
    }),
  dependent_grau_parentesco: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function FormDependent({ adicDependent, dependent }: any) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
      <form
        className="flex-col gap-4"
        onSubmit={handleSubmit(handleSubmitDependent, onErrors)}
      >
        <div className="mb-4">
          <Input
            name="dependent_name"
            placeholder="Nome"
            type="text"
            register={register}
            value={dependent ? dependent.name : ""}
          />
        </div>

        <div className="mb-4">
          <Input
            name="dependent_cpf"
            placeholder="CPF"
            type="text"
            register={register}
            mask={formatCpfCnpj}
            value={dependent ? dependent.cpf : ""}
          />
        </div>

        <div className="mb-4">
          <Input
            name="dependent_email"
            placeholder="Email (Opcional)"
            type="text"
            register={register}
            value={dependent ? dependent.email : ""}
          />
        </div>

        <div className="mb-4">
          <Input
            name="dependent_telefone"
            placeholder="Celular (Whatsapp)"
            type="text"
            register={register}
            mask={formatTel}
            value={dependent ? dependent.telefone : ""}
          />
        </div>

        <div className="mb-4">
          <Select
            name="dependent_grau_parentesco"
            placeholder="Grau de parentesco do dependente"
            options={[
              { name: "Filho(a)", value: "filho" },
              { name: "Irmao(a)", value: "irmao" },
              { name: "Pai", value: "pai" },
              { name: "Conjunge", value: "conjunge" },
              { name: "Mãe", value: "mãe" },
            ]}
            register={register}
            selectedItem={dependent ? dependent.grau_parentesco : ""}
          />
        </div>

        <button
          className="w-full mt-2 bg-[#3F87CF] text-white font-semibold shadow-lg py-2 px-6 rounded-xl hover:bg-[#27335E] transition duration-500 ease-in-out"
          type="submit"
        >
          Confirmar dependente
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
