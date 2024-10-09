import { useContext, useState } from "react";
import { contextPlanData } from "../App";
import PlansService from "../Services/PlansService";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageLoader from "../Components/PageLoader";
import homeImage from "../assets/img/homeimage.webp";
import familyImage from "../assets/img/familyimage.webp";
import family2Image from "../assets/img/family2image.webp";
import chatIcon from "../assets/icons/chat.png";
import handsIcon from "../assets/icons/hands.png";
import mobileIcon from "../assets/icons/mobile.png";
import { PlanCardPlans } from "../Components/PlanCardPlans";

export const Plans = () => {
  const contextPlan = useContext(contextPlanData);

  const planService = new PlansService();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  let planList = planService.getPlanList();

  const [searchParams] = useSearchParams();

  if (searchParams.has("coupon")) {
    planService.setCoupon(searchParams.get("coupon"));
  }

  if (planService.getCouponCode() === 'CORE50' ) {
    planList = planList.filter(plan => plan.planName === 'Plano família');
  }

  const onClickSign = (plan: any) => {
    setLoading(true);

    contextPlan.planValue = plan.planValue;

    contextPlan.planId = plan.planId;

    contextPlan.planName = plan.planName;

    contextPlan.planValueFormated = plan.planValueFormated;

    contextPlan.planDesc = plan.planDesc;

    contextPlan.benefits = plan.benefits;

    planService.mapperContextToClass(contextPlan);

    if (planService.hasCupon()) {
      planService.calculateDiscount(plan.planValue);
    }

    planService.saveLocalStorage();

    setTimeout(() => {
      setLoading(false);

      navigate("/planos/detalhes/" + planService.getUUIDLocalStorage());
    }, 500);
  };

  const PlansCard = planList.map((plan, key) => {
    if (planService.hasCupon()) {
      planService.getCouponDiscount(plan.planValue);

      return (
        <PlanCardPlans
          key={key}
          plan={plan}
          onClickSign={onClickSign}
          hasCoupon={true}
          textCoupon={planService.planValueFormatedCoupon}
          discount={planService.couponDiscount}
        />
      );
    } else {
      return <PlanCardPlans key={key} plan={plan} onClickSign={onClickSign} />;
    }
  });

  const BenefitIcon = () => {
    return <span className="font-bold text-lg text-[#3F87CF]">+ </span>;
  };

  return (
    <>
      <PageLoader isShow={loading} />
      <div>
        <header className="pt-12 pb-4">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center border-b-2 mb-12">
            <div className="lg:w-1/2 lg:pr-8 text-center lg:text-left">
              <h1 className="text-6xl font-bold text-[#27335E]">
                <span className="text-[#3F87CF]">Segurança jurídica</span> na
                palma da sua mão
              </h1>
              <p className="text-lg text-gray-700 mt-8 mb-16">
                A <strong>Juripass</strong> traz para você e sua família um
                acolhimento jurídico exclusivo, capaz de esclarecer suas dúvidas
                e orientar suas demandas legais a qualquer hora. Garanta mais
                tranquilidade e segurança no seu dia a dia!
              </p>
              <a
                href="#planos"
                className="bg-[#3F87CF] text-white font-semibold text-lg shadow-lg py-4 px-6 rounded-xl hover:bg-[#27335E] transition duration-500 ease-in-out"
              >
                Escolha seu plano
              </a>
            </div>

            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <img src={homeImage} className="w-full" alt="home" />
            </div>
          </div>
        </header>

        {/* <div className="w-full h-[2px] bg-[#dfe6ec] my-12"></div> */}

        <section className="pt-4 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-[#27335E]">
              <span className="text-[#3F87CF]">Como</span> funciona?
            </h2>
            <p className="text-gray-700 mt-4">
              Atendimento rápido e simples para que você e sua família possam
              acessar seus direitos, tanto em acordos quanto em demandas
              judiciais e extrajudiciais. Nossos planos garantem orientação e
              acesso ilimitado a advogados sempre que precisar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-left">
              <div className="p-6 bg-[#27335E] rounded-2xl border-[#CBCED6] border hover:rotate-6 hover:bg-[#3F87CF] transition duration-500 ease-in-out">
                <img
                  src={mobileIcon}
                  className="w-12 mb-4"
                  alt="icone celular"
                />
                <h3 className="text-xl font-semibold text-white">
                  Atendimento rápido
                </h3>
                <p className="text-gray-200 mt-2">
                  Esclareça suas dúvidas e receba orientação personalizada a
                  qualquer momento através do WhatsApp.
                </p>
              </div>

              <div className="p-6 bg-[#27335E] rounded-2xl border-[#CBCED6] border hover:rotate-6 hover:bg-[#3F87CF] transition duration-500 ease-in-out">
                <img src={chatIcon} className="w-12 mb-4" alt="icone chat" />
                <h3 className="text-xl font-semibold text-white">
                  Orientação humanizada
                </h3>
                <p className="text-gray-200 mt-2">
                  Um especialista fornecerá orientações personalizadas e, se
                  necessário, conectará você a um advogado para ação jurídica.
                </p>
              </div>

              <div className="p-6 bg-[#27335E] rounded-2xl border-[#CBCED6] border hover:rotate-6 hover:bg-[#3F87CF] transition duration-500 ease-in-out">
                <img
                  src={handsIcon}
                  className="w-12 mb-4"
                  alt="icone aperto de mao"
                />
                <h3 className="text-xl font-semibold text-white">
                  Honorários Justos
                </h3>
                <p className="text-gray-200 mt-2">
                  Em caso de ação, os honorários são negociados diretamente
                  entre você e o advogado e só serão cobrados em caso de sucesso
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-4">
                <div className="bg-white rounded-2xl border border-[#CBCED6] overflow-hidden">
                  <div className="p-6 text-left">
                    <h2 className="text-3xl text-center font-bold text-[#27335E]">
                      <span className="text-[#3F87CF]">Vantagens</span> para
                      você!
                    </h2>
                    <ul className="mt-6 text-gray-700 space-y-3">
                      <li>
                        <BenefitIcon />
                        Confidencialidade e atendimento humanizado
                      </li>
                      <li>
                        <BenefitIcon />
                        Agilidade e atendimento sem burocracia
                      </li>
                      <li>
                        <BenefitIcon />
                        Contato direto com advogados especializados
                      </li>
                      <li>
                        <BenefitIcon />
                        Suporte a diferentes especialistas
                      </li>
                      <li>
                        <BenefitIcon />
                        Acesso descomplicado via WhatsApp
                      </li>
                    </ul>
                  </div>
                  <img className="w-full" src={familyImage} alt="Family" />
                </div>
              </div>

              <div className="md:w-1/2 p-4 text-left">
                <div className="bg-white rounded-2xl border border-[#CBCED6] overflow-hidden">
                  <img className="w-full" src={family2Image} alt="Family 2" />
                  <div className="p-6">
                    <h2 className="text-3xl text-center font-bold text-[#27335E]">
                      <span className="text-[#3F87CF]">Sua</span> cobertura
                    </h2>
                    <ul className="mt-6 text-gray-700 space-y-3">
                      <li>
                        <BenefitIcon />
                        Direito do consumidor
                      </li>
                      <li>
                        <BenefitIcon />
                        Propriedade e moradia
                      </li>
                      <li>
                        <BenefitIcon />
                        Divórcio e pensão
                      </li>
                      <li>
                        <BenefitIcon />
                        Herança e sucessão
                      </li>
                      <li>
                        <BenefitIcon />
                        Responsabilidade civil
                      </li>
                      <li>
                        <BenefitIcon />
                        Contratos e trabalhistas
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16" id="planos">
          <div className="container mx-auto px-4 text-left">
            <h2 className="text-4xl font-bold text-[#27335E] text-center">
              <span className="text-[#3F87CF]">Escolha</span> o seu plano
            </h2>

            <div className="gap-4 flex flex-col md:flex-row items-center justify-center mt-8">
              {PlansCard}
            </div>
          </div>
        </section>

        <footer className="py-6 text-center border-t border-[#CBCED6]">
          <p>
            Alameda Rio Negro 1030 sala 2304 - Alphaville, Barueri - SP -
            06454-000
          </p>
          <p>
            Juripass Desenvolvimento de Software LTDA - CNPJ 35.911.772/0001-37
            © 2024 Juripass. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </>
  );
};
