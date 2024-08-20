import planList from '../plans.json';
import { PlanCard } from '../Components/PlanCard';
import { useContext, useState } from 'react';
import { contextPlanData } from '../App';
import PlansService from '../Services/PlansService';
import { useNavigate } from 'react-router-dom';
import PageLoader  from '../Components/PageLoader';

export const Plans = () => {

    const contextPlan = useContext(contextPlanData);

    const planService = new PlansService();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const onClickSign = (plan:any) => {

        setLoading(true);

        contextPlan.planValue = plan.planValue;
        
        contextPlan.planId = plan.planId;
        
        contextPlan.planName = plan.planName;

        contextPlan.planValueFormated = plan.planValueFormated;

        contextPlan.planDesc = plan.planDesc;

        contextPlan.benefits = plan.benefits;

        planService.mapperContextToClass(contextPlan);

        planService.saveLocalStorage();
        
        setTimeout(() => {
            
            setLoading(false);
    
            navigate("/planos/detalhes/" + planService.getUUIDLocalStorage());

        }, 500 );

    }

    const PlansCard = planList.map( plan => {

        return  <PlanCard 
                    plan={plan}
                    key={plan.planId}
                    onClickSign={onClickSign}
                />
            
    });

    let grid_cols_class = 'grid gap-3';
    
    // Safelisting classes :(
    switch(planList.length){
        case 1: grid_cols_class += ' md:grid-cols-1'; break;
        case 2: grid_cols_class += ' md:grid-cols-2'; break;
        case 3: grid_cols_class += ' md:grid-cols-3'; break;
        case 4: grid_cols_class += ' md:grid-cols-4'; break;
        case 5: grid_cols_class += ' md:grid-cols-5'; break;
        case 6: grid_cols_class += ' md:grid-cols-6'; break;
    }
    
    return (
        <>
           <PageLoader 
                isShow={loading}
            />

            <div className={grid_cols_class}>  
                {PlansCard}
            </div>
        </>
    );


}