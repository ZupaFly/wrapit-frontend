/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom";

type FormData = {
  id: number,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password: string,
  repeatPassword: string,
}

export const ProfileMain = () => {
  const initialFormData: FormData = {
    id: 1,
    firstName: 'Dmytro',
    lastName: 'Loboda',
    phoneNumber: '12345678',
    password: '',
    repeatPassword: '',
  };

  const [idCheck, setIdCheck] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [linkCheck, setLinkCheck] = useState(1);
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialFormData);

  useEffect(() => {
    setIdCheck(Boolean(initialFormData.id)); 
  }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  return (
    <div className="px-10 min-h-full">
      <h2 className="uppercase mt-15 mb-10 text-gray-100 text-[64px] font-bold">кабінет</h2>
        <div className="h-full w-full flex flex-row gap-25">
          <ul className="flex flex-col">
            <Link 
              to={'./personalinfo'} 
              className="uppercase mb-4 text-gray-100 text-[14px] font-normal"
              onClick={() => {setLinkCheck(1)}}
            >
              особиста інформація
            </Link>
            <Link 
              to={'./changepass'}
              className="uppercase mb-4 text-gray-100 text-[14px] font-normal"
              onClick={() => {setLinkCheck(2)}}
            >
              змінити пароль
            </Link>
            <Link 
              to={'./chekorder'}
              className="uppercase mb-4 text-gray-100 text-[14px] font-normal"
              onClick={() => {setLinkCheck(3)}}
            >
                Замовлення
            </Link>
            <Link
              to={'./logoff'}
              className="uppercase text-gray-100 text-[14px] font-normal"
              onClick={() => {setLinkCheck(4)}}
            >
              Вийти з кабінету
            </Link>
          </ul>

          <Outlet context={{ hasChanges, formData, idCheck, linkCheck, handleFormChange }} />
        </div>
      </div>
  )
}