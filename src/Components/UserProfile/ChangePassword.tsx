/* eslint-disable react/react-in-jsx-scope */
import { useOutletContext } from "react-router-dom";
import { ProfileNoLogin } from "./ProfileNoLogin";
import hidePass from '../../image/icons/hidePassword.png';
import showPass from '../../image/icons/showPassword.png';
import { useState } from "react";

type ContextType = {
  formData: {
    id: number,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    password: string,
    repeatPassword: string,
  }
  idCheck: boolean;
  linkCheck: number;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ChangePassword: React.FC = () => {
  const { idCheck, linkCheck } = useOutletContext<ContextType>();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRetry, setShowPasswordRetry] = useState(false);
  const error = true;
  

  const toogleSeePassword = () => {
    setShowPassword(!showPassword);
  };

  const toogleSeePasswordRetry = () => {
    setShowPasswordRetry(!showPasswordRetry);
  };

  // const checkFields = [formData.password, formData.repeatPassword].every(value => value.trim() !== '');

  return idCheck && linkCheck === 2
  ? 
  <>
    <form className="flex flex-col">
      <div className="mb-6">
        <h5 className="text-gray-90 text-[16px] font-normal mb-1">Поточний пароль</h5>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            // value={formData.password}
            // onChange={handleFormChange}
            placeholder="Введіть поточний пароль"
            autoComplete="new-password"
            className={`px-4 border rounded-[94px] w-[500px] h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal ${
              error ? 'border-error' : 'border-gray-20'
            }`}
          />
          <img
            className="absolute right-4 top-2 cursor-pointer"
            src={showPassword ? showPass : hidePass}
            alt=""
            onClick={toogleSeePassword}
          />
        </div>
        {error && <div className="absolute text-error">Поточний пароль введено не вірно.</div>}
      </div>

      <div className="mb-10">
        <h5 className="text-gray-90 text-[16px] font-normal mb-1">Новий пароль</h5>
        <div className="relative">
          <input
            type={showPasswordRetry ? 'text' : 'password'}
            name="repeatPassword"
            required
            // value={formData.repeatPassword}
            // onChange={handleFormChange}
            placeholder="Введіть новий пароль"
            autoComplete="new-password"
            className={`relative px-4 border rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal ${
              error ? 'border-error' : 'border-gray-20 '
            }`}
          />
          {error && <div className="absolute text-error">Паролі не співпадають</div>}
          <img
            className="absolute right-4 top-2 cursor-pointer"
            src={showPasswordRetry ? showPass : hidePass}
            alt=""
            onClick={toogleSeePasswordRetry}
          />
        </div>
      </div>

      <div className="mb-10">
        <h5 className="text-gray-90 text-[16px] font-normal mb-1">Повторіть новий пароль</h5>
        <div className="relative">
          <input
            type={showPasswordRetry ? 'text' : 'password'}
            name="repeatPassword"
            required
            // value={formData.repeatPassword}
            // onChange={handleFormChange}
            placeholder="Повторіть новий пароль"
            autoComplete="new-password"
            className={`relative px-4 border rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal ${
              error ? 'border-error' : 'border-gray-20 '
            }`}
          />
          {error && <div className="absolute text-error">Паролі не співпадають</div>}
          <img
            className="absolute right-4 top-2 cursor-pointer"
            src={showPasswordRetry ? showPass : hidePass}
            alt=""
            onClick={toogleSeePasswordRetry}
          />
        </div>
      </div>
      <button
                className='w-full rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-20 bg-primary cursor-pointer
                '
              >
                Змінити Пароль
              </button>
    </form>
  </>
  : (<ProfileNoLogin />);
}


