import { useState } from "react";
import step1 from "../assets/img/tutorialpage/steps/step1.webp";
import step2 from "../assets/img/tutorialpage/steps/step2.webp";
import step3 from "../assets/img/tutorialpage/steps/step3.webp";
import step4 from "../assets/img/tutorialpage/steps/step4.webp";

interface Step {
  image: string;
  title: string;
  text: string;
}

const steps: Step[] = [
  {
    image: step1,
    title: "Acesso rápido e descomplicado",
    text: "Você acessa via WhatsApp. É Importante que você salve nosso canal de atendimento em seus contatos.",
  },
  {
    image: step2,
    title: "Conheça a nossa assistente virtual, Ju!",
    text: "Olá, me chamo Ju, sou a assistente virtual da Juripass. Estou aqui para ajudar! Clique aqui se você tiver dúvidas ou precisar de dicas e orientações sobre como utilizar o seu benefício.",
  },
  {
    image: step3,
    title: "Vamos te orientar",
    text: "Seja detalhista, incluindo todas as informações. Se existir documentos, imagens e vídeos pertinentes a sua dúvida ou problema você deve enviar. Se não quiser escrever, pode nos mandar mensagens por áudio também.",
  },
  {
    image: step2,
    title: "Sucesso! Agora recebemos sua mensagem!",
    text: "Um de nossos especialistas entrará em contato, com orientações sobre a sua dúvida ou problema. E fique tranquilo, que a partir de agora nós estamos cuidando de você.",
  },
  {
    image: step4,
    title: "Aqui sua questão é respondida!",
    text: "O especialista faz contato para esclarecer sua questão. Se necessário pedirá para você, o envio de arquivos para um melhor entendimento da situação e direcionamento.",
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

  return (
    <div className="my-8 bg-[#253262] p-12 rounded-2xl">
      <div className="flex flex-col md:flex-row rounded-xl overflow-hidden bg-white">
        <div className="flex w-full">
          <img className="w-full" src={steps[currentIndex].image} alt="Step" />
        </div>
        <div className="w-full flex flex-col p-8 text-left justify-between">
          <div>
            <p className="text-2xl font-semibold text-[#253262] mb-4">
              {steps[currentIndex].title}
            </p>
            <p className="text-[#5A5D65]">{steps[currentIndex].text}</p>
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
                className="w-12 h-12 bg-[#3F87CF] text-white rounded-full text-2xl flex justify-center items-center"
              >
                {"<"}
              </button>
              <button
                onClick={nextStep}
                className="w-12 h-12 bg-[#3F87CF] text-white rounded-full text-2xl flex justify-center items-center"
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
