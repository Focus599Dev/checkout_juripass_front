import qrCodeWhatsapp from "../assets/img/qrcodewhatsapp.png";
import whatsappIcon from "../assets/img/whatsappicon.png";
import successIcon from "../assets/icons/successicon.png";

export const PaymentSuccess = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 md:px-6 py-12">
        <div className="max-w-md text-center space-y-4 flex flex-col gap-4">
          <div className="flex justify-center">
            <img
              src={successIcon}
              className="h-16 self-center"
              alt="Juripass logo"
            />
          </div>
          <h1 className="text-lg font-semibold sm:text-xl md:text-2xl">
            Compra feita com sucesso
          </h1>
        </div>

        <section className="pt-4 pb-16 mt-8">
          <div className="container mx-auto px-4 text-left">
            <h2 className="text-4xl font-bold text-[#27335E]">
              <span className="text-[#3F87CF]">Como</span> funciona?
            </h2>
            <p className="text-lg text-gray-700 mt-4 mb-4">
              1. <strong>Acesso rápido via Whatsapp</strong>: Envie uma mensagem
              de texto ou áudio explicando sua situação ou pergunta. Se houver
              imagens e/ou documentos, pode anexá-los para ajudar no
              entendimento.
            </p>
            <p className="text-lg text-gray-700 mt-4 mb-4">
              2. <strong>Orientação Humanizada</strong>: Um dos nossos
              especialistas qualificados responderá com as orientações
              necessárias em até 24 horas.
            </p>
            <p className="text-lg text-gray-700 mt-4 mb-4">
              3. <strong>Ação Jurídica</strong>: Se necessário, conectaremos
              você a um advogado que dará continuidade ao seu atendimento.
            </p>
          </div>
          <div className="container mx-auto px-4 text-left mt-8">
            <h2 className="text-4xl font-bold text-[#27335E]">
              <span className="text-[#3F87CF]">Como</span> acessar?
            </h2>
            <p className="text-lg text-gray-700 mt-4 mb-4">
              Para acessar entre em contato pelo WhatsApp clicando no <strong>link abaixo</strong> ou escaneando o <strong>QR Code</strong>:
            </p>
            <div className="flex justify-center mt-6">
              <div
                className="bg-juripass rounded-lg flex flex-col md:flex-row items-center gap-6 p-6"
                style={{ width: "fit-content" }}
              >
                <a
                  className="bg-juripass border border-white text-white rounded-md px-4 py-2 flex gap-2 justify-center items-center w-full"
                  href="https://wa.me/551150395554"
                >
                  <img src={whatsappIcon} className="h-8" alt="Whatsapp logo" />
                  Whatsapp
                </a>
                <p className="text-white">ou</p>
                <img
                  src={qrCodeWhatsapp}
                  className="md:h-40"
                  alt="QrCode whatsapp"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
