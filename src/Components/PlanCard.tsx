import PlanCardItemBenefit from "./PlanCardItemBenefit";

export function PlanCard({plan,onClickSign}: any) {

    return (<div className="mt-6" key={plan.planId}>

                    <div className='border-2 bg-white border-[#e5e7eb] border-solid p-8 rounded-3xl text-[#4b5563]'>

                        <h3 className='text-left font-semibold text-lg mb-6'>
                            { plan.planName }
                        </h3>

                        <p className='leading-6 text-sm mb-6'>
                            { plan.planDesc }
                        </p>

                        <p className="mb-6">

                            <span className='text-[#111827] leading-6 text-4xl '>
                                R$ { plan.planValueFormated }
                            </span>

                        </p>

                        { onClickSign && <button className='bg-juripass text-white rounded-md p-2 w-full mb-10' onClick={() => onClickSign(plan)}>
                            Assinar
                        </button> }

                        <PlanCardItemBenefit benefits={plan.benefits} />
                    </div>
                    
                </div>
    );
}