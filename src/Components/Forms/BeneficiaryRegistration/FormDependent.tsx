import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input";
import { formatCpfCnpj, formatTel } from "../../../Utils/Masks";
import { cpfSchema } from "../../../Validators/cpfValidator";

const schema = z.object({
  cpf: cpfSchema,
  name: z.string().min(5, "Nome deve conter pelo menos 5 caracteres."),
  grauParentesco: z.string().min(1, "Selecione um grau de parentesco."),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(13, {
    message: "Telefone deve ter mínimo 13 caracteres. Ex: (11) 12345-6789",
  }),
  beneficiaryCpf: cpfSchema,
  beneficiaryName: z
    .string()
    .min(5, "Nome deve conter pelo menos 5 caracteres."),
  organization: z
    .string()
    .min(5, { message: "Organização deve ter pelo menos 5 caracteres" }),
});

export type FormDataDependent = z.infer<typeof schema>;

interface FormDependentProps {
  onSubmit: (data: FormDataDependent) => void;
  onChangeName?: (value: string) => void;
  onChangeCompany?: (value: string) => void;
  defaultValues?: Partial<FormDataDependent>;
}

export function FormDependent({
  onSubmit,
  onChangeName,
  onChangeCompany,
  defaultValues,
}: FormDependentProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataDependent>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 border border-[#CBCED6] p-4 rounded-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              name="beneficiaryCpf"
              placeholder="CPF do beneficiário"
              type="text"
              register={register}
              mask={formatCpfCnpj}
              error={errors.beneficiaryCpf?.message}
            />
            <Input
              name="beneficiaryName"
              placeholder="Nome do beneficiário"
              type="text"
              register={register}
              onChange={(e: any) => {
                const value = e.target.value;
                setValue("beneficiaryName", value);
                onChangeName?.(value);
              }}
              error={errors.beneficiaryName?.message}
            />
          </div>
          <Input
            name="organization"
            placeholder="Organização do beneficiário"
            type="text"
            register={register}
            onChange={(e: any) => {
              const value = e.target.value;
              setValue("organization", value);
              onChangeCompany?.(value);
            }}
            error={errors.organization?.message}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-[#CBCED6] p-4 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            name="cpf"
            placeholder="CPF do dependente"
            type="text"
            register={register}
            mask={formatCpfCnpj}
            error={errors.cpf?.message}
          />
          <Input
            name="name"
            placeholder="Nome do dependente"
            type="text"
            register={register}
            error={errors.name?.message}
          />
        </div>

        <select
          {...register("grauParentesco")}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">Selecione um grau de parentesco</option>
          <option value="filho">Filho(a)</option>
          <option value="irmao">Irmão(a)</option>
          <option value="pai">Pai</option>
          <option value="mae">Mãe</option>
          <option value="conjuge">Cônjuge</option>
          <option value="outro">Outro</option>
        </select>
        {errors.grauParentesco && (
          <span className="text-red-500 text-sm">
            {errors.grauParentesco.message}
          </span>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <Input
            name="email"
            placeholder="E-mail do dependente"
            type="text"
            register={register}
            error={errors.email?.message}
          />
          <Input
            name="telefone"
            placeholder="Celular do dependente"
            type="text"
            register={register}
            mask={formatTel}
            error={errors.telefone?.message}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-2 bg-[#3F87CF] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#27335E] transition duration-500 ease-in-out"
      >
        Concluir cadastro de dependente
      </button>
    </form>
  );
}
