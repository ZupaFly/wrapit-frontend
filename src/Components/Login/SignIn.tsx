import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import hidePass from '../../image/icons/hidePassword.png';
import showPass from '../../image/icons/showPassword.png';

export const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRetry, setShowPasswordRetry] = useState(false);
  const [succes, setSucces] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    repeatPassword: '',
  });

  const checkFields = Object.values(formData).every(value => value.trim() !== '');

  const toogleSeePassword = () => {
    setShowPassword(!showPassword);
  };

  const toogleSeePasswordRetry = () => {
    setShowPasswordRetry(!showPasswordRetry);
  };

  const registrationRequest = {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    phoneNumber: formData.phoneNumber.replace(/\s+/g, '').trim(),
    password: formData.password,
    repeatPassword: formData.repeatPassword,
  };

  const HandleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setError(true);
      setTimeout(() => setError(false), 5000);
      return;
    }

    try {
      const response = await fetch('http://ec2-44-203-84-198.compute-1.amazonaws.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(registrationRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Помилка HTTP: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Реєстрація успішна! Отримані дані:', data);

      setSucces(true);
      setTimeout(() => {
        setSucces(false);
        navigate('../login');
      }, 2000);

    } catch (error) {
      console.error('Помилка реєстрації:', error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {succes ? (
        <><div className='text-green-600 text-[30px] w-full text-center py-4'>Реєстрація успішна!</div><div className='text-green-600 text-[16px] w-full text-center'>Перенаправляємо на сторінку входу...</div></>
      ) : (
        <div className="col-span-2 mt-20">
          <h1 className="uppercase text-gray-100 text-[64px] font-bold mb-16">реєстрація</h1>
          <form onSubmit={HandleFormSubmit}>
            <div className="mb-6">
              <h5 className="text-gray-90 text-[16px] font-normal mb-1">Ім&apos;я</h5>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleFormChange}
                placeholder="Введіть ваше Ім&apos;я"
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
                onChange={handleFormChange}
                className="px-4 border border-gray-20 rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal"
              />
            </div>

            <div className="mb-6">
              <h5 className="text-gray-90 text-[16px] font-normal mb-1">Номер телефону</h5>
              <input
                type="phone"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleFormChange}
                placeholder="+380 00 000 00 00"
                className="px-4 border border-gray-20 rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal"
              />
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
            </div>

            <div className="mb-10">
              <h5 className="text-gray-90 text-[16px] font-normal mb-1">Повторіть пароль</h5>
              <div className="relative">
                <input
                  type={showPasswordRetry ? 'text' : 'password'}
                  name="repeatPassword"
                  required
                  value={formData.repeatPassword}
                  onChange={handleFormChange}
                  placeholder="Повторіть пароль"
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
              className={`w-full rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-6 ${
                checkFields ? 'bg-primary cursor-pointer' : 'bg-gray-60 cursor-not-allowed'
              }`}
            >
              Зареєструватись
            </button>
          </form>

          <div className="flex justify-end">
            <Link to={'/registration/login'} className="border-b text-gray-100 text-[16px] font-medium">
              Я вже маю аккаунт
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
