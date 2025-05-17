/* eslint-disable react/react-in-jsx-scope */
import { FC } from "react";
import photo from '../../image/card/image.png';

interface CardProps {
  title: string;
  price: number;
  image: string;
}
// add imgae to props
export const Card: FC<CardProps> = ({ title, price }) => {
  return (
    <div className="flex flex-col gap-6 mb-6">
      <img
        // src={image}
        src={photo}
        alt={title}
        className='rounded-[8px] w-full h-[414px] object-cover'
      />
      <div className="flex justify-between">
        <h3 className="text-gray-70">{title}</h3>
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