export const Questions = () => {
  return (
    <div className="grid grid-cols-6 mb-20 px-10">
      <div className="col-start-2 col-span-5">
        <ul className="mb-8">
          <li className="uppercase text-gray-100 text-[40px] font-medeum leading-[110%] border-b border-gray-50 py-8 ">01 відповідайте на кілька запитань.</li>
          <li className="uppercase text-gray-100 text-[40px] font-medeum leading-[110%] border-b border-gray-50 py-8 ">02 отримуйте найкращі варіанти.</li>
          <li className="uppercase text-gray-100 text-[40px] font-medeum leading-[110%] border-b border-gray-50 py-8 ">03 замовляйте подарунок одразу.</li>
        </ul>
      </div>

      <div className="flex items-center justify-center gap-2 border border-primary col-start-2 col-span-1 py-5 rounded-[80px] cursor-pointer hover:transition-transform hover:duration-200 hover:bg-blue-50">
          <h3 className="text-[16px] text-gray-100 font-medium leading-[120%]">Підібрати подарунок</h3>
          <img src="src\image\Questions\present.png" alt="present icon" />
        </div>
    </div>
  )
}