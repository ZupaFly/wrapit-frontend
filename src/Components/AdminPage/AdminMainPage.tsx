/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const AdminMainPage = () => {
  const [itemList, setItemList] = useState(false);
  const [categoriesList, setCategoriesList] = useState(false);

  return (
    <div className="px-10 flex-grow-1">
      <h2 className="uppercase mt-15 mb-10 text-gray-100 text-[64px] font-bold">Адмін сторінка</h2>
      <div className="w-full flex flex-row gap-45 relative">
        <ul className="flex flex-col gap-2">
          <div
            onClick={() => {
              setItemList(!itemList);
              setCategoriesList(false);
            }}
            className="uppercase py-2 text-gray-100 text-[14px] font-normal cursor-pointer"
          >
            Товари
          </div>
          {itemList && (
            <div className="absolute left-[180px] top-0 w-40 bg-white shadow-lg rounded-md z-10">
              <ul
              onClick={() => {
                setItemList(false);
                setCategoriesList(false);
              }}
                className="py-2">
                <li><Link to="./createitem" className="block px-4 py-2 hover:bg-gray-200">Створити товар</Link></li>
                <li><Link to="./changeitem" className="block px-4 py-2 hover:bg-gray-200">Змінити товар</Link></li>
                <li><Link to="./deleteitem" className="block px-4 py-2 hover:bg-gray-200">Видалити товар</Link></li>
                <li><Link to="./listofitems" className="block px-4 py-2 hover:bg-gray-200">Список товарів</Link></li>
              </ul>
            </div>
          )}

          <div
            onClick={() => {
              setCategoriesList(!categoriesList);
              setItemList(false);
            }}
            className="uppercase py-2 text-gray-100 text-[14px] font-normal cursor-pointer"
          >
            Категорії
          </div>
          {categoriesList && (
            <div className="absolute left-[180px] top-[60px] w-40 bg-white shadow-lg rounded-md z-10">
              <ul
                onClick={() => {
                  setItemList(false);
                  setCategoriesList(false);
                }}
                className="py-2">
                <li><Link to="./createcategory" className="block px-4 py-2 hover:bg-gray-200">Створити категорію</Link></li>
                <li><Link to="./changecategory" className="block px-4 py-2 hover:bg-gray-200">Змінити категорію</Link></li>
                <li><Link to="./deletecategory" className="block px-4 py-2 hover:bg-gray-200">Видалити категорію</Link></li>
                <li><Link to="./listofcategories" className="block px-4 py-2 hover:bg-gray-200">Список категорій</Link></li>
              </ul>
            </div>
          )}
        </ul>

        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
