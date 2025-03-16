import { Link } from "react-router-dom"
import showPass from '../../image/icons/showPassword.png';

/* eslint-disable react/react-in-jsx-scope */
export const Login = () => {
  return (
    <div className='col-span-2 mt-20'>
    <h1 
      className='uppercase text-gray-100 text-[64px] font-bold mb-16'
    >
        реєстрація
    </h1>
      <form action="post">
    <div className='mb-6'>
    <h5 
      className='text-gray-90 text-[16px] font-normal mb-1'
    >
      Номер телефону
    </h5>
    <input 
      type="phone"
      name='phoneNumber'
      required 
      placeholder='+380 00 000 00 00'
      className='px-4 border border-gray-20 rounded-[94px] w-[100%] h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal'
    />
  </div>

  <div className='mb-6'>
    <h5 
      className='text-gray-90 text-[16px] font-normal mb-1'
    >
      Пароль
    </h5>
    <div className='relative'>
    <input
      type="password"
      name='password'
      required 
      placeholder='Введіть пароль'
      className='px-4 border border-gray-20 rounded-[94px] w-[100%] h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal'
    />
      <img className='absolute right-4 top-2' src={showPass} alt="" />
    </div>
  </div>
  <button 
        className='bg-gray-60 w-[100%] rounded-[120px] h-14 text-gray-20 text-[16px] font-medium cursor-pointer mb-6'
      >
          Зареєструватись
      </button>
    </form>
      <div className='flex justify-end'>
        <Link
          to='/registration/login'
          className='border-b text-gray-100 text-[16px] font-medium'
        >
          Я вже маю аккаунт
        </Link>
      </div>
  </div>
  )
}