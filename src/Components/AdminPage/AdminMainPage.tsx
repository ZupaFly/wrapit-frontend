/* eslint-disable react/react-in-jsx-scope */

import { useState } from "react"
import { Link, Outlet } from "react-router-dom";

export const AdminMainPage = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-10 flex-grow-1">
      <h2 className="uppercase mt-15 mb-10 text-gray-100 text-[64px] font-bold">Адмін сторінка</h2>
        <div className="w-full flex flex-row gap-45">
          <ul 
            className="relative flex"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            >
            <div
              className="uppercase py-2 text-gray-100 text-[14px] font-normal cursor-pointer"
            >
              Товари
            </div>
            {isOpen && (
              <div className="absolute left-[100%] top-0 w-40 bg-white shadow-lg rounded-md z-10">
                  <ul className="py-2">
                    <li><Link to="./createitem" className="block px-4 py-2 hover:bg-gray-200">Створити товар</Link></li>
                    <li><Link to="./changeitem" className="block px-4 py-2 hover:bg-gray-200">Змінити товар</Link></li>
                    <li><Link to="./deleteitem" className="block px-4 py-2 hover:bg-gray-200">Видалити товар</Link></li>
                    <li><Link to="./listofitems" className="block px-4 py-2 hover:bg-gray-200">Список товарів</Link></li>
                  </ul>
                </div>
                
            )}
          </ul>

          <Outlet />
        </div>
      </div>
  )
}