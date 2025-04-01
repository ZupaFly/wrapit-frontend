import { useOutletContext } from "react-router-dom";
import { ProfileNoLogin } from "./ProfileNoLogin";

/* eslint-disable react/react-in-jsx-scope */
type ContextType = {
  idCheck: boolean;
  linkCheck: number;
  hasChanges: boolean;
  formData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    city: string;
  };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PersonalInformation = () => {
  const { formData, hasChanges, idCheck, linkCheck, handleFormChange } = useOutletContext<ContextType>();
  return idCheck && linkCheck === 1
  ?  
    <>
      <form className="flex flex-col w-[500px] max-[1024px]:mt-10 max-[1024px]:w-full">
      <div className="mb-6">
        <h5 className="text-gray-90 text-[16px] font-normal mb-1">Ім&apos;я</h5>
          <input
            type="text"
            name="firstName"
            required
            placeholder="Ім&apos;я"
            value={formData.firstName}
            onChange={handleFormChange}
            className="px-4 border border-gray-20 rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal"
          />
      </div>

      <div className="mb-6">
        <h5 className="text-gray-90 text-[16px] font-normal mb-1">Прізвище</h5>
          <input
            type="text"
            name="lastName"
            required
            placeholder="Прізвище"
            value={formData.lastName}
            // onChange={handleFormChange}
            className="px-4 border border-gray-20 rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal"
          />
      </div>

      <div className="mb-6">
        <h5 className="text-gray-90 text-[16px] font-normal mb-1">Номер телефону</h5>
          <input
            type="text"
            name="phoneNumber"
            required
            placeholder="Номер телефону"
            value={formData.phoneNumber}
            // onChange={handleFormChange}
            className="px-4 border border-gray-20 rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal"
          />
      </div>

      <div className="mb-10">
        <h5 className="text-gray-90 text-[16px] font-normal mb-1">Населений пункт</h5>
          <input
            type="text"
            name="lastName"
            required
            placeholder="Населений пункт"
            // value={formData.lastName}
            // onChange={handleFormChange}
            className="px-4 border border-gray-20 rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal"
          />
      </div>

      <button
        className={`w-full rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-20 
          ${
          hasChanges ? 'bg-primary cursor-pointer' : 'bg-gray-60 cursor-not-allowed'
        }
        `}
        >
      Зберегти зміни
      </button>
    </form>
</>
: (<ProfileNoLogin />)
}