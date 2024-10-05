import logoJuripass from "../assets/img/logo-juripass.png";
import successIcon from "../assets/icons/successicon.png";

export const PaymentSuccess = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[80dvh] px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="max-w-md text-center space-y-4 flex flex-col gap-4">
          <div className="flex justify-center mb-8">
            <img
              src={logoJuripass}
              className="h-16 self-center"
              alt="Juripass logo"
            />
          </div>
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
          <p className="text-gray-500 dark:text-gray-400 md:text-lg">
            Assim que tivermos a confirmação do pagamento, você receberá um
            e-mail de confirmação com todas as instruções de acesso.
          </p>
        </div>
      </div>
    </>
  );
};