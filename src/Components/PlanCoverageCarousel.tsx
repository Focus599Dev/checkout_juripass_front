import { useState } from "react";
import logo from "../assets/img/juripass-dark.png";
import icon1 from "../assets/img/tutorialpage/icons/iconsPlansCoverage/icon1.png";
import icon2 from "../assets/img/tutorialpage/icons/iconsPlansCoverage/icon2.png";
import icon3 from "../assets/img/tutorialpage/icons/iconsPlansCoverage/icon3.png";
import icon4 from "../assets/img/tutorialpage/icons/iconsPlansCoverage/icon4.png";
import icon5 from "../assets/img/tutorialpage/icons/iconsPlansCoverage/icon5.png";
import icon6 from "../assets/img/tutorialpage/icons/iconsPlansCoverage/icon6.png";

interface Step {
  title: string;
  subtitle?: string;
  content: string[];
  notIncluded?: boolean;
  icon?: string;
}

const steps: Step[] = [
  {
    title: "Direito do consumidor",
    content: [
      "Cobranças indevidas: Empresas cobram por produtos ou serviços não contratados.",
      "Contratos abusivos: Cláusulas desvantajosas para o consumidor.",
      "Cancelamento e reembolso: Dificuldades para cancelar contratos e obter reembolso.",
      "Publicidade enganosa: Anúncios prometem benefícios inexistentes.",
      "Má prestação de serviços: Serviços inadequados ou abaixo do esperado.",
      "Responsabilidade por danos: Empresas não assumem danos causados por produtos defeituosos.",
      "Vício ou defeito no produto: Produtos apresentam problemas após a compra.",
      "Recusa na troca: Lojas não trocam produtos defeituosos.",
      "Cobrança abusiva: Uso de métodos de cobrança excessivos ou ameaçadores.",
      "Atraso na entrega: Produtos ou serviços não são entregues no prazo acordado.",
    ],
    icon: icon1,
  },
  {
    title: "Propriedade e moradia",
    content: [
      "Despejo: Tentativas de remover inquilinos de forma ilegal ou sem seguir o processo legal.",
      "Vícios ocultos e defeitos: Problemas não aparentes em imóveis no momento da compra ou aluguel.",
      "Regularização fundiária: Processos para formalizar documentação de propriedades.",
      "Condomínios e taxas: Conflitos sobre pagamento de taxas e decisões administrativas em condomínios.",
      "Problemas de vizinhança: Conflitos com vizinhos, como ruídos ou invasão de privacidade.",
      "Desapropriação: Aquisição de propriedades para utilidade pública, com compensação ao proprietário.",
      "Invasão de propriedade: Ocupação ou uso não autorizado de propriedades.",
      "Posse e usucapião: Disputas sobre direitos de posse de propriedades.",
      "Limitações ao direito de propriedade: Restrições legais que afetam o uso de propriedades, como zoneamento.",
      "Contratos de locação: Questões sobre cumprimento de contratos de aluguel e condições do imóvel.",
    ],
    icon: icon2,
  },
  {
    title: "Divórcio e pensão",
    content: [
      "Divisão de bens: Disputas sobre a partilha de bens adquiridos durante o casamento.",
      "Partilha de dívidas: Responsabilidade por dívidas contraídas durante o casamento.",
      "Modificação de acordos: Necessidade de alterar acordos devido a mudanças nas circunstâncias.",
      "Guarda dos filhos: Conflitos sobre guarda e visitação dos filhos menores.",
      "Uso do nome de casado: Decisões sobre manter ou não o nome de casado após o divórcio.",
      "Execução de decisões judiciais: Dificuldades em cumprir decisões relacionadas ao divórcio.",
      "Pensão alimentícia: Disputas sobre determinação e valor da pensão para filhos.",
      "Violência doméstica: Situações de violência exigindo medidas protetivas.",
      "Questões emocionais: Impacto emocional e psicológico do divórcio.",
      "Pensão entre cônjuges: Questões sobre pensão ao cônjuge com menor capacidade financeira após o divórcio.",
    ],
    icon: icon3,
  },
  {
    title: "Herança e sucessão",
    content: [
      "Testamento contestado: Disputas sobre a validade do testamento",
      "Inventário e partilha judicial: Processos judiciais para o inventário e partilha dos bens quando não há consenso.",
      "Herança de bens imóveis: Problemas na administração e divisão de imóveis, incluindo posse e pagamento de impostos.",
      "Partilha de bens: Conflitos na divisão dos bens, como imóveis, investimentos e veículos",
      "Dívidas do falecido: Responsabilidade pelo pagamento das dívidas e obrigações financeiras.",
      "Herdeiros ausentes ou desconhecidos: Dificuldades em localizar herdeiros ou beneficiários",
      "Exclusão de herdeiros: Questões sobre herdeiros legítimos excluídos do processo de sucessão",
      "Herança digital: Gestão de contas e bens digitais do falecido, como redes sociais e criptomoedas.",
      "Planejamento patrimonial inadequado: Complicações devido à falta de um planejamento patrimonial claro e eficaz pelo falecido.",
      "Direito à legítima: Reivindicação da parte garantida por lei.",
    ],
    icon: icon4,
  },
  {
    title: "Responsabilidade civil",
    content: [
      "Acidentes de trânsito: Disputas sobre responsabilidade, danos materiais e pessoais em colisões.",
      "Responsabilidade por produtos: Reclamações sobre danos causados por produtos defeituosos.",
      "Responsabilidade de animais: Danos causados por animais de estimação ou sob responsabilidade dos proprietários.",
      "Responsabilidade médica: Reclamações por erro médico, diagnóstico incorreto ou tratamento inadequado.",
      "Responsabilidade civil por atos Ilícitos: Danos intencionais ou por negligência, como agressões ou difamação.",
      "Responsabilidade ambiental: Danos ambientais causados por empresas ou indivíduos.",
      "Danos em propriedade: Disputas sobre responsabilidade por danos a propriedades, como incêndios ou inundações",
      "Responsabilidade de estabelecimentos comerciais: Ferimentos a clientes devido a condições inadequadas em comércios.",
    ],
    icon: icon5,
  },
  {
    title: "Contratos",
    subtitle: "Desde que não envolva seu empregador ou contratante",
    content: [
      "Descumprimento de contrato: Falta de cumprimento das obrigações contratuais, como entrega de produtos ou realização de serviços.",
      "Cláusulas penais: Questões sobre a validade e aplicação de multas ou penalidades por descumprimento.",
      "Contratos de compra e venda: Problemas com a transferência de propriedade, qualidade do produto, prazos de entrega e condições de pagamento.",
      "Interpretação de cláusulas contratuais: Disputas sobre o significado e interpretação de cláusulas ambíguas ou contraditórias.",
      "Contratos de locação: Problemas relacionados a aluguel, reparos, manutenção e devolução de depósito de segurança.",
      "Contratos de prestação de serviços: Litígios sobre a execução, qualidade, prazos e remuneração dos serviços prestados.",
      "Cláusulas penais: Questões sobre a validade e aplicação de multas ou penalidades por descumprimento.",
    ],
    icon: icon6,
  },
  // {
  //   title: "O que não está incluso",
  //   notIncluded: true,
  //   subtitle: "Envio do material completo",
  //   content: [
  //     "Para questões relacionadas ao direito criminal, direito do trabalho e ao Código de Ética e Conduta, sugerimos que você procure o departamento de Recursos Humanos para esclarecer suas dúvidas e receber orientações apropriadas.",
  //   ],
  // },
];

export const PlanCoverageCarousel = () => {
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
    <div className="my-8 p-8 bg-white rounded-xl shadow-md">
      <div className="gap-8 hidden lg:flex">
        <button
          onClick={prevStep}
          className="mt-2 w-14 h-12 flex justify-center items-center bg-[#3F87CF] text-white rounded-full text-2xl"
        >
          {"<"}
        </button>
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
              <h2 className="text-3xl font-bold text-[#3F87CF]">
                {steps[currentIndex].title}
              </h2>
            </div>
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-[#3F87CF]" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>
          </div>
          {steps[currentIndex].notIncluded ? (
            <div className="text-left">
              <h3 className="text-2xl font-semibold mb-4">
                {steps[currentIndex].subtitle}
              </h3>
              <p className="text-[#5A5D65]">{steps[currentIndex].content[0]}</p>
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-[#5A5D65]">
              {steps[currentIndex].content.map((text, index) => (
                <div className="flex gap-2" key={index}>
                  •
                  <p key={index} className="text-left">
                    <strong className="text-[#253262]">
                      {text.split(":")[0]}:
                    </strong>{" "}
                    {text.split(":")[1]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={nextStep}
          className="mt-2 w-14 h-12 flex justify-center items-center bg-[#3F87CF] text-white rounded-full text-2xl"
        >
          {">"}
        </button>
      </div>
      <div className="flex-col gap-8 flex lg:hidden">
        {steps.map((step, index) => {
          if (step.notIncluded) {
            return (
              <div className="text-left space-y-4" key={index}>
                <p className="font-semibold text-[#253262] text-xl">
                  {step.title}
                </p>
                <p className="font-semibold text-[#253262]">{step.subtitle}</p>
                <p className="">{step.content[0]}</p>
              </div>
            );
          }
          return (
            <div className="flex" key={index}>
              <img src={step.icon} className="w-16 h-16" alt="cobertura plano" />
              <p className="pt-2 font-semibold text-[#253262] text-xl">
                {step.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
