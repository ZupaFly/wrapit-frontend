/* eslint-disable react/react-in-jsx-scope */
import askIcon from '../../image/header/ask-icon.png';
import cartIcon from '../../image/header/cart-icon.png';
import headerLogo from '../../image/header/header-logo.svg';
import userLogin from '../../image/header/user-login.png';
import userSignIn from '../../image/icons/signin.png'
import { Link, useLocation } from 'react-router-dom';
import { User } from '../../types/User';
import { useEffect, useState } from 'react';

const user: User = {
  id: 123,
  firstName: 'Dima',
  phoneNumber: 0,
  lastName: ''
}


export const HeaderNav = () => {
  const location = useLocation();
  const [homePage, setHomePage] = useState(location.pathname === '/');

  useEffect(() => {
    setHomePage(location.pathname === "/");
  }, [location.pathname]);

  return (
    <div className={`mb-5 flex flex-col
      ${homePage
        ? 'h-[60vh] bg-light-violet'
        : 'box-border flex-grow-1'
      }`}>


        <nav className="mt-[40px] ml-[40px] mr-[40px] flex flex-row h-[61px] bg-header-color justify-between rounded-[138px] items-center">

          <div className="pl-[16px] flex gap-[64px] flex-1">
            <Link to={"/"} 
              className="text-white uppercase font-normal text-[14px] leading-[110%] relative 
                         after:content-[' '] after:block after:absolute after:left-0 after:top-[140%] after:w-full after:h-[1px] 
                         after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-300 
                         hover:after:scale-x-100 hover:after:origin-left">
              головна
            </Link>
            <Link to="/shop" 
              className="text-white uppercase font-normal text-[14px] leading-[110%] relative 
                         after:content-[' '] after:block after:absolute after:left-0 after:top-[140%] after:w-full after:h-[1px] 
                         after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-300 
                         hover:after:scale-x-100 hover:after:origin-left">
              магазин
            </Link>
          </div>

          <img 
            src={headerLogo} 
            alt="header-logo" 
            className="h-[54px] flex-1 py-2"/>

          <div className="pr-[16px] flex gap-[40px] flex-1 justify-end items-center">

          {!user.id
            ? (<Link to={'/registration'}>
                <img 
                  src={userSignIn}
                  alt="user-logo-icon" 
                  className="transition-all duration-200 hover:scale-110"/>
              </Link>)
            : (<Link to={`/profile/personalinfo`}>
                  <img 
                    src={userLogin}
                    alt="user-logo-icon" 
                    className="transition-all duration-200 hover:scale-110"/>
              </Link>
          )}

            <Link to={'/cart'}>
              <img
                src={cartIcon} 
                alt="cart-icon" 
                className="transition-all duration-200 hover:scale-110"/>
            </Link>
            <Link to={"/feedback"}>
              <img 
                src={askIcon} 
                alt="ask-icon" 
                className="transition-all duration-200 hover:scale-110"/>
            </Link>
            <Link to={'/survey'}>
              <button 
                className="bg-primary h-[44px] w-[207px] rounded-[80px] text-white font-medium text-[16px] 
                         transition-all duration-200 hover:scale-105 cursor-pointer">
                  Підібрати подарунок
              </button>
                
            </Link>
          </div>
        </nav>

        {homePage &&
        <div className="relative h-full overflow-hidden flex items-end justify-center">
            <h1 className="text-white text-[20vw] leading-none uppercase">
              wrapIt
            </h1>
          </div>}
      </div>
  )
}
