import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import RegisterService from "../Services/RegisterService";
import Input from "../Components/Forms/Input";
import { z } from "zod";
import { cpfSchema } from "../Validators/cpfValidator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCpfCnpj, formatTel } from "../Utils/Masks";
import { Footer } from "../Components/Footer";

const registerService = new RegisterService();

const schema = z.object({
  cpf: cpfSchema,
  name: z.string().min(5, "Nome deve conter pelo menos 5 caracteres."),
  grauParentesco: z.string().min(1, "Selecione um grau de parentesco."),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(13, {
    message: "Telefone deve ter mínimo 13 caracteres. Ex: (11) 12345-6789",
  }),
});

export type FormDataDependent = z.infer<typeof schema>;

export default function DependentsRegistration() {
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [dependents, setDependents] = useState(registerService.dependentes);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormDataDependent>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormDataDependent) => {
    const { name, email, cpf, telefone, grauParentesco } = data;

    if (editIndex !== null) {
      registerService.editDependent(
        editIndex,
        name,
        email,
        cpf,
        telefone,
        grauParentesco
      );
    } else {
      registerService.addDependent(name, email, cpf, telefone, grauParentesco);
    }

    registerService.saveLocalStorage();
    setDependents([...registerService.dependentes]);
    setIsOpen(false);
    setEditIndex(null);
    reset();
  };

  const handleRemoveDependent = (index: number) => {
    registerService.removeDependent(index);
    registerService.saveLocalStorage();
    setDependents([...registerService.dependentes]);
  };

  const handleEditClick = (index: number) => {
    const dep = dependents[index];

    setValue("name", dep.name);
    setValue("email", dep.email);
    setValue("cpf", dep.cpf);
    setValue("telefone", dep.telefone);
    setValue("grauParentesco", dep.grau_parentesco);

    setEditIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditIndex(null);
    reset();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h2 className="text-2xl font-semibold text-[#27335E] mb-1">
        Adicionar dependentes
      </h2>
      <p className="text-sm text-[#6B7280] mb-8">
        Aqui você poderá visualizar todos os dependentes cadastrados em seu
        programa de acolhimento jurídico. Inclua seus dependentes para que eles
        também possam usufruir dos benefícios oferecidos.
      </p>

      <div className="mt-6 space-y-3">
        {dependents.map((dep, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white shadow-sm rounded-md py-2"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#27335E] text-white font-bold w-12 h-12 rounded-lg flex items-center justify-center text-sm">
                {dep.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="text-start">
                <p className="text-base [#27335E] font-semibold">{dep.name}</p>
                <p className="text-sm text-gray-500">{dep.grau_parentesco}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleRemoveDependent(index)}
                className="p-3 border border-[#CBCED6] hover:bg-red-100 hover:border-red-900 rounded-lg transition"
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.41509 3.43144C8.68752 2.57798 9.48083 2 10.3756 2H15.2674C16.1623 2 16.9541 2.57898 17.2275 3.43002L17.7866 5.17647H19.1746C19.1967 5.17647 19.2186 5.17718 19.2403 5.17859H20.2346C20.7869 5.17859 21.2346 5.6263 21.2346 6.17859C21.2346 6.73087 20.7869 7.17859 20.2346 7.17859H20.1746V18.6559C20.1746 20.4992 18.6856 22 16.8399 22H8.80346C6.95775 22 5.46875 20.4992 5.46875 18.6559V7.17859H5.41016C4.85787 7.17859 4.41016 6.73087 4.41016 6.17859C4.41016 5.6263 4.85787 5.17859 5.41016 5.17859H6.40309C6.4248 5.17718 6.44669 5.17647 6.46875 5.17647H7.85638L8.41509 3.43144ZM17.0798 7.17647C17.0643 7.17683 17.0488 7.17683 17.0333 7.17647H8.60966C8.59422 7.17683 8.57875 7.17683 8.56323 7.17647H7.46875V18.6559C7.46875 19.4022 8.06987 20 8.80346 20H16.8399C17.5735 20 18.1746 19.4022 18.1746 18.6559V7.17647H17.0798ZM15.3233 4.04174L15.6866 5.17647H9.95639L10.3204 4.03966C10.3277 4.01678 10.3495 4 10.3756 4H15.2674C15.2914 4 15.315 4.01621 15.3233 4.04174ZM11.4122 10.7338C11.0217 10.3433 10.3885 10.3433 9.99797 10.7338C9.60745 11.1244 9.60745 11.7575 9.99797 12.148L11.4085 13.5586L9.99797 14.9691C9.60745 15.3597 9.60745 15.9928 9.99797 16.3833C10.3885 16.7739 11.0217 16.7739 11.4122 16.3833L12.8227 14.9728L14.2333 16.3833C14.6238 16.7739 15.257 16.7739 15.6475 16.3833C16.038 15.9928 16.038 15.3597 15.6475 14.9691L14.2369 13.5586L15.6475 12.148C16.038 11.7575 16.038 11.1244 15.6475 10.7338C15.257 10.3433 14.6238 10.3433 14.2333 10.7338L12.8227 12.1444L11.4122 10.7338Z"
                    fill="#4A4C52"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleEditClick(index)}
                className="p-3 border border-[#CBCED6] hover:bg-gray-100 rounded-lg transition"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.1238 2.78622C18.3421 2.00461 17.0749 2.00461 16.2933 2.78622L2.78348 16.296C2.40813 16.6714 2.19727 17.1804 2.19727 17.7113V20.6992C2.19727 21.3072 2.69011 21.8 3.29806 21.8H6.28602C6.81683 21.8 7.32591 21.5891 7.70126 21.2138L21.2111 7.704C21.9927 6.92239 21.9927 5.65514 21.2111 4.87352L19.1238 2.78622ZM15.5504 6.35955L17.7085 4.20146L19.7958 6.28876L17.6377 8.44686L15.5504 6.35955ZM14.1952 7.71479L4.19872 17.7113V19.7986H6.28602L16.2825 9.80209L14.1952 7.71479Z"
                    fill="#4A4C52"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {dependents.length < 5 && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full mt-8 border border-[#3F87CF] text-[#3F87CF] font-semibold py-2 px-6 rounded-lg hover:bg-[#3F87CF] hover:text-white transition duration-500 ease-in-out"
        >
          + Adicionar Dependentes
        </button>
      )}

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <DialogTitle className="text-lg text-center font-semibold text-[#27335E] mb-4">
              Informações do Dependente
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <Input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Nome completo"
                name="name"
                register={register}
                error={errors.name?.message}
              />
              <Input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="E-mail"
                name="email"
                register={register}
                error={errors.email?.message}
              />
              <Input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="CPF"
                name="cpf"
                register={register}
                mask={formatCpfCnpj}
                error={errors.cpf?.message}
              />
              <Input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Telefone"
                name="telefone"
                register={register}
                mask={formatTel}
                error={errors.telefone?.message}
              />

              <select
                {...register("grauParentesco")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
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

              <button
                type="submit"
                className="w-full mt-2 border border-[#3F87CF] text-[#3F87CF] font-semibold py-2 px-6 rounded-lg hover:bg-[#3F87CF] hover:text-white transition duration-500 ease-in-out"
              >
                {editIndex !== null ? "Salvar Alterações" : "Adicionar"}
              </button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <Footer />
    </div>
  );
}
