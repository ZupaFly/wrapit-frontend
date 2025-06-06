/* eslint-disable react/react-in-jsx-scope */
import { FC } from "react";

interface CardProps {
  name: string;
  price: number;
  mainImageUrl: string;
}

export const Card: FC<CardProps> = ({ name, price, mainImageUrl }) => {
  return (
    <div className="flex flex-col gap-6 mb-6">
      <img
        src={mainImageUrl}
        alt={name}
        className='rounded-[8px] w-full h-[414px] object-cover'
      />
      <div className="flex justify-between">
        <h3 className="text-gray-70">{name}</h3>
        <h3 className="text-gray-90">{price} грн</h3>
      </div>
      <div className='relative'>
        <button 
          className="bg-primary text-white text-[16px] h-11 rounded-[80px] cursor-pointer w-[206px] absolute right-0"
        >
          У кошик
        </button>
      </div>
    </div>
  );
};