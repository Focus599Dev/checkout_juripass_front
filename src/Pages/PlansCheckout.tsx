import PlansService from "../Services/PlansService";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import PageLoader from "../Components/PageLoader";
import { Payment, initMercadoPago } from "@mercadopago/sdk-react";
import { PlanCard } from "../Components/PlanCard";
import { ToastContainer, toast } from "react-toastify";
import logoJuripass from "../assets/img/logo-juripass.png";

const planService = new PlansService();

export const PlansCheckout = () => {
  let { token } = useParams();

  planService.setUUIDLocalStorage(token);

  planService.recoverLocalStorage();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  try {
    initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY || "");
  } catch (error) {
    console.log(error);
  }

  const customization = {
    paymentMethods: {
      maxInstallments: 10,
      bankTransfer: ["all"],
      creditCard: ["all"],
    },
  };

  const backToDetails = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      navigate("/planos/detalhes/" + token);
    }, 500);
  };

  async function handlePayment(data: any) {
    setLoading(true);

    data.servicePlan = planService;

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Accept", "application/json");

    fetch(process.env.REACT_APP_BACK_URL + "/process-payment", {
      method: "POST",
      mode: "cors",
      headers: myHeaders,
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);

        if (data.status === 202) {
          toast.success(
            "Seu QR Code foi gerado com sucesso, você sera redirecionado para a tela de pagamento"
          );

          setTimeout(() => {
            window.open(data.redirect, "_blank");

            planService.deleteLocalStorage();

            navigate("/planos/checkout/payment_sucess");
          }, 2000);
        } else if (data.status === 201) {
          toast.success(
            "Pagamento efetuado com sucesso, você receberá um e-mail de confirmação"
          );

          setTimeout(() => {
            planService.deleteLocalStorage();

            navigate("/planos/checkout/payment_sucess");
          }, 2000);
        } else {
          toast.warn(
            "Pagamento não concluído, por favor reveja os dados e tente novamente"
          );
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  const ItemInfo = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => {
    return (
      <div className="mb-4">
        <p className="text-sm">{label}</p>
        <p className="font-semibold">{value}</p>
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
              onClick={backToDetails}
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
              <span>Voltar para detalhes</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center flex-col md:flex-row text-gray-400">
              <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-300">
                1
              </div>
              <span className="ml-2 text-gray-400 text-center text-sm md:text-base md:text-left">
                Preenchimento de dados
              </span>
            </div>

            <div className="flex items-center text-juripass flex-col md:flex-row">
              <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-juripass text-juripass">
                2
              </div>
              <span className="ml-2 text-sm text-center md:text-base md:text-left">
                Informações de pagamento
              </span>
            </div>
          </div>
        </div>

        <div className="w-full px-6 mt-4">
          <div className="flex flex-col items-center mb-6">
            <img src={logoJuripass} alt="Logo Juripass" className="h-16 mb-8" />
            <h2 className="text-xl font-semibold text-juripass mb-2">
              Revisão e pagamento
            </h2>
            <p className="text-gray-500 text-center mb-2">
              Confira se todas as informações estão corretas e continue com o
              pagamento
            </p>
          </div>
        </div>

        <div className="mt-4 mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl text-[#4b5563] border bg-white border-[#CBCED6]">
            <h3 className="text-center font-semibold text-juripass text-lg mb-4">
              Resumo do pedido
            </h3>

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

          <div className="border bg-white border-[#CBCED6] border-solid p-4 rounded-2xl text-[#4b5563]">
            <h3 className="text-left font-semibold text-juripass text-lg mb-4">
              Dados informados
            </h3>

            <ItemInfo label="Nome" value={planService.name} />
            <ItemInfo label="CPF" value={planService.cpf} />
            <ItemInfo label="E-mail" value={planService.email} />
            <ItemInfo label="Telefone" value={planService.telefone} />

            {planService.getDependentes().length > 0 && (
              <>
                <div className="w-full h-[1px] bg-[#CBCED6] my-8"></div>
                <h3 className="text-left font-semibold text-juripass text-lg mb-4">
                  Dependentes
                </h3>

                {planService.getDependentes() &&
                  planService
                    .getDependentes()
                    .map((dependent: any, index: number) => {
                      return (
                        <p key={index} className="leading-6 mb-2">
                          {dependent.name} <br />
                        </p>
                      );
                    })}
              </>
            )}
          </div>

          <div className="border bg-white border-[#CBCED6] border-solid p-4 rounded-2xl text-[#4b5563]">
            <h3 className="text-center font-semibold text-juripass text-lg mb-4">
              Formas de pagamento
            </h3>

            <Payment
              initialization={{
                amount: planService.getCouponDiscount(planService.planValue, planService.planName),
              }}
              customization={customization}
              locale="pt-BR"
              onRenderNextStep={() => console.log("onRenderNextStep")}
              onSubmit={handlePayment}
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
