import { useContext, useState } from 'react';
import { contextPlanData } from '../App';
import PlansService from '../Services/PlansService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageLoader  from '../Components/PageLoader';
import juripassDark from '../assets/img/juripass-dark.png';
import howWorks from '../assets/img/icone-how-works.png';
import { PlanCardPlans } from '../Components/PlanCardPlans';

export const Plans = () => {

    const contextPlan = useContext(contextPlanData);

    const planService = new PlansService();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const planList = planService.getPlanList();

    const [searchParams] = useSearchParams();

    if (searchParams.has("coupon")) {
        planService.setCoupon(searchParams.get("coupon"));
    }


    const onClickSign = (plan:any) => {

        setLoading(true);

        contextPlan.planValue = plan.planValue;
        
        contextPlan.planId = plan.planId;
        
        contextPlan.planName = plan.planName;

        contextPlan.planValueFormated = plan.planValueFormated;

        contextPlan.planDesc = plan.planDesc;

        contextPlan.benefits = plan.benefits;

        planService.mapperContextToClass(contextPlan);

        if (planService.hasCupon()) {

            planService.calculateDiscount(plan.planValue);
        }

        planService.saveLocalStorage();


        
        setTimeout(() => {
            
            setLoading(false);
    
            navigate("/planos/detalhes/" + planService.getUUIDLocalStorage());

        }, 500 );

    }

    const PlansCard = planList.map( (plan, key) => {
        if (planService.hasCupon()) {
            
            planService.getCouponDiscount(plan.planValue);

            return <PlanCardPlans key={key} plan={plan} onClickSign={onClickSign} hasCoupon={true} textCoupon={planService.planValueFormatedCoupon} />
            
        } else {
            
            return <PlanCardPlans key={key} plan={plan} onClickSign={onClickSign} />
            
        }
            
    });

    return (
        <>
           <PageLoader 
                isShow={loading}
            />

            <div className="grid grid-cols-2 xs:grid-cols-1 mt-4">
                <div>
                    <div className="flex">
                        <div className='bg-[#eeebe4] rounded-r-[1.5rem] justify-start w-1/4 items-center flex ps-4'>
                            <img src={juripassDark} alt="Juripass" width={100}/>
                        </div>

                        <div className='w-3/4 ps-4'>
                            <p className='text-7xl text-[#558cc8] font-bold'>
                                Seu novo
                            </p>
                            <p className='text-7xl text-[#26315b] font-semibold'>
                                Benefício
                            </p>
                            <p className='text-7xl text-[#26315b] font-semibold'>
                                jurídico
                            </p>
                        </div>
                    </div>
                </div>

                <div className='text-white bg-[#5287c3] rounded-[1rem] p-4  flex justify-center items-center leading-9 text-2xl relative'>
                    <div
                        className="left-[0px] transform -translate-x-7 absolute top-[4rem] rotate-45 w-20 h-20 bg-[#5287c3] border-none rounded-[1rem] z-0"
                    ></div>
                    <div className='z-10'>
                        <p>
                            A <b>Juripass</b> oferece acolhimento e amparo legal para esclarecer dúvidas e demandas jurídicas, proporcionando tranquilidade e segurança jurídica no seu dia a dia.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 mt-8 relative">

                <div className="relative z-10">
                    <div className="px-8 py-6 bg-[#27335e] bg-[#27335e] rounded-[1.5rem] text-white">

                        <p className='text-5xl text-[#558cc8] font-semibold'>
                            Como
                        </p>
                        <p className='text-5xl text-white font-semibold'>
                            funciona?
                        </p>

                        <p className='mt-8'>
                            Inicie uma consulta a qualquer momento, diretamente da palma da sua mão utilizando o <b className='text-[#629c3b]'>WhatsApp.</b>
                        </p>

                        <p className='mt-14'>
                            Assim que a consulta é iniciada, um especialista qualificado oferecerá orientações personalizadas para sua situação.
                        </p>

                        <p className='mt-14 mb-20'>
                            Se precisar de ação jurídica, o especialista o conectará a um advogado, com quem você negociará honorários, conforme a tabela da OAB que apenas serão cobradas em caso de exito no processo.
                        </p>
                    </div>
                    
                    <div className="absolute top-[12rem] right-0 h-3/6 transform translate-x-[4rem]">
                        <img src={howWorks} alt="Como funciona." className='w-100 h-full'/>
                    </div>
                </div>

                <div className='text-black px-8 py-6 text-xl z-10'>
                    <p>
                        <b> Atendimento ágil e descomplicado</b> para representar e garantir seus direitos em acordos, demandas judiciais ou extrajudiciais. <b> Cobertura para você e seus familiares,</b> com acesso ilimitado a advogados.
                    </p>

                    <p className='text-6xl text-[#26315b] mt-20 text-left pl-20'>
                        <span className='text-[#558cc8] font-semibold'>Segurança jurídica</span> na palma da sua mão.
                    </p>
                </div>

                <div className="absolute bg-[#eeebe4] rounded-l-[1.5rem] -bottom-7 left-7 w-full h-3/4 z-0">
                    {/* Caixa cinza */}
                </div>
            </div>

            <div className="grid grid-cols-3 mt-8">
                <div className='col-span-2'>
                    <p className='text-7xl text-[#558cc8] font-bold'>
                        Vantagens
                    </p>
                    <p className='text-7xl text-[#26315b] font-semibold'>
                        para você!
                    </p>

                    <div className='text-black text-xl mt-10'>
                        <ul className='marker:text-[#558cc8] list-disc list-inside leading-10'>
                            <li>
                                Confidencialidade e atendimento humanizado
                            </li>
                            <li>
                                Agilidade e atendimento sem burocracia
                            </li>
                            <li>
                                Contato direto com advogados especialistas
                            </li>
                            <li>
                                Suporte a diferentes especialistas
                            </li>
                            <li>
                                Custo acessível e apenas em ganhos de causa
                            </li>
                            <li>
                                Acesso descomplicado via WhatsApp
                            </li>
                        </ul>
                    </div>
                </div>
                <div>

                    <div className="bg-[#659bc9] rounded-[1.5rem] p-8 mt-20 relative">
                        <div className="absolute right-0 -top-10">
                            <img src={juripassDark} alt="Juripass" width={100}/>
                        </div>
                        <p className='text-5xl text-white font-bold'>
                            Sua
                        </p>
                        <p className='text-5xl text-[#26315b] font-semibold'>
                            cobertura
                        </p>

                        <div className="text-white mt-8">
                            <ul className='leading-10'>
                                <li>Direito do consumidor</li>
                                <li>Propriedade e moradia</li>
                                <li>Divórcio e pensão</li>
                                <li>Herança e sucessão</li>
                                <li>Responsabilidade civil</li>
                                <li>Contratos e trabalhistas</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                {PlansCard}
            </div>
        </>
    );


}