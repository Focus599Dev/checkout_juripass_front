import tutorialAsset from "../assets/img/tutorialpage/tutorialasset.webp";
import videoAsset from "../assets/img/tutorialpage/videoasset.webp";
import logo from "../assets/img/tutorialpage/logovariation.webp";
import headerAsset from "../assets/img/tutorialpage/headerasset.webp";
import icon1 from "../assets/img/tutorialpage/icons/icon1.png";
import icon2 from "../assets/img/tutorialpage/icons/icon2.png";
import icon3 from "../assets/img/tutorialpage/icons/icon3.png";
import icon4 from "../assets/img/tutorialpage/icons/icon4.png";
import whatsappIcon from "../assets/img/whatsapp-variation.png";
import { TutorialCarousel } from "../Components/TutorialCarousel";
import { PlanCoverageCarousel } from "../Components/PlanCoverageCarousel";
export const Tutorial = () => {
  return (
    <div className="flex flex-col gap-16">
      <header className="bg-[#4288C8] rounded-2xl pt-4 md:pt-0">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-2/3 lg:pr-8 flex flex-col text-center justify-center items-center lg:text-left gap-8">
            <img src={logo} className="w-2/3" alt="logo" />
            <h1 className="text-2xl text-center font-medium text-white">
              ACOLHIMENTO JURÍDICO <br />
              <span className="font-light">NA PALMA DA SUA MÃO</span>
            </h1>
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src={headerAsset}
              className="w-full"
              alt="home"
              loading="lazy"
            />
          </div>
        </div>
      </header>

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
          <span className="text-[#3F87CF]">O que é a</span> Juripass?
        </h2>
        <p className="text-gray-700 mt-4">
          A Juripass oferece apoio jurídico descomplicado para esclarecer
          dúvidas e resolver questões legais do dia a dia. Com atendimento ágil
          e humanizado, conectamos você a advogados especializados para oferecer
          orientações e soluções práticas. Nossa cobertura abrangente garante
          acesso ilimitado a especialistas para você e sua família.
        </p>
      </section>

      <section className="container mx-auto gap-12 px-4 flex flex-col lg:flex-row items-center mb-12">
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img src={videoAsset} className="w-full" alt="video" loading="lazy" />
        </div>
        <div className="lg:w-1/2 lg:pr-8 text-center lg:text-left">
          <h1 className="text-2xl font-bold text-[#27335E]">
            Escaneie o QR Code e salve nosso contato
          </h1>
          <p className="text-lg text-gray-700 mt-8 mb-16">
            Utilize a câmera do seu celular ou um aplicativo de leitura de QR
            Code para entrar em contato diretamente com a Juripass através do
            WhatsApp.
          </p>
          <a
            href="https://wa.me/551150395554"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-row items-center gap-2 bg-white text-[#3F87CF] font-semibold text-lg shadow-lg py-2 px-6 rounded-xl hover:bg-[#27335E] hover:text-white transition duration-500 ease-in-out"
          >
            <img src={whatsappIcon} className="w-8" alt="icone" /> (11)
            5039-5554
          </a>
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
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-2 rounded-2xl p-8 text-left flex flex-col gap-4">
            <img src={icon1} className="w-12" alt="icone" />
            <h3 className="text-xl font-bold text-[#27335E]">
              Conteúdo Educacional
            </h3>
            <p className="text-gray-700">
              Conteúdos educativos e curiosidades sobre questões jurídicas serão
              disponibilizados de maneira prática e acessível, seja pelo
              WhatsApp, por e-mail ou diretamente pela sua área de Recursos
              Humanos.
            </p>
          </div>
          <div className="border-2 rounded-2xl p-8 text-left flex flex-col gap-4">
            <img src={icon2} className="w-12" alt="icone" />
            <h3 className="text-xl font-bold text-[#27335E]">
              Manual em PDF e consultoria
            </h3>
            <p className="text-gray-700">
              Baixe agora e aproveite nosso conteúdo completo em PDF, com
              informações claras e práticas para ajudar você a aproveitar melhor
              o seu benefício. Faça o download e confira!
            </p>
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
              className="text-[#3F87CF] font-semibold underline"
              href="https://www.juripass.com.br/blog"
              target="_blank"
            >
              Clique aqui para acessar o Blog
            </a>
          </div>
          <div className="border-2 rounded-2xl p-8 text-left flex flex-col gap-4">
            <img src={icon4} className="w-12" alt="icone" />
            <h3 className="text-xl font-bold text-[#27335E]">
              E-mail de suporte
            </h3>
            <p className="text-gray-700">
              Se tiver alguma dúvida ou precisar de mais esclarecimentos, não
              hesite em nos contatar! Nosso e-mail de suporte é
              <span className="text-[#3F87CF]"> suporte@juripass.com.br</span>.
              Ficaremos felizes em ajudá-lo!
            </p>
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
