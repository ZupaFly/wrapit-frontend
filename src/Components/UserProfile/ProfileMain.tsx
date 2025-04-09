/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom";
import backButton from '../../image/survey-main/button/Button.png'
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export const ProfileMain = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const initialFormData = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: '',
    repeatPassword: '',
  };

  const [idCheck, setIdCheck] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [linkCheck, setLinkCheck] = useState(1);
  const [hideDisply, setHideDisplay] = useState(false);
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialFormData);

  function hideDisplayFunc () {
    setHideDisplay(prev => {
      return !prev;
    });
  }

  useEffect(() => {
    setIdCheck(Boolean(initialFormData.id)); 
  }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBack = () => {
        navigate(-1);
        hideDisplayFunc();
    };

  return (
    <div className="px-6 flex-grow-1">
      <button
        onClick={handleBack}
        className={`h-[40px] w-[40px] bg-center bg-cover cursor-pointer mt-9 border border-gray-20 rounded-full
          ${hideDisply
            ? 'max-[1024px]:block'
            : 'max-[1024px]:hidden'
          }`}
        style={{
          backgroundImage: `url(${backButton})`
        }}
      />

      <h2 className={`uppercase mt-15 max-[1024px]:mt-10 mb-10 text-gray-100 text-[64px] max-[1024px]:text-[32px] font-bold
        ${hideDisply
          ? 'max-[1024px]:hidden'
          : 'max-[1024px]:block'
        }`}>
          кабінет
        </h2>
        <div className={`w-full flex flex-row gap-25
          `}>
          <ul className={`flex flex-col max-[1024px]:w-full
            ${hideDisply
              ? 'max-[1024px]:hidden'
              : 'max-[1024px]:flex'
               }`}>
            <Link 
              to={'./personalinfo'} 
              className="uppercase mb-4 text-gray-100 text-[14px] font-normal"
              onClick={() => {
                setLinkCheck(1);
                hideDisplayFunc()}}
            >
              <div className="flex justify-between">
                <h3>особиста інформація</h3>
                <h3 className="lg:hidden">&gt;</h3>
              </div>

            </Link>
            <Link 
              to={'./changepass'}
              className="uppercase mb-4 text-gray-100 text-[14px] font-normal"
              onClick={() => {
                setLinkCheck(2);
                hideDisplayFunc()}}
            >
              <div className="flex justify-between">
                <h3>змінити пароль</h3>
                <h3 className="lg:hidden">&gt;</h3>
              </div>
            </Link>
            <Link 
              to={'./chekorder'}
              className="uppercase mb-4 text-gray-100 text-[14px] font-normal"
              onClick={() => {
                setLinkCheck(3);
                hideDisplayFunc()}}
            >
                <div className="flex justify-between">
                  <h3>замовлення</h3>
                  <h3 className="lg:hidden">&gt;</h3>
              </div>
            </Link>
            <Link
              to={'./logoff'}
              className="uppercase text-gray-100 text-[14px] font-normal"
              onClick={() => {
                setLinkCheck(4);
                hideDisplayFunc()}}
            >
                <div className="flex justify-between">
                  <h3>Вийти з кабінету</h3>
                  <h3 className="lg:hidden">&gt;</h3>
              </div>
            </Link>
          </ul>

          <Outlet context={{ hasChanges, formData, idCheck, linkCheck, handleFormChange, hideDisplayFunc }} />
        </div>
      </div>
  )
}