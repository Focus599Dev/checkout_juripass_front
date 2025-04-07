import { useState } from "react";
import step1 from "../assets/img/tutorialpage/steps/step1.webp";
import step2 from "../assets/img/tutorialpage/steps/step2.webp";
import step3 from "../assets/img/tutorialpage/steps/step3.webp";
import step4 from "../assets/img/tutorialpage/steps/step4.webp";
import step5 from "../assets/img/tutorialpage/steps/step5.webp";
import step6 from "../assets/img/tutorialpage/steps/step6.webp";

interface Step {
  image: string;
  title: string;
  text: string;
  link?: { url: string; word: string };
}

const steps: Step[] = [
  {
    image: step1,
    title: "Salve nosso contato!",
    text: "Use a câmera do seu celular para escanear nosso QR Code ou clique aqui para salvar o contato e começar seu atendimento pelo nosso canal no WhatsApp.",
    link: {
      url: "https://wa.me/551150395554",
      word: "clique aqui",
    },
  },
  {
    image: step2,
    title: "Estamos sempre prontos para ajudar.",
    text: "Sempre que precisar, entre em contato conosco por meio do nosso canal de atendimento no WhatsApp. Teremos prazer em te ajudar.",
    link: {
      url: "https://wa.me/551150395554",
      word: "WhatsApp",
    },
  },
  {
    image: step3,
    title: "Quanto mais detalhes, melhor!",
    text: "Explique exatamente o que aconteceu. Nos conte a sua dúvida ou descreva o seu problema. Se preferir, pode nos mandar mensagens por áudio ou vídeos.",
  },
  {
    image: step4,
    title: "Sucesso! Agora recebemos sua mensagem!",
    text: "Um de nossos especialistas entrará em contato, com orientações sobre a sua dúvida ou problema. E fique tranquilo, que a partir de agora nós estamos cuidando de você.",
  },
  {
    image: step5,
    title: "Aqui suas dúvidas são respondidas!",
    text: "Dependendo da complexidade de sua dúvida ou problema, nosso consultor encaminhará a questão a um advogado especialista, que dará seguimento ao seu atendimento",
  },
  {
    image: step6,
    title: "Transparência e segurança para você!",
    text: "Caso nosso advogado identifique potencial para uma ação, os honorários serão negociados diretamente com você, respeitando a tabela da OAB, e só serão cobrados em caso de sucesso ao final do processo.",
  },
];

export const TutorialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStep = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? steps.length - 1 : prevIndex - 1
    );
  };

  const currentStep = steps[currentIndex];

  const renderTextWithLink = () => {
    if (!currentStep.link) return <>{currentStep.text}</>;

    const { word, url } = currentStep.link;
    const parts = currentStep.text.split(new RegExp(`(${word})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === word.toLowerCase() ? (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#3F87CF] underline"
        >
          {part}
        </a>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="my-8 bg-[#253262] p-0 md:p-12 rounded-2xl">
      <div className="flex flex-col md:flex-row rounded-xl overflow-hidden bg-white">
        <div className="flex w-full md:w-1/2">
          <img className="w-full" src={currentStep.image} alt="Step" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col p-8 text-left justify-between">
          <div>
            <p className="text-2xl font-semibold text-[#253262] mb-4">
              {currentStep.title}
            </p>
            <p className="text-[#5A5D65]">{renderTextWithLink()}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-[#3F87CF]" : "bg-[#D9D9D9]"
                  }`}
                ></span>
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={prevStep}
                className="w-10 h-10 md:w-12 md:h-12 bg-[#3F87CF] text-white rounded-full text-2xl flex justify-center items-center"
              >
                {"<"}
              </button>
              <button
                onClick={nextStep}
                className="w-10 h-10 md:w-12 md:h-12 bg-[#3F87CF] text-white rounded-full text-2xl flex justify-center items-center"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
