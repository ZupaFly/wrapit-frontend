/* eslint-disable react/react-in-jsx-scope */

export const Header = () => {
  return (
    <div className="h-[40vh]">

      <div>
        <div className="flex flex-col pl-[317px]">
          <h2 className="text-gray-100 uppercase mb-[16px] font-medium text-[40px]">про нас</h2>
          <h3 
            className="mb-7 font-normal text-[20px] leading-[140%]">
              Ми віримо, що кожен подарунок – це не просто річ, а<br /> особливий момент радості та турботи. Саме тому наш <br />сервіс допомагає вам швидко та легко знайти <br />ідеальний презент для будь-кого та на будь-який <br /> випадок.
          </h3>
          <button 
            className="bg-primary rounded-[80px] text-white w-[260px] h-[60px] font-medium text-[16px] leading-[120%] cursor-pointer transition-all duration-200 hover:opacity-80">
            До магазину
          </button>
        </div>
      </div>
    </div>
  )
}
