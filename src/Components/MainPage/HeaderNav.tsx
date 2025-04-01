/* eslint-disable react/react-in-jsx-scope */
import askIcon from '../../image/header/ask-icon.png';
import cartIcon from '../../image/header/cart-icon.png';
import headerLogo from '../../image/header/header-logo.svg';
import userLogin from '../../image/header/user-login.png';
import userSignIn from '../../image/icons/signin.png'
import { Link, matchPath, useLocation } from 'react-router-dom';
import { User } from '../../types/User';
import { useEffect, useState } from 'react';
import mobileButton from '../../image/header/mobile-button.png'
import { PhoneNavigation } from './PhoneNavigation';

const user: User = {
  id: null,
  firstName: 'Dima',
  phoneNumber: 0,
  lastName: ''
}


export const HeaderNav = () => {
  const location = useLocation();
  const [buttonClick, setButtonClick] = useState(false);
  const [homePage, setHomePage] = useState(location.pathname === '/');
  const [profileLink, setProfileLink] = useState("/profile/personalinfo");

  const isParentRoute = 
    location.pathname === '/' ||
    matchPath("/profile/", location.pathname) ||
    matchPath("/shop/", location.pathname) ||
    matchPath("/feedback/", location.pathname) ||
    matchPath("/cart/", location.pathname);

useEffect(() => {
  const updateProfileLink = () => {
    if (window.innerWidth < 1024) {
      setProfileLink("/profile");
    } else {
      setProfileLink("/profile/personalinfo");
    }
  };

  updateProfileLink();

  window.addEventListener("resize", updateProfileLink);

  return () => {
    window.removeEventListener("resize", updateProfileLink);
  };
}, []);

  useEffect(() => {
    setHomePage(location.pathname === "/");
  }, [location.pathname]);

  function handleButtonClick() {
    setButtonClick(prev => {
      const body = document.body;
  
      if (!body) return prev;
  
      if (buttonClick) {
        body.style.overflow = 'auto';
      } else {
        body.style.overflow = 'hidden';
      }
  
      return !prev;
    });
  }

  return (
    <div className={`relative flex flex-col max-[1024px]:block
      ${homePage
        ? 'h-[60vh] bg-light-violet max-[1024px]:h-auto'
        : 'box-border'
      }`}>


        <nav className={`mt-10 ml-10 mr-10 flex-row h-[61px]
          bg-header-color justify-between rounded-[138px]
          items-center flex 
          max-[1024px]:hidden
          ${buttonClick && "hidden"}`}>

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
            : (<Link to={profileLink}>
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

        <img
            onClick={handleButtonClick}
            className={`max-[1024px]:block hidden h-[40px] w-[40px] ml-10 max-[1024px]:ml-6 mt-9 cursor-pointer
              ${isParentRoute
                ? 'max-[1024px]:block'
                : 'max-[1024px]:hidden'}
              `}
            src={mobileButton} alt="mobile button" />

        {homePage &&
        <div className="relative h-full overflow-hidden flex items-end justify-center max-[1024px]:block max-[1024px]:my-0 max-[1024px]:mx-auto max-[1024px]:mt-12">
            <h1 className="text-white text-[20vw] leading-none uppercase text-center">
              wrapIt
            </h1>
          </div>}
        
          <PhoneNavigation handleButtonClick={handleButtonClick} profileLink={profileLink} user={user} buttonClick ={buttonClick}/>
    </div>
  )
}
