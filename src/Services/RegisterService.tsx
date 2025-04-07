export default class RegisterService {
  public name: string = "";
  public email: string = "";
  public cpf: string = "";
  public telefone: string = "";
  public organization: string = "";

  public dependentes: Array<{
    name: string;
    email: string;
    cpf: string;
    telefone: string;
    grau_parentesco: string;
  }> = [];

  private uuidKey: string = "juripass-register";

  constructor() {
    this.recoverLocalStorage();
  }

  public addDependent = (
    name: string,
    email: string,
    cpf: string,
    telefone: string,
    grau_parentesco: string
  ) => {
    this.dependentes.push({ name, email, cpf, telefone, grau_parentesco });
  };

  public editDependent = (
    index: number,
    name: string,
    email: string,
    cpf: string,
    telefone: string,
    grau_parentesco: string
  ) => {
    if (!this.dependentes[index]) return;
    this.dependentes[index] = { name, email, cpf, telefone, grau_parentesco };
  };

  public removeDependent = (index: number) => {
    this.dependentes.splice(index, 1);
  };

  public saveLocalStorage = () => {
    localStorage.setItem(this.uuidKey, JSON.stringify(this));
  };

  public recoverLocalStorage = () => {
    const data = localStorage.getItem(this.uuidKey);
    if (data) {
      const parsed = JSON.parse(data);
      this.mapperContextToClass(parsed);
    }
  };

  public deleteLocalStorage = () => {
    localStorage.removeItem(this.uuidKey);
  };

  private mapperContextToClass = (data: any) => {
    for (const [key, value] of Object.entries(data)) {
      if (this.hasOwnProperty(key)) {
        (this as any)[key] = value;
      }
    }
  };
}
