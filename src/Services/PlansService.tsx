import { v4 as uuidv4 } from 'uuid';

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

    public constructor(){

        this.uuidLocalStorage = uuidv4();

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

    public getDependentes = () => {
        return this.dependentes;
    }

    public removeDependent = (index: number) => {
     
        this.dependentes.splice(index, 1);

    }

    public setUUIDLocalStorage = (uuid: any) => this.uuidLocalStorage = uuid;
    
    public getUUIDLocalStorage = () => {return this.uuidLocalStorage };

    public mapperContextToClass = (data: any) => {

        for(const [key, value] of Object.entries(data)){
    
            let param = `this.${key}`;

            if (this.hasOwnProperty(key)) {

                eval(`${param} = value;`);

            }

        }

    }

    public recoverLocalStorage = () => {

        const data = localStorage.getItem(this.getUUIDLocalStorage());

        if(data){
            this.mapperContextToClass(JSON.parse(data));
        }
    }

    public saveLocalStorage = () => {

        localStorage.setItem(this.getUUIDLocalStorage(), JSON.stringify(this)); 

    }
}