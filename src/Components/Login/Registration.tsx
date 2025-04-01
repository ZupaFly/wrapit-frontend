  /* eslint-disable react/react-in-jsx-scope */
  import { Outlet, useLocation, useNavigate } from 'react-router-dom';
  import backButton from '../../image/icons/Button.png';
  import registartionBgImage from '../../image/registration/registration-bg-image.png'
import { useEffect, useState } from 'react';
import { Footer } from '../MainPage/Footer';

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export const Registration = () => {
  const [passStep, setPassStep] = useState(1);
  const [loginButton, setLoginButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const width = useWindowWidth();

  const user = {
    id: null,
  }

  useEffect (() => {
    checkLoginButtons()
  },)

  const checkLoginButtons = () => {
    if (location.pathname.endsWith('/registration') && !user.id) {
      setLoginButton(false)
    } else {
      setLoginButton(true);
    }
  }

  const handleStep = () => {
    setPassStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (location.pathname.endsWith('passrestoration')) {
      if (passStep > 1) {
        setPassStep((prev) => prev - 1);
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow grid grid-cols-5 bg-white gap-6 
                      max-[1024px]:flex max-[1024px]:flex-col max-[1024px]:relative">
        
        <div 
          className="col-span-3 bg-cover bg-center w-full h-1/4 lg:hidden 
                     max-[1024px]:absolute max-[1024px]:top-0"
          style={{ backgroundImage: `url(${registartionBgImage})` }} 
        />
  
        <div className="col-span-2 ml-10 relative max-[1024px]:ml-0 max-[1024px]:px-6">
          <button
            onClick={handleBack}
            className="h-[40px] w-[40px] bg-center bg-cover cursor-pointer mt-9 border border-gray-20 rounded-full"
            style={{ backgroundImage: `url(${backButton})` }}
          />
          
          <Outlet context={{ passStep, handleStep }} />
        </div>
  
        {!loginButton && (
          <div className="absolute top-1/2 left-1/5 max-[1024px]:left-1/2 
                          -translate-x-1/2 -translate-y-1/2 flex flex-col max-[1024px]:w-full max-[1024px]:px-4">
            <button 
              onClick={() => navigate('./signin')}
              className="bg-gray-60 rounded-[120px] h-15 w-100 max-[1024px]:w-full text-white mb-6 cursor-pointer hover:bg-primary">
              Зареєструватися
            </button>
            <button
              onClick={() => navigate('./login')}
              className="bg-gray-60 rounded-[120px] h-15 w-100 max-[1024px]:w-full text-white mb-6 
                        cursor-pointer hover:bg-primary">
              Увійти у кабінет
            </button>
          </div>
        )}
  
        <div 
          className="col-span-3 bg-cover bg-center w-full h-full max-[1024px]:hidden"
          style={{ backgroundImage: `url(${registartionBgImage})` }} 
        />
      </div>
  
      { width < 1024 && 
        <Footer />
      }
    </div>
  );
  
  
}
