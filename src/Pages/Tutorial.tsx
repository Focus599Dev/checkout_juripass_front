import tutorialAsset from "../assets/img/tutorialpage/juripass-card.webp";
import icon2 from "../assets/img/tutorialpage/icons/icon2.png";
import icon3 from "../assets/img/tutorialpage/icons/icon3.png";
import icon4 from "../assets/img/tutorialpage/icons/icon4.png";
import { TutorialCarousel } from "../Components/TutorialCarousel";
import { PlanCoverageCarousel } from "../Components/PlanCoverageCarousel";
import chatIcon from "../assets/icons/chat.png";
import handsIcon from "../assets/icons/hands.png";
import mobileIcon from "../assets/icons/mobile.png";
import { useNavigate } from "react-router-dom";

export const Tutorial = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/cadastro");
  };
  return (
    <div className="flex flex-col gap-16">
      <section className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-8 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-[#27335E]">
            <span className="text-[#3F87CF]">Chegou o seu novo</span>
            <br /> benefício jurídico
          </h1>
          <p className="text-lg text-gray-700 mt-8 mb-16">
            Imagine se você tivesse acesso a advogados a qualquer momento e na
            palma da sua mão, para esclarecer dúvidas ou ajudá-lo com seus
            problemas jurídicos do dia a dia. Agora você tem. Bem-vindo ao seu
            novo benefício jurídico!
          </p>
          <button
            onClick={() => handleNavigate()}
            className="cursor-pointer inline-flex flex-row items-center gap-2 bg-[#3F87CF] text-white font-semibold text-lg shadow-lg py-4 px-6 rounded-xl hover:bg-[#27335E] hover:text-white transition duration-500 ease-in-out"
          >
            Cadastre-se agora
          </button>
        </div>

        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src={tutorialAsset}
            className="w-full"
            alt="home"
            loading="lazy"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#27335E]">
          <span className="text-[#3F87CF]">Segurança jurídica</span> na palma da
          sua mão
        </h2>
        <p className="text-gray-700 mt-4">
          A Juripass oferece apoio jurídico descomplicado para esclarecer
          dúvidas e resolver questões legais do dia a dia. Com atendimento ágil
          e humanizado, conectamos você a advogados especializados para oferecer
          orientações e soluções práticas. Nossa cobertura abrangente garante
          acesso ilimitado a especialistas para você e sua família.
        </p>
      </section>

      <section className="pt-4 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#27335E]">
            <span className="text-[#3F87CF]">Como</span> funciona?
          </h2>
          <p className="text-gray-700 mt-4">
            Atendimento rápido e simples para que você e sua família possam
            acessar seus direitos, tanto em acordos quanto em demandas judiciais
            e extrajudiciais. Nossa cobertura garante orientação e acesso
            ilimitado a advogados sempre que precisar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-left">
            <div className="p-6 bg-[#27335E] rounded-2xl border-[#CBCED6] border cursor-default hover:bg-[#3F87CF] transition duration-500 ease-in-out">
              <img src={mobileIcon} className="w-12 mb-4" alt="icone celular" />
              <h3 className="text-xl font-semibold text-white">
                Atendimento rápido
              </h3>
              <p className="text-gray-200 mt-2">
                Esclareça suas dúvidas e receba orientação personalizada a
                qualquer momento através do WhatsApp.
              </p>
            </div>

            <div className="p-6 bg-[#27335E] rounded-2xl border-[#CBCED6] border cursor-default hover:bg-[#3F87CF] transition duration-500 ease-in-out">
              <img src={chatIcon} className="w-12 mb-4" alt="icone chat" />
              <h3 className="text-xl font-semibold text-white">
                Orientação humanizada
              </h3>
              <p className="text-gray-200 mt-2">
                Um especialista fornecerá orientações personalizadas e, se
                necessário, conectará você a um advogado para ação jurídica.
              </p>
            </div>

            <div className="p-6 bg-[#27335E] rounded-2xl border-[#CBCED6] border cursor-default hover:bg-[#3F87CF] transition duration-500 ease-in-out">
              <img
                src={handsIcon}
                className="w-12 mb-4"
                alt="icone aperto de mao"
              />
              <h3 className="text-xl font-semibold text-white">
                Honorários Justos
              </h3>
              <p className="text-gray-200 mt-2">
                Em caso de ação, os honorários são negociados diretamente entre
                você e o advogado e só serão cobrados em caso de sucesso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#27335E]">
          <span className="text-[#3F87CF]">Como utilizar a </span> Juripass?
        </h2>
        <TutorialCarousel />
      </section>

      <section className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#27335E]">
          <span className="text-[#3F87CF]">Sua cobertura </span> Juripass
        </h2>
        <PlanCoverageCarousel />
      </section>

      <section className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#27335E] mb-8">
          <span className="text-[#3F87CF]">Conteúdo </span> adicional
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-2 rounded-2xl p-8 text-left flex flex-col gap-4">
            <img src={icon2} className="w-12" alt="icone" />
            <h3 className="text-xl font-bold text-[#27335E]">
              Download do manual em PDF
            </h3>
            <p className="text-gray-700">
              Baixe agora nosso PDF com informações claras e práticas para
              otimizar seu benefício. Aproveite o conteúdo completo!
            </p>
            <a
              href="/manualativacao.pdf"
              download="ManualAtivacao.pdf"
              className="text-center flex-row items-center gap-2 bg-[#3F87CF] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#27335E] hover:text-white transition duration-500 ease-in-out"
            >
              Baixar Manual de Ativação
            </a>
          </div>
          <div className="border-2 rounded-2xl p-8 text-left flex flex-col gap-4">
            <img src={icon3} className="w-12" alt="icone" />
            <h3 className="text-xl font-bold text-[#27335E]">
              Conheça nosso Blog!
            </h3>
            <p className="text-gray-700">
              Não deixe de visitar nosso blog para acessar mais conteúdos, dicas
              de uso e informações sobre seus direitos, de forma simples e
              fácil. Visite agora!
            </p>
            <a
              href="https://www.juripass.com.br/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center flex-row items-center gap-2 bg-[#3F87CF] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#27335E] hover:text-white transition duration-500 ease-in-out"
            >
              Acessar blog
            </a>
          </div>
          <div className="border-2 rounded-2xl p-8 text-left flex flex-col gap-4">
            <img src={icon4} className="w-12" alt="icone" />
            <h3 className="text-xl font-bold text-[#27335E]">
              E-mail de suporte
            </h3>
            <p className="text-gray-700">
              Se tiver alguma dúvida ou precisar de mais esclarecimentos, não
              hesite em nos contatar! Ficaremos felizes em ajudá-lo!
            </p>
            <a
              href="mailto:suporte@juripass.com.br"
              className="text-center flex-row items-center gap-2 bg-[#3F87CF] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#27335E] hover:text-white transition duration-500 ease-in-out"
            >
              E-mail suporte
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t mt-16 py-8 text-center">
        <p className="text-gray-700">
          Alameda Rio Negro 1030 sala 2304 - Alphaville, Barueri - SP -
          06454-000
        </p>
        <p className="text-gray-700">
          Juripass Desenvolvimento de Software LTDA - CNPJ 53.971.772/0001-37
        </p>
        <p className="text-gray-700">
          © 2024 Juripass. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};
