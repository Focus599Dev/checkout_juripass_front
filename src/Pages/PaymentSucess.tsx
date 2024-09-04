export const PaymentSucess = () => {
    return (
        <>

            <div className="flex flex-col items-center justify-center min-h-[80dvh] px-4 md:px-6 py-12 md:py-24 lg:py-32">
                <div className="max-w-md text-center space-y-4">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 inline-flex">
                        <CheckIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Pagamento realizado com sucesso
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                        Assim que tivermos a confirmação do pagamento, você receberá um e-mail de confirmação com todas as instruções de acesso.
                    </p>
                </div>
            </div>
        </>
    );
}

function CheckIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    )
}