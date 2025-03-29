import { useNavigate, useOutletContext } from "react-router-dom";
import { ProfileNoLogin } from "./ProfileNoLogin";

/* eslint-disable react/react-in-jsx-scope */
type ContextType = {
  idCheck: boolean;
  linkCheck: number;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ProfileLogOf = () => {
  const navigate = useNavigate();
  const { idCheck, linkCheck } = useOutletContext<ContextType>();

  return idCheck && linkCheck === 4
  ? (
    <div className="">
      <h2 className="text-gray-100 text-[20px] font-bold mb-4">
        Вийти дійсно хочете вийти з кабінету?
      </h2>
      <div className="flex gap-4">
        <button 
            className="w-full rounded-[120px] h-14 text-gray-20 text-[16px] font-medium bg-primary cursor-pointer">
              Так
          </button>
          <button
            onClick={() => navigate('../../shop')}
            className='w-full rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-20 bg-primary cursor-pointer'>
            Ні, до магазину
          </button>
      </div>
    </div>
  )
  : (<ProfileNoLogin />);
}