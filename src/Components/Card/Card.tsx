/* eslint-disable react/react-in-jsx-scope */
import diverPhoto from '../../image/card/image.png';

export const Card = () => {
  return (
    <div className="flex flex-col gap-6">
      <img
        src={diverPhoto}
        alt="Diver Image"
        className='rounded-[8px]' />
      <div className="flex justify-between">
        <h3 className="text-gray-70">Майстер-клас з дайвінгу в м.Київ</h3>
        <h3 className="text-gray-90">2360 грн</h3>
      </div>
      <div className='relative'>
      <button 
        className="bg-primary text-white text-[16px] h-11 rounded-[80px] cursor-pointer w-[206px] absolute right-0">
        У кошик
      </button>
      </div>

    </div>
  )
}