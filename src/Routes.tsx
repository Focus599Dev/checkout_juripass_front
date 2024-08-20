
import { BrowserRouter , Route , Routes as Switch, Navigate } from 'react-router-dom';
import { Plans } from './Pages/Plans';
import { PlansDetails } from './Pages/PlansDetails';
import { PlansCheckout } from './Pages/PlansCheckout';
import { NotFound } from './Pages/NotFound';

export const Routes = () => {
    return <>
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Navigate replace to="/planos" />} />
                <Route path="/planos" element={<Plans />}/>
                <Route path="/planos/detalhes/:token" element={<PlansDetails />}/>
                <Route path="/planos/checkout/:token" element={<PlansCheckout />}/>
                <Route path="*" element={<NotFound />} />
            </Switch>   
        </BrowserRouter>
    </>;
}