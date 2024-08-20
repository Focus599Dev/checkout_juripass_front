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

    return (
        <div className="App ">
            <Header />
            <contextPlanData.Provider value={PlanData}>
                <section className="max-w-7xl mx-auto py-2 px-4 tablet:px-4">

                    <Routes />

                </section>
            </contextPlanData.Provider>
        </div>
    );
}

export default App;
