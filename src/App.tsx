import  { createContext } from 'react';
import { Header } from './Components/Header';
import { Routes } from './Routes';
import './App.css';

type PlanDataType = {
    planValue: number;
    planId: string;
    planName: string;
    name: string;
    email: string;
    cpf: string;
    telefone: string;
    planValueFormated: string;
    planDesc: string;
    benefits: Array<string>;
    dependentes: Array<{ name: string; email: string; cpf: string, telefone: string }>[]
}

var PlanData: PlanDataType = {
    planValue: 0,
    planId: '',
    planName: '',
    planDesc: '',
    name: '',
    email: '',
    cpf: '',
    telefone: '',
    planValueFormated: '',
    dependentes: [],
    benefits: []
}

export const contextPlanData = createContext(PlanData);

function App() {

    const pathName = window.location.pathname

    let ClassNameContainer = "max-w-7xl mx-auto py-2 px-4 tablet:px-4";

    if (pathName === '/payments/juripass/1486fa01-8794-4bf0-a68a-cb47bab66032') {

        ClassNameContainer = "w-full mx-auto py-2 px-4 tablet:px-4";

    }

    return (
        <div className="App ">
            <Header />
            <contextPlanData.Provider value={PlanData}>
                <section className={ClassNameContainer}>

                    <Routes />

                </section>
            </contextPlanData.Provider>
        </div>
    );
}

export default App;
