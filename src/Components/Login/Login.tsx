import { Link, useNavigate } from "react-router-dom"
import React, { useState } from "react";
import googleIcon from '../../image/icons/google.png';
import facebookIcon from '../../image/icons/facebook.png';
import hidePass from '../../image/icons/hidePassword.png';
import showPass from '../../image/icons/showPassword.png';
import errorIcon from '../../image/icons/error.png';
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userLogin, setUserLogin] = useState({
    phoneNumber: '',
    password: '',
  })

  const loginRequest = {
    phoneNumber: userLogin.phoneNumber.replace(/\s+/g, '').trim(),
    password: userLogin.password,
  }

  const buttonCheck = Object.values(userLogin).every(value => value.trim() !== '');

  const toogleSeePassword = () => {
    setShowPassword(!showPassword);
  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://ec2-44-203-84-198.compute-1.amazonaws.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest),
      });

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error (`Помилка реєстрації: ${response.status} -${errorText}`)
      }

      const data = await response.json();
      dispatch(setUser(data))
      navigate('*')

      console.log(data);
    } catch (error) {
      console.error('Помилка логіну:', error);
      setError(true)
    }
  };

  return (
    <div className='flex-grow-1 col-span-2 mt-20'>
      <h1 className='uppercase text-gray-100 text-[64px] font-bold mb-16 max-[1024px]:mt-40'>
        вхід
      </h1>

      <form 
        className="mb-21" 
        onSubmit={handleFormSubmit}>
        <div className='mb-6'>
          <h5 className='text-gray-90 text-[16px] font-normal mb-1'>
            Номер телефону
          </h5>
          <input 
            type="phone"
            name='phoneNumber'
            required 
            placeholder='+380 00 000 00 00'
            value={userLogin.phoneNumber}
            onChange={handleFieldChange}
            className='px-4 border border-gray-20 rounded-[94px] w-[100%] h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal'
          />
        </div>

        <div className='relative mb-6'>
          <h5 className='text-gray-90 text-[16px] font-normal mb-1'>
            Пароль
          </h5>
          <div className="relative mb-10">
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              required 
              placeholder='Введіть пароль'
              value={userLogin.password}
              onChange={handleFieldChange}
              className={`px-4 border rounded-[94px] w-[100%] h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal
                ${error ? 'border-error' : 'border-gray-20'}
                `}
            />

            {error &&
              <img
                className='absolute right-12 top-2 cursor'
                src={errorIcon}
                alt=""
              />
            }
              <img
                className='absolute right-4 top-2 cursor-pointer'
                src={showPassword ? showPass : hidePass}
                alt=""
                onClick={toogleSeePassword}
              />
              {error && 
                <div className="absolute text-error text-[16px] font-normal">Пароль не вірний!</div>
              }
          </div>

          <div className="flex justify-between gap">
            <div className="flex">
              <input
                className=""
                type="checkbox" />
              <h5 className="p-2 text-[16px] text-gray-80 font-normal">Запам&apos;ятати мене</h5>
            </div>
            <div
              onClick={() => navigate('/registration/passrestoration')}
              className="border-b text-[16px] text-gray-80 font-normal cursor-pointer">
                Не пам’ятаю пароль
            </div>
          </div>
        </div>
        <button 
            className={`w-[100%] rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-6
              ${buttonCheck
                ? 'bg-primary cursor-pointer'
                : 'bg-gray-60 cursor-not-allowed'
              }
            `}
          >
              Увійти
          </button>
      </form>

        <div className="mb-6">
          <h3 className='mb-3 text-gray-80 text-[20px] font-normal'>
            Увійти за допомогою:
          </h3>
          <div className="grid gap-4 grid-cols-2">
            <div className="flex justify-center items-center gap-2 border border-primary rounded-[80px] w-full cursor-pointer">
            <div className="h-[24px] w-[24px] bg-cover bg-center" style={{ backgroundImage: `url(${googleIcon})`}}></div>
              <h4 className="text-[16px] text-gray-100 font-medium">Google</h4>
            </div>

            <div className="flex justify-center items-center gap-2 border border-primary rounded-[80px] w-full cursor-pointer h-11">
              <div className="h-[24px] w-[24px] bg-cover bg-center" style={{ backgroundImage: `url(${facebookIcon})`}}></div>
              <h4 className="text-[16px] text-gray-100 font-medium">Facebook</h4>
            </div>
          </div>
        </div>

      <div className='flex justify-end'>
        <Link
          to='/registration/signin'
          className='border-b text-gray-100 text-[16px] font-medium max-[1024px]:mb-10h'
        >
          У мене немає аккаунта
        </Link>
      </div>
  </div>
  )
}