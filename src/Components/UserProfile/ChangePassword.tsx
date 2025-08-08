/* eslint-disable react/react-in-jsx-scope */
import { Link, useOutletContext } from "react-router-dom";
import successImg from '../../image/icons/success.png';
import { ProfileNoLogin } from "./ProfileNoLogin";
import hidePass from '../../image/icons/hidePassword.png';
import showPass from '../../image/icons/showPassword.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [error, setError] = useState({
    current: "",
    match: "",
    api: ""
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.user);
    const token = user.token;

  const toggleSeePassword = (type: string) => {
    if (type === 'current') setShowPassword(!showPassword);
    if (type === 'new') setShowNewPassword(!showNewPassword);
    if (type === 'repeat') setShowPasswordRetry(!showPasswordRetry);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setError({
      current: "",
      match: "",
      api: ""
    });

    // Validate passwords match
    if (newPassword !== repeatNewPassword) {
      setError(prev => ({...prev, match: "Паролі не співпадають"}));
      return;
    }

    try {
      const response = await fetch(
        "http://ec2-44-203-84-198.compute-1.amazonaws.com/categories/users/change-password", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Помилка при зміні пароля");
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/profile/personalinfo');
      }, 2000);
    } catch (err) {
      setError(prev => ({
        ...prev, 
        api: err instanceof Error ? err.message : "Сталася невідома помилка"
      }));
    }
  };

  if (!idCheck || linkCheck !== 2) {
    return <ProfileNoLogin />;
  }

  return (
    <>
      <form className="flex flex-col max-[1024px]:mt-10 max-[1024px]:w-full" onSubmit={handleSubmit}>
        <div className="mb-6">
          <h5 className="text-gray-90 text-[16px] font-normal mb-1">Поточний пароль</h5>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="currentPassword"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Введіть поточний пароль"
              className={`px-4 border rounded-[94px] w-[500px] max-[1024px]:w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal ${
                error.current ? 'border-error' : 'border-gray-20'
              }`}
            />
            <img
              className="absolute right-4 top-2 cursor-pointer"
              src={showPassword ? showPass : hidePass}
              alt=""
              onClick={() => toggleSeePassword('current')}
            />
          </div>
          {error.current && <div className="absolute text-error">{error.current}</div>}
        </div>

        <div className="mb-6">
          <h5 className="text-gray-90 text-[16px] font-normal mb-1">Новий пароль</h5>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Введіть новий пароль"
              className={`px-4 border rounded-[94px] w-[500px] max-[1024px]:w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal ${
                error.match ? 'border-error' : 'border-gray-20'
              }`}
            />
            <img
              className="absolute right-4 top-2 cursor-pointer"
              src={showNewPassword ? showPass : hidePass}
              alt=""
              onClick={() => toggleSeePassword('new')}
            />
          </div>
        </div>

        <div className="mb-10">
          <h5 className="text-gray-90 text-[16px] font-normal mb-1">Повторіть новий пароль</h5>
          <div className="relative">
            <input
              type={showPasswordRetry ? 'text' : 'password'}
              name="repeatNewPassword"
              required
              value={repeatNewPassword}
              onChange={(e) => setRepeatNewPassword(e.target.value)}
              placeholder="Повторіть новий пароль"
              className={`relative px-4 border rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal ${
                error.match ? 'border-error' : 'border-gray-20'
              }`}
            />
            {error.match && <div className="absolute text-error">{error.match}</div>}
            <img
              className="absolute right-4 top-2 cursor-pointer"
              src={showPasswordRetry ? showPass : hidePass}
              alt=""
              onClick={() => toggleSeePassword('repeat')}
            />
          </div>
        </div>

        <div className="flex">
          <button
            type="submit"
            className='w-full rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-2 bg-primary cursor-pointer'
          >
            Змінити Пароль
          </button>
        </div>

        <Link to={'/registration/passrestoration'} className="text-[16px] text-gray-100 font-medium mb-6 border-b inline-block w-fit cursor-pointer">
          Не пам&apos;ятаю пароль
        </Link>

        {error.api && <div className="text-error mb-4">{error.api}</div>}

        {success && (
          <div className="border border-success rounded-[8px] mb-14 flex flex-row items-center gap-4">
            <img
              src={successImg}
              alt="success icon"
              className='h-[32px] w-[32px] ml-2'
            />
            <div className='py-2 flex justify-between flex-col'>
              <h4 className='text-gray-90 text-[20px] font-normal'>Успішно</h4>
              <h5 className='text-gray-80 text-[16px] font-normal'>Пароль змінено</h5>
            </div>
          </div>
        )}
      </form>
    </>
  );
};