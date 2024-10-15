
import { useCallback, useState, useEffect } from 'react';
import PageLoader from "../Components/PageLoader";
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

export const PaymentsList = () => {

    const [reload, setReload] = useState(true);

    var payments: any = [];

    const [loading, setLoading] = useState(false);
    
    const [paymentsFiltered, setPaymentsFiltered] = useState<any>([]);
    
    var JSONPrettyMon = require('react-json-pretty/dist/monikai');

    const loadPayment = (params:any) => {

        setLoading(true);

        fetch(process.env.REACT_APP_BACK_URL + "/list-payments")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                
                setLoading(false);

                if (parseInt(data.status) === 200){
                    payments = data.data;
                }

                filterPayment([]);

            }).catch((error) => {
                
                setLoading(false);
                
                console.log(error);
            }
        );
    };

    const filterPayment = (params:any) => {

        setPaymentsFiltered(payments.filter((payment:any) => {
                let isFiltered = true;

                if (isFiltered)
                    return true;
                
                return false;
            })
        );

        return paymentsFiltered;
    }

    useEffect(() => {

        loadPayment({
          offset: 0,
          limit: 100,
        });

    }, []);

    return <>

        <PageLoader isShow={loading} />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Plano
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Valor
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Data
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Dados do plano
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {paymentsFiltered.map((payment:any) => {
                        return (
                            <tr className="bg-white border-b " key={payment.id}>
                                <td className="px-6 py-4">{payment.request.servicePlan.planName}</td>
                                <td className="px-6 py-4">{payment.amount}</td>
                                <td className="px-6 py-4">{payment.status}</td>
                                <td className="px-6 py-4">{payment.created_at}</td>
                                <td className="px-6 py-4">
                                    <div className="w-full h-[20rem] overflow-auto">
                                        <JSONPretty theme={JSONPrettyMon} id="json-pretty" data={payment.request.servicePlan} />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}                   
                </tbody>
            </table>
        </div>
    </>
}

