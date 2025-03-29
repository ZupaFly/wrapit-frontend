/* eslint-disable react/react-in-jsx-scope */
import { SetStateAction, useContext, useState } from "react";
import { AdminAuthContext } from "./AdminAuthContext";
import { useNavigate } from "react-router-dom";
import hidePass from '../../image/icons/hidePassword.png';
import showPass from '../../image/icons/showPassword.png';

export const AdminPageLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const checkFields = Object.values(formData).every(value => value.trim() !== '');

  const toogleSeePassword = () => {
    setShowPassword(!showPassword);
  };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage('');

    login(formData.username, formData.password)
      .then(() => {
        navigate('./adminmain')
      })
      .catch((error: { message: SetStateAction<string>; }) => setErrorMessage(error.message));
  }

  return (
    <form
      className="flex-grow-1 my-0 mx-auto"
      onSubmit={handleFormSubmit}>
      <div>
        <h3 
          className="text-gray-90 text-[16px] font-normal mb-1">
            Введіть ім&apos;я користувача
        </h3>
        <input
          className="px-4 border border-gray-20 rounded-[94px] h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleFormChange} />
      </div>
      <div className="mb-6">
              <h5 className="text-gray-90 text-[16px] font-normal mb-1">Пароль</h5>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleFormChange}
                  placeholder="Введіть пароль"
                  autoComplete="new-password"
                  className={`px-4 border rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal ${
                    errorMessage ? 'border-error' : 'border-gray-20'
                  }`}
                />
                <img
                  className="absolute right-4 top-2 cursor-pointer"
                  src={showPassword ? showPass : hidePass}
                  alt=""
                  onClick={toogleSeePassword}
                />
              </div>
            </div>
      {errorMessage && <h3>{errorMessage}</h3>}
      <button
        className={`w-full rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-6 ${
          checkFields ? 'bg-primary cursor-pointer' : 'bg-gray-60 cursor-not-allowed'
        }`}
        type="submit">Увійти</button>
    </form>
  );
}
