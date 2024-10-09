import planList from '../plans.json';
import Coupons from '../coupons.json';

export default class PlansService {

    public planValue: any = 0;

    public planId: any = '';

    public planName: any = '';

    public planValueFormated: any = '';

    public name: any = '';

    public email: any = '';

    public cpf: any = '';

    public telefone: any = '';

    public planDesc: any = '';

    public benefits: any = [];

    public dependentes:  Array<{ name: any; email: any; cpf: any, telefone: any, grau_parentesco: any }> = [];

    private uuidLocalStorage: any = '';

    private planList = planList;

    private isAdditional = false;

    private coupon:string = '';

    private couponType:string = '';

    public couponDiscount:number = 0;

    public planValueFormatedCoupon: any = '';


    public constructor(){

        this.uuidLocalStorage = this.planId;

    }

    public addDependent = (name:any, email:any, cpf:any, telefone:any, grau_parentesco:any) => {
        
        this.dependentes.push({
            name: name,
            email: email,
            cpf: cpf,
            telefone: telefone,
            grau_parentesco: grau_parentesco
        });
        
    }

    public editDependent = (index: number, name: any, email: any, cpf: any, telefone: any, grau_parentesco: any) => {

        if ( this.dependentes[index] === undefined ) {

            return false;
        }

        this.dependentes[index] = {
            name: name,
            email: email,
            cpf: cpf,
            telefone: telefone,
            grau_parentesco: grau_parentesco
        };
        
    }

    public getDependentes = () => {
        return this.dependentes;
    }

    public removeDependent = (index: number) => {
     
        this.dependentes.splice(index, 1);

    }

    public setUUIDLocalStorage = (uuid: any) => this.uuidLocalStorage =  uuid;
    
    public getUUIDLocalStorage = () => {return this.uuidLocalStorage };

    public mapperContextToClass = (data: any) => {

        for(const [key, value] of Object.entries(data)){
    
            let param = `this.${key}`;

            if (this.hasOwnProperty(key)) {

                eval(`${param} = value;`);

            }

        }

        if (this.hasCupon()) {

            this.calculateDiscount(this.planValue);

        }
    }

    public recoverLocalStorage = () => {
        
        let extradata = localStorage.getItem(this.getUUIDLocalStorage());

        let data = planList.find((plan: any) => { 
            return plan.planId === this.getUUIDLocalStorage() ? plan : null
        });

        if(extradata){
            this.mapperContextToClass(JSON.parse(extradata));
        }

        if(data){
            this.mapperContextToClass(JSON.parse(JSON.stringify(data)));
        }

    }

    public saveLocalStorage = () => {

        if (!this.getUUIDLocalStorage()) 
            this.setUUIDLocalStorage(this.planId);

        localStorage.setItem(this.getUUIDLocalStorage(), JSON.stringify(this)); 

    }

    public deleteLocalStorage = () => {

        localStorage.removeItem(this.getUUIDLocalStorage());

    }

    public getPlanList = () => {
        console.log('coupon', this.coupon, 'teste')
        if (this.coupon === 'CORE50') {
            return this.planList.filter((plan) => plan.planName === 'Plano família' )
        } else {
            return this.planList
        }
    };

    public getIsAdditional = () => this.isAdditional;

    public setCoupon = (coupon_code: string|null) => {
        if (!coupon_code)
            return false;

        let coupon = Coupons.find((coupon: any) => { 
            return coupon.code === coupon_code ? coupon : null
        });

        if (coupon) {

            this.coupon = coupon.code;
            
            this.couponType = coupon.type;

            this.couponDiscount = coupon.discount;
            
        }
    }

    public calculateDiscount = (planValue: number) => {

        if(this.hasCupon()){

            let discount = 0;

            if (this.planValue){

                planValue = this.planValue;
            }

            switch (this.couponType) {
                case 'percent':
                    discount = planValue - (planValue * this.couponDiscount / 100);
                    break;
                case 'value':
                    discount =  planValue - this.couponDiscount;
                    break;
                default:
                    break;
            }

            try {
                let roundedDiscount = Math.floor(discount)
       
                let discountFormated = this.formatBRL(roundedDiscount);

                let discountFormatedDiv = this.formatBRL((discount / 12));
    
                this.planValueFormatedCoupon = `${ discountFormated } à vista ou em até 10 vezes`;

            } catch(error) {
                
            }

            return discount;

        } 

        return this.planValue; 

    }

    private formatBRL = function(value:number) {
       
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }

    public getCouponDiscount = (planValue: number) => {
        
        return this.calculateDiscount(planValue);

    }

    public hasCupon = () => {

        if (!this.coupon)
            return false;   

        return true;
    }

    public getCouponCode = () => {
        return this.coupon;
    }

}