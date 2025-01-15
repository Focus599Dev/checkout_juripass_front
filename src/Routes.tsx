
import { BrowserRouter , Route , Routes as Switch, Navigate } from 'react-router-dom';
import { Plans } from './Pages/Plans';
import { PlansDetails } from './Pages/PlansDetails';
import { PlansCheckout } from './Pages/PlansCheckout';
import { NotFound } from './Pages/NotFound';
import { PaymentSuccess } from './Pages/PaymentSuccess';
import { PaymentsList } from './Pages/PaymentsList';
import { Tutorial } from './Pages/Tutorial';

export const Routes = () => {
    return <>
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<Navigate replace to="/planos" />} />
                <Route path="/planos" element={<Plans />}/>
                <Route path="/planos/detalhes/:token" element={<PlansDetails />}/>
                <Route path="/planos/checkout/payment_sucess" element={<PaymentSuccess />}/>
                <Route path="/planos/checkout/:token" element={<PlansCheckout />}/>
                <Route path="/planos/checkout/:token" element={<PlansCheckout />}/>
                <Route path="/tutorial" element={<Tutorial />}/>
                <Route path="/payments/juripass/1486fa01-8794-4bf0-a68a-cb47bab66032" element={<PaymentsList />}/>
                <Route path="*" element={<NotFound />} />
            </Switch>   
        </BrowserRouter>
    </>;
}