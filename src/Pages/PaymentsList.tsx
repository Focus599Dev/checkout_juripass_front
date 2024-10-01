
import { useCallback, useState, useEffect } from 'react';

interface PaymentItem {
    name: string;
}

interface Payment extends Array<PaymentItem> {}

export const PaymentsList = () => {

    const [reload, setReload] = useState(true);

    var payments: Payment = [];

    const LIMIT = 2;

    const [data, setData] = useState(Array<PaymentItem>());
    
    const loadPayment = (params:any) => {
        
        console.log('Entra');

        payments = [{
            name: 'Teste 1',
        }];

        setData(
           payments
        );
        // fetch(process.env.REACT_APP_BACK_URL + "/payments")
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log(data);
        // });

    };

    useEffect(() => {

        loadPayment({
          offset: 0,
          limit: LIMIT,
        });

    }, [reload,payments]);

    return <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b \ \">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">
                            Silver
                        </td>
                        <td className="px-6 py-4">
                            Laptop
                        </td>
                        <td className="px-6 py-4">
                            $2999
                        </td>
                    </tr>
                    <tr className="bg-white border-b \ \">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Microsoft Surface Pro
                        </th>
                        <td className="px-6 py-4">
                            White
                        </td>
                        <td className="px-6 py-4">
                            Laptop PC
                        </td>
                        <td className="px-6 py-4">
                            $1999
                        </td>
                    </tr>
                    <tr className="bg-white \">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Magic Mouse 2
                        </th>
                        <td className="px-6 py-4">
                            Black
                        </td>
                        <td className="px-6 py-4">
                            Accessories
                        </td>
                        <td className="px-6 py-4">
                            $99
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}

