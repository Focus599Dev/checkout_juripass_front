import { RoleToggle } from "../Components/Toggle";
import { useState } from "react";
import { JuripassCardID } from "../Components/JuripassCardID";
import { toast, ToastContainer } from "react-toastify";
import RegisterService from "../Services/RegisterService";
import {
  FormDataDependent,
  FormDependent,
} from "../Components/Forms/BeneficiaryRegistration/FormDependent";
import {
  FormBeneficiary,
  FormDataBeneficiary,
} from "../Components/Forms/BeneficiaryRegistration/FormBeneficiary";

const registerService = new RegisterService();

export const BeneficiaryRegistration = () => {
  const [selectedRole, setSelectedRole] = useState("beneficiario");
  const [previewName, setPreviewName] = useState(registerService.name);
  const [previewCompany, setPreviewCompany] = useState(
    registerService.organization
  );

  const handleBeneficiarySubmit = (data: FormDataBeneficiary) => {
    registerService.name = data.name;
    registerService.email = data.email;
    registerService.cpf = data.cpf;
    registerService.telefone = data.telefone;
    registerService.organization = data.organization;

    registerService.saveLocalStorage();

    toast.success("Beneficiário cadastrado com sucesso!");
  };

  const handleDependentSubmit = (data: FormDataDependent) => {
    registerService.addDependent(
      data.name,
      data.email,
      data.cpf,
      data.telefone,
      data.grauParentesco
    );

    registerService.saveLocalStorage();

    toast.success("Dependente adicionado com sucesso!");
  };

  return (
    <>
      <div className="pt-4">
        <div className="w-full px-6 mt-16">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl font-semibold text-juripass mb-2">
              Queremos conhecer você!
            </h2>
            <p className="text-gray-500 text-center mb-2">
              Preencha seus dados nos campos abaixo e complete seu cadastro no
              Programa Juripass.
            </p>
          </div>
        </div>

        <div className="mt-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
          <div className="text-[#4b5563] bg-white flex flex-col gap-4">
            {selectedRole === "beneficiario" ? (
              <FormBeneficiary
                onSubmit={handleBeneficiarySubmit}
                onChangeName={setPreviewName}
                onChangeCompany={setPreviewCompany}
                defaultValues={{
                  name: registerService.name,
                  cpf: registerService.cpf,
                  email: registerService.email,
                  telefone: registerService.telefone,
                  organization: registerService.organization,
                }}
              />
            ) : (
              <FormDependent
                onSubmit={handleDependentSubmit}
                onChangeName={setPreviewName}
                onChangeCompany={setPreviewCompany}
              />
            )}
            {selectedRole === "beneficiario" && (
              <div className="flex gap-4">
                <button
                  type="button"
                  className="w-full mt-2 border border-[#3F87CF] text-[#3F87CF] font-semibold py-2 px-6 rounded-lg hover:bg-[#3F87CF] hover:text-white transition duration-500 ease-in-out"
                  onClick={() => null}
                >
                  + Adicionar dependentes
                </button>
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-2xl text-[#4b5563] flex flex-col items-center gap-8">
            <RoleToggle
              selected={selectedRole}
              setSelected={setSelectedRole}
              options={{
                beneficiario: "Sou beneficiário",
                dependente: "Sou dependente",
              }}
            />
            <JuripassCardID
              cardInfo={{ company: previewCompany, name: previewName }}
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
