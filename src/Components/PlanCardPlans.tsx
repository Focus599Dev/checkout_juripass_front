import { v4 as uuidv4 } from "uuid";

export function PlanCardPlans({
  plan,
  onClickSign,
  hasCoupon,
  textCoupon,
}: any) {
  return (
    <div
      className="p-6 bg-white rounded-2xl border-[#CBCED6] border w-full md:ml-0 mx-auto mt-6 md:mt-0"
      key={plan.planId}
    >
      <div className="text-4xl font-bold text-[#3F87CF]">{plan.planName}</div>

      <div className="mt-8">
        <ul className="leading-9">
          {plan.benefits.map((benefit: any) => (
            <li key={uuidv4()}>✓ {benefit}</li>
          ))}
        </ul>
      </div>

      {hasCoupon ? (
        <>
          <div className="font-bold text-base mt-4 text-[#27335E] line-through">
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
