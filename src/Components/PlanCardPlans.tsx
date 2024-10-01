import { v4 as uuidv4 } from 'uuid';

export function PlanCardPlans({plan,onClickSign, hasCoupon, textCoupon}: any) {

    return <div className='p-8 bg-[#eeebe4] rounded-[1.5rem]' key={plan.planId}>
        <div className='text-4xl text-[#26315b] font-semibold'>
            {plan.planName}
        </div>

        <div className='mt-8'>
            <ul className='leading-9' >
                {plan.benefits.map( (benefit:any) => <li key={uuidv4()}>{benefit}</li>)}
            </ul>
        </div>

        { hasCoupon ?
            <>
                <div className="font-boldtext-base mt-4 line-through">
                    {plan.planValueFormated}
                </div>
                <div className="font-bold text-2xl mt-4">
                    {textCoupon}
                </div>
            </>
            :
            <div className="font-bold text-2xl mt-4">
                {plan.planValueFormated}
            </div>
        }
       

        { onClickSign && <button className='bg-juripass text-white rounded-md p-2 w-full mt-4' onClick={() => onClickSign(plan)}>
            Assinar
        </button> }
    </div>
    ;
}