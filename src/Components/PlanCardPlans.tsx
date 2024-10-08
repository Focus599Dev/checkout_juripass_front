import { v4 as uuidv4 } from "uuid";

export function PlanCardPlans({
  plan,
  onClickSign,
  hasCoupon,
  textCoupon,
  discount,
}: any) {
  return (
    <div
      className="p-6 bg-white rounded-2xl border-[#CBCED6] border ml-auto mr-auto mt-6 md:mt-0 relative overflow-hidden"
      key={plan.planId}
    >
      {hasCoupon && discount && (
        <div className="absolute bg-[#C52222] px-4 py-2 top-0 right-0 rounded-bl-xl">
          <p className="text-white font-semibold text-lg">{discount.toFixed(0)}% off</p>
        </div>
      )}
      <div className="text-4xl font-bold text-[#3F87CF] mt-8">
        {plan.planName}
      </div>

      {hasCoupon ? (
        <>
          <div className="text-base mt-4 text-[#C52222] line-through">
            {plan.planValueFormated}
          </div>
          <div className="text-2xl font-bold text-[#27335E] mt-4">
            {textCoupon}
          </div>
        </>
      ) : (
        <div className="text-2xl font-bold text-[#27335E] mt-4">
          {plan.planValueFormated}
        </div>
      )}

      <div className="mt-4">
        <ul className="leading-9">
          {plan.benefits.map((benefit: any) => (
            <li key={uuidv4()}>✓ {benefit}</li>
          ))}
        </ul>
      </div>

      {onClickSign && (
        <button
          className="w-full mt-6 bg-[#3F87CF] text-white font-semibold text-lg shadow-lg py-2 px-6 rounded-xl hover:bg-[#27335E] transition duration-500 ease-in-out"
          onClick={() => onClickSign(plan)}
        >
          Assinar
        </button>
      )}
    </div>
  );
}
