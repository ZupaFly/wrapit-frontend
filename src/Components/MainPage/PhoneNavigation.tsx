import { Link } from "react-router-dom"
import mobileButtonClose from '../../image/header/mobile-button-close.png';
import headerLogoBlack from '../../image/header/header-logo-black.png';
import React from "react";
import { User } from "../../types/User";

type Props = {
  user: User,
  profileLink: string,
  buttonClick: boolean,
  handleButtonClick: () => void,
}

export const PhoneNavigation: React.FC<Props> = ({ handleButtonClick, profileLink, user, buttonClick }) => {
  return (
    <nav 
    className={`m-0 p-0 fixed top-0 left-0 right-0 h-full bg-header-color transform transition-transform duration-300 z-50
      ${buttonClick 
        ? `translate-x-0`
        : `translate-x-full`
      }`}>
      <img
        onClick={handleButtonClick}
        className='absolute h-[40px] w-[40px] ml-6 my-9 cursor-pointer'
        src={mobileButtonClose} alt="mobile button" />
        <div className='flex flex-col justify-center items-center'>
          <img
            className='pt-16 w-[84px] mb-21'
            src={headerLogoBlack}
            alt="" />
          <div className='flex flex-col gap-4'>
            <Link
              to={'/'} 
              onClick={handleButtonClick}
              className="text-grey-90 uppercase
              font-normal text-[14px] leading-[110%]
              relative after:content-[' '] after:block
              after:absolute after:left-0 after:top-[140%] after:w-full after:h-[1px] after:bg-gray-90 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 
                    hover:after:scale-x-100 hover:after:origin-left text-center">головна сторінка</Link>
            <Link
              to={'shop'}
              onClick={handleButtonClick}
              className="text-grey-90 uppercase
              font-normal text-[14px] leading-[110%]
              relative after:content-[' '] after:block
              after:absolute after:left-0 after:top-[140%] after:w-full after:h-[1px] after:bg-gray-90 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 
                    hover:after:scale-x-100 hover:after:origin-left text-center">магазин</Link>
            <h3
              onClick={handleButtonClick}
              className="text-grey-90 uppercase
              font-normal text-[14px] leading-[110%]
              relative after:content-[' '] after:block
              after:absolute after:left-0 after:top-[140%] after:w-full after:h-[1px] after:bg-gray-90 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 
                    hover:after:scale-x-100 hover:after:origin-left text-center">{!user.id
                    ? <Link to={'/registration'}>
                        кабінет
                      </Link>
                    : <Link to={profileLink}>кабінет
                      </Link>}
              </h3>
            <Link
              to={'cart'}
              onClick={handleButtonClick}
              className="text-grey-90 uppercase
              font-normal text-[14px] leading-[110%]
              relative after:content-[' '] after:block
              after:absolute after:left-0 after:top-[140%] after:w-full after:h-[1px] after:bg-gray-90 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 
                    hover:after:scale-x-100 hover:after:origin-left text-center">кошик</Link>
            <Link
              to={"/feedback"}
              onClick={handleButtonClick}
              className="mb-4 text-grey-90 uppercase
              font-normal text-[14px] leading-[110%]
              relative after:content-[' '] after:block
              after:absolute after:left-0 after:top-[140%] after:w-full after:h-[1px] after:bg-gray-90 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 
                    hover:after:scale-x-100 hover:after:origin-left text-center">допомога</Link>
          </div>
        </div>
    </nav>
  )
}