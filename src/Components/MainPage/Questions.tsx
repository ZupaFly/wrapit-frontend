/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import presentIcon from '../../image/Questions/present.png'; 

export const Questions = () => {
  return (
    <div className="grid grid-cols-6 mb-20 px-10">
      <div className="col-start-2 col-span-5">
        <ul className="mb-8">
          <li className="uppercase text-gray-100 text-[40px] font-medium leading-[110%] border-b border-gray-50 py-8 ">01 відповідайте на кілька запитань.</li>
          <li className="uppercase text-gray-100 text-[40px] font-medium leading-[110%] border-b border-gray-50 py-8 ">02 отримуйте найкращі варіанти.</li>
          <li className="uppercase text-gray-100 text-[40px] font-medium leading-[110%] border-b border-gray-50 py-8 ">03 замовляйте подарунок одразу.</li>
        </ul>
      </div>

      <Link to='/survey' className="col-start-2 col-span-1">
        <div className="flex items-center justify-center gap-2 border border-primary py-5 rounded-[80px] cursor-pointer hover:transition-transform hover:duration-200 hover:bg-blue-50">
          <span className="text-[16px] text-gray-100 font-medium leading-[120%]">Підібрати подарунок</span>
          <img src={presentIcon} alt="present icon" />
        </div>
    </Link>

    </div>
  )
}