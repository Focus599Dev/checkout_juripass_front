import RegisterService from "../Services/RegisterService";

type CardInfo = {
  name: string;
  company: string;
};

interface Props {
  cardInfo?: CardInfo;
}

const registerService = new RegisterService();

export const JuripassCardID = ({ cardInfo }: Props) => {
  const { name = "", company = "" } = cardInfo || {};
  const cardName = name ? name : registerService.name;
  const cardCompany = company ? company : registerService.organization;

  return (
    <div className="max-w-full md:max-w-lg w-full bg-[#27335E] text-center relative overflow-hidden rounded-2xl ">
      <img
        src={require("../assets/img/card-background.png")}
        alt="Linhas"
        className="absolute inset-0 w-full h-full object-cover z-0 rounded-2xl"
      />
      <div className="relative z-10 rounded-2xl p-4 md:p-6 text-white shadow-lg flex flex-col justify-between gap-4">
        <div className="flex justify-between items-start">
          <img
            src={require("../assets/img/logo-juripass-white.png")}
            alt="Juripass Logo"
            className="w-12 md:w-20"
          />
          <span className="text-2xl md:text-4xl font-bold">
            <span className="text-[#3F87CF]">JURI</span>
            <span className="text-white">PASS</span>
          </span>
        </div>

        <div className="flex flex-row justify-between items-end text-start gap-4">
          <div className="mt-4">
            <p className="text-xs">Nome:</p>
            <p className="text-sm md:text-lg font-semibold break-words max-w-[250px]">
              {cardName ? cardName : "..."}
            </p>

            <p className="text-xs mt-4">Empresa:</p>
            <p className="text-sm md:text-lg font-semibold break-words max-w-[250px]">
              {cardCompany ? cardCompany : "..."}
            </p>
          </div>

          <div className="w-fit min-w-fit flex justify-end mt-4 p-2 md:p-4 rounded-sm md:rounded-xl bg-white">
            <img
              src={require("../assets/img/whatsapp-qrcode.png")}
              alt="QR Code"
              className="w-20 h-20 md:w-32 md:h-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
