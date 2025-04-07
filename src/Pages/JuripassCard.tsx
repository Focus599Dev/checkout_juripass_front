import { Footer } from "../Components/Footer";
import { JuripassCardID } from "../Components/JuripassCardID";

export const JuripassCard = () => {
  return (
    <div className="w-full min-h-[80vh] flex flex-col gap-8 items-center justify-center bg-white">
      <h2 className="text-2xl font-semibold text-[#27335E] mb-1">
        Minha Carteirinha Juripass
      </h2>
      <p className="max-w-2xl text-center text-sm text-[#6B7280] mb-8">
        Bem-vindo ao nosso serviço jurídico! Sua carteirinha de identificação
        comprova seu vínculo e acesso aos nossos serviços. Abaixo, estão suas
        informações de identificação.
      </p>

      <JuripassCardID />

      <Footer />
    </div>
  );
};
