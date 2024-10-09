import { PlanCard } from "../Components/PlanCard";
import Input from "../Components/Forms/Input";
import PlansService from "../Services/PlansService";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLoader from "../Components/PageLoader";
import FormDependent from "../Components/FormDependent";
import DependentCardItem from "../Components/DependentCardItem";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCpfCnpj } from "../Utils/Masks";
import { formatTel } from "../Utils/Masks";
import { ToastContainer, toast } from "react-toastify";

const planService = new PlansService();

var dependent: any | null = null;

export const PlansDetails = () => {
  let { token } = useParams();

  planService.setUUIDLocalStorage(token);

  planService.recoverLocalStorage();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [isFormDependent, setIsFormDependent] = useState(false);

  const [dependents, setDependents] = useState(planService.getDependentes());

  const schema = z.object({
    name: z
      .string()
      .min(5, { message: "Nome deve ter pelo menos 5 caracteres" }),
    cpf: z
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
    email: z.string().email({ message: "Email inválido" }),
    telefone: z.string().min(13, {
      message: "Telefone deve ter mínimo 13 caracteres. Ex: (11) 12345-6789",
    }),
  });

  type FormData = z.infer<typeof schema>;

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const backToPlans = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate("/planos");
    }, 500);
  };

  const showFormAddDependent = () => {
    dependent = null;

    setIsFormDependent(true);
  };

  const closeFormDependent = () => {
    setIsFormDependent(false);
  };

  const continueToPayment = (data: FormData) => {
    planService.name = data.name;

    planService.email = data.email;

    planService.cpf = data.cpf;

    planService.telefone = data.telefone;

    planService.saveLocalStorage();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate("/planos/checkout/" + token);
    }, 500);
  };

  function onErrors(e: any) {
    document.querySelectorAll(".input-error").forEach((el: any) => {
      el.classList.remove("input-error");
    });

    for (let key in e) {
      toast.warn(e[key].message);
      e[key].ref.classList.add("input-error");
    }
  }

  const adicDependent = (data: any, index: number | null) => {
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
        data.dependent_grau_parentesco
      );
    }

    setDependents(planService.getDependentes());

    setIsFormDependent(false);

    planService.saveLocalStorage();
  };

  const RemoveDependent = (index: number) => {
    planService.removeDependent(index);

    setDependents([...planService.getDependentes()]);

    planService.saveLocalStorage();
  };

  const EditDependent = (index: number) => {
    try {
      dependent = dependents[index];

      dependent.index = index;

      setIsFormDependent(true);
    } catch (e) {
      console.log(e);
    }
  };

  const Modal = ({
    isOpen,
    closeModal,
  }: {
    isOpen: boolean;
    closeModal: () => void;
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 30 30"
            >
              <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
            </svg>
          </button>

          <h2 className="text-lg font-semibold text-center mb-4">
            Adicionar dependente
          </h2>
          <p className="text-center mb-4">
            Preencha com os dados do dependente
          </p>
          <FormDependent adicDependent={adicDependent} dependent={dependent} />
        </div>
      </div>
    );
  };

  return (
    <>
      <PageLoader isShow={loading} />
      <div className="pt-4">
        <div className="flex items-center justify-between py-4 border-b border-gray-200">
          <div className="flex items-center">
            <button
              className="text-juripass flex flex-col md:flex-row items-center text-sm md:text-base"
              onClick={backToPlans}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Escolher outro plano</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center flex-col md:flex-row">
              <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-juripass text-juripass">
                1
              </div>
              <span className="ml-2 text-juripass text-center text-sm md:text-base md:text-left">
                Preenchimento de dados
              </span>
            </div>

            <div className="flex items-center text-gray-400 flex-col md:flex-row">
              <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-300">
                2
              </div>
              <span className="ml-2 text-sm text-center md:text-base md:text-left">
                Informações de pagamento
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4">
          <div className="md:gap-6 flex lg:flex-row-reverse items-start flex-col">
            <div className="w-full md:py-8 flex flex-col justify-center items-center bg-white">
              <div className="w-full max-w-md px-6 py-6">
                <div className="flex flex-col items-center mb-6">
                  <h2 className="text-xl font-semibold text-juripass mb-2">
                    Plano escolhido
                  </h2>
                  <PlanCard
                    plan={{
                      planName: planService.planName,
                      planValue: planService.planValue,
                      planValueFormated: planService.planValueFormated,
                      planDesc: planService.planDesc,
                      planId: planService.planId,
                      benefits: planService.benefits,
                    }}
                    hasCoupon={planService.hasCupon()}
                    textCoupon={planService.planValueFormatedCoupon}
                    key={planService.planId}
                    discount={planService.couponDiscount}
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:py-8 flex flex-col justify-center items-center bg-white">
              <div className="w-full max-w-md px-6 py-6 ">
                <div className="flex flex-col items-center mb-6">
                  <h2 className="text-xl font-semibold text-juripass mb-2">
                    Queremos conhecer você!
                  </h2>
                  {/* <p className="text-gray-500 text-center mb-2">
                    Preencha suas informações abaixo para dar continuidade no
                    pagamento
                  </p> */}
                </div>

                <form className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Nome completo"
                      type="text"
                      id="name"
                      value={planService.name}
                      register={register}
                    />
                  </div>

                  <div>
                    <Input
                      name="cpf"
                      placeholder="CPF"
                      type="text"
                      id="cpf"
                      value={planService.cpf}
                      mask={formatCpfCnpj}
                      register={register}
                    />
                  </div>

                  <div>
                    <Input
                      name="email"
                      placeholder="Email"
                      type="text"
                      id="email"
                      value={planService.email}
                      register={register}
                    />
                  </div>

                  <div>
                    <Input
                      name="telefone"
                      placeholder="Telefone de contato"
                      type="text"
                      id="telefone"
                      value={planService.telefone}
                      register={register}
                      mask={formatTel}
                    />
                  </div>

                  {planService.getIsAdditional() && (
                    <div className="text-center py-4">
                      <a
                        className="text-center cursor-pointer w-full mt-2 text-[#3F87CF] font-semibold py-2 px-6 hover:text-[#27335E] transition duration-500 ease-in-out"
                        onClick={showFormAddDependent}
                      >
                        + Adicionar dependentes
                      </a>
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      className="w-full mt-2 bg-[#3F87CF] text-white font-semibold shadow-lg py-2 px-6 rounded-xl hover:bg-[#27335E] transition duration-500 ease-in-out"
                      onClick={handleSubmit(continueToPayment, onErrors)}
                    >
                      Continuar para pagamento
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {dependents.length > 0 && (
              <div className="w-full md:py-8 flex flex-col justify-center items-center bg-white">
                <div className="w-full max-w-md px-6 py-6">
                  <h2 className="text-xl text-center font-semibold text-juripass mb-8">
                    Dependentes
                  </h2>
                  <div className="rounded-2xl border border-[#CBCED6] flex flex-col p-4 gap-4">
                    {dependents.map((dependent: any, index: number) => {
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
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Modal isOpen={isFormDependent} closeModal={closeFormDependent} />
      </div>

      <ToastContainer />
    </>
  );
};
