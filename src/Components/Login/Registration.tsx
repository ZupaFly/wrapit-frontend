  /* eslint-disable react/react-in-jsx-scope */
  import { Outlet, useLocation, useNavigate } from 'react-router-dom';
  import backButton from '../../image/icons/Button.png';
  import registartionBgImage from '../../image/registration/registration-bg-image.png'
import { useEffect, useState } from 'react';

export const Registration = () => {
  const [loginButton, setLoginButton] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const user = {
    id: 13,
  }

  useEffect (() => {
    checkLoginButtons()
  },)

  const checkLoginButtons = () => {
    if (location.pathname.endsWith('/registration') && user.id) {
      setLoginButton(false)
    } else {
      setLoginButton(true);
    }
  }

  const handleBack = () => {
    navigate(-1);
  }
  return (
    <div className="grid grid-cols-5 bg-white h-screen gap-6">
      <div className='col-span-2 ml-10 relative'>
        <button
          onClick={handleBack}
          className="h-[40px] w-[40px] bg-center bg-cover cursor-pointer mt-10 border border-gray-20 rounded-full"
          style={{
            backgroundImage: `url(${backButton})`
          }}
        />
        <Outlet />
{!loginButton &&
           <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col'>
           <button 
             onClick={()=> {navigate('./signin')}}
             className='bg-gray-60 rounded-[120px] h-15 w-130 text-white mb-6 cursor-pointer hover:bg-primary'
           >Зареєструватися</button>
           <button
             onClick={()=> {navigate('./login')}}
             className='bg-gray-60 rounded-[120px] h-15 w-130 text-white mb-6 cursor-pointer hover:bg-primary'
           >Увійти у кабінет</button>
         </div>
}

      </div>
      <div className='col-span-3 bg-cover bg-center w-[100%]' style={{backgroundImage: `url(${registartionBgImage})`}}></div>
    </div>
  )
}
