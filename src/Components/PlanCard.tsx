import PlanCardItemBenefit from "./PlanCardItemBenefit";

export function PlanCard({plan,onClickSign, hasCoupon, textCoupon}: any) {

    return (<div className="mt-6" key={plan.planId}>

                    <div className='border-2 bg-white border-[#e5e7eb] border-solid p-8 rounded-3xl text-[#4b5563]'>

                        <h3 className='text-left font-semibold text-lg mb-6'>
                            { plan.planName }
                        </h3>

                        <p className='leading-6 text-sm mb-6'>
                            { plan.planDesc }
                        </p>

                        { hasCoupon ?
                            <>
                                <div className="font-boldtext-base mt-4 line-through">
                                    {plan.planValueFormated}
                                </div>
                                <div className="font-bold text-2xl mt-4 mb-4">
                                    {textCoupon}
                                </div>
                            </>
                            :
                            <div className="font-bold text-2xl mt-4 mb-4">
                                {plan.planValueFormated}
                            </div>
                        }

                        { onClickSign && <button className='bg-juripass text-white rounded-md p-2 w-full mb-10' onClick={() => onClickSign(plan)}>
                            Assinar
                        </button> }

                        <PlanCardItemBenefit benefits={plan.benefits} />
                    </div>
                    
                </div>
    );
}