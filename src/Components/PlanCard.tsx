import PlanCardItemBenefit from "./PlanCardItemBenefit";

export function PlanCard({ plan, onClickSign, hasCoupon, textCoupon }: any) {
  return (
    <div className="mt-6" key={plan.planId}>
      <div className="bg-white border border-[#CBCED6] border-solid p-8 rounded-2xl text-[#4b5563] relative overflow-hidden">
        {hasCoupon && (
          <div className="absolute bg-[#C52222] px-4 py-2 top-0 right-0 rounded-bl-xl">
            <p className="text-white font-semibold text-lg">10% off</p>
          </div>
        )}

        <h3 className="text-left font-semibold text-lg mb-6 text-juripass">
          {plan.planName}
        </h3>

        <p className="leading-6 text-sm mb-6">{plan.planDesc}</p>

        {hasCoupon ? (
          <>
            <div className="text-base mt-4 line-through text-[#C52222]">
              {plan.planValueFormated}
            </div>
            <div className="font-semibold mt-4 mb-4">{textCoupon}</div>
          </>
        ) : (
          <div className="font-semibold mt-4 mb-4">
            {plan.planValueFormated}
          </div>
        )}

        {onClickSign && (
          <button
            className="bg-juripass text-white rounded-md p-2 w-full mb-10"
            onClick={() => onClickSign(plan)}
          >
            Assinar
          </button>
        )}

        <PlanCardItemBenefit benefits={plan.benefits} />
      </div>
    </div>
  );
}
