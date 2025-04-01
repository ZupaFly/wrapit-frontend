/* eslint-disable react/react-in-jsx-scope */

export const Header = () => {
  return (
    <div>

      <div>
        <div className="flex flex-col lg:pl-[317px] px-6 mt-5">
          <h2 className="text-gray-100 uppercase mb-4 font-medium text-[40px] max-[1024px]:text-[24px] max-[1024px]:mb-2">про нас</h2>
          <h3 
            className="w-[560px] max-w-full mb-7 font-normal text-[20px] leading-[140%]">
              Ми віримо, що кожен подарунок – це не просто річ, а особливий момент радості та турботи. Саме тому наш сервіс допомагає вам швидко та легко знайти ідеальний презент для будь-кого та на будь-який  випадок.
          </h3>
          <button 
            className="bg-primary rounded-[80px] text-white w-[260px] h-[60px] font-medium text-[16px] leading-[120%] cursor-pointer transition-all duration-200 hover:opacity-80 mb-10">
            До магазину
          </button>
        </div>
      </div>
    </div>
  )
}
