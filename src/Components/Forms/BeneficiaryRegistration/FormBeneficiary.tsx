import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import { formatCpfCnpj, formatTel } from "../../../Utils/Masks";
import { cpfSchema } from "../../../Validators/cpfValidator";

export const schema = z.object({
  name: z.string().min(5, { message: "Nome deve ter pelo menos 5 caracteres" }),
  cpf: cpfSchema,
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().min(13, {
    message: "Telefone deve ter mínimo 13 caracteres. Ex: (11) 12345-6789",
  }),
  organization: z
    .string()
    .min(5, { message: "Organização deve ter pelo menos 5 caracteres" }),
});

export type FormDataBeneficiary = z.infer<typeof schema>;

interface FormBeneficiaryProps {
  onSubmit: (data: FormDataBeneficiary) => void;
  onChangeName?: (value: string) => void;
  onChangeCompany?: (value: string) => void;
  defaultValues?: Partial<FormDataBeneficiary>;
}

export function FormBeneficiary({
  onSubmit,
  onChangeName,
  onChangeCompany,
  defaultValues,
}: FormBeneficiaryProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataBeneficiary>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 border border-[#CBCED6] p-4 rounded-2xl"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          name="cpf"
          placeholder="CPF"
          type="text"
          mask={formatCpfCnpj}
          register={register}
          error={errors.cpf?.message}
        />
        <Input
          name="name"
          placeholder="Nome completo"
          type="text"
          register={register}
          onChange={(e: any) => {
            const value = e.target.value;
            setValue("name", value);
            onChangeName?.(value);
          }}
          error={errors.name?.message}
        />
      </div>
      <Input
        name="organization"
        placeholder="Organização"
        type="text"
        register={register}
        onChange={(e: any) => {
          const value = e.target.value;
          setValue("organization", value);
          onChangeCompany?.(value);
        }}
        error={errors.organization?.message}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          name="email"
          placeholder="Email"
          type="email"
          register={register}
          error={errors.email?.message}
        />
        <Input
          name="telefone"
          placeholder="Telefone de contato"
          type="text"
          mask={formatTel}
          register={register}
          error={errors.telefone?.message}
        />
      </div>

      <button
        type="submit"
        className="w-full mt-2 bg-[#3F87CF] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#27335E] transition duration-500 ease-in-out"
      >
        Concluir meu cadastro
      </button>
    </form>
  );
}
