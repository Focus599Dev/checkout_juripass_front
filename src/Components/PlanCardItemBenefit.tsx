export default function PlanCardItemBenefit({benefits }: any) {

    const benefitsItens = benefits.map( (benefit:string, index: number) => {
        
        return <li className="text-sm gap-x-3 flex mb-4" key={index}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="24" viewBox="0,0,256,256">
                    <g fill="#253261"><g transform="scale(10.66667,10.66667)"><path d="M20.29297,5.29297l-11.29297,11.29297l-4.29297,-4.29297l-1.41406,1.41406l5.70703,5.70703l12.70703,-12.70703z"></path></g></g>
                </svg>
                {benefit} 
            </li>

    });

    if (benefits.length){

        return <ul className="list-none list-inside"> { benefitsItens } </ul>
    }
    
    return null;
}