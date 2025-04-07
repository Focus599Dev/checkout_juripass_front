import { useNavigate } from "react-router-dom";

export const Links = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-[#27335E] mb-1">
          Bem-vindo ao seu novo benefício!
        </h2>
        <p className="text-sm text-[#6B7280] mb-8">
          Por onde você gostaria de começar? Selecione uma das opções abaixo.
        </p>

        <div className="flex flex-col gap-4">
          <a
            href="https://wa.me/551150395554"
            className="flex items-center justify-start gap-3 bg-[#3F87CF] text-white px-3 py-3 rounded-lg font-medium shadow hover:opacity-90 transition"
          >
            <img
              src={require("../assets/icons/linksPage/option1.png")}
              className="w-12 h-12"
              alt="Iniciar novo atendimento"
            />
            Iniciar Novo Atendimento
          </a>
          <a
            onClick={() => navigate("/cadastro")}
            className="cursor-pointer flex items-center justify-start gap-3 bg-[#3F87CF] text-white px-3 py-3 rounded-lg font-medium shadow hover:opacity-90 transition"
          >
            <img
              src={require("../assets/icons/linksPage/option2.png")}
              className="w-12 h-12"
              alt="Quero Me Cadastrar"
            />
            Quero Me Cadastrar
          </a>
          <a
            onClick={() => navigate("/cadastro/dependentes")}
            className="cursor-pointer flex items-center justify-start gap-3 bg-[#3F87CF] text-white px-3 py-3 rounded-lg font-medium shadow hover:opacity-90 transition"
          >
            <img
              src={require("../assets/icons/linksPage/option3.png")}
              className="w-12 h-12"
              alt="Cadastrar Dependentes"
            />
            Cadastrar Dependentes
          </a>
          <a
            onClick={() => navigate("/carteirinha")}
            className="cursor-pointer flex items-center justify-start gap-3 bg-[#3F87CF] text-white px-3 py-3 rounded-lg font-medium shadow hover:opacity-90 transition"
          >
            <img
              src={require("../assets/icons/linksPage/option4.png")}
              className="w-12 h-12"
              alt="Minha Carteirinha Juripass"
            />
            Minha Carteirinha Juripass
          </a>
          <a
            onClick={() => navigate("/tutorial")}
            className="cursor-pointer flex items-center justify-start gap-3 bg-[#3F87CF] text-white px-3 py-3 rounded-lg font-medium shadow hover:opacity-90 transition"
          >
            <img
              src={require("../assets/icons/linksPage/option5.png")}
              className="w-12 h-12"
              alt="Dúvidas e Orientações"
            />
            Dúvidas e Orientações
          </a>
        </div>
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>
          Alameda Rio Negro 1030 sala 2304 - Alphaville, Barueri - SP -
          06454-000
        </p>
        <p>
          Juripass Desenvolvimento de Software LTDA - CNPJ 53.971.772/0001-37
        </p>
        <p>© 2024 Juripass. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
