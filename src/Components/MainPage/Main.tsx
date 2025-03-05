export const Main = () => {
  return (
    <div className="grid grid-cols-6 grid-rows-2 gap-[24px] pl-10 pr-10 mb-14">
      <div className="flex flex-col gap-4 col-span-2 rounded-[40px] bg-blue-for-card-and-states p-6">
        <div>
          <h2 className="text-white text-[32px] leading-[130%] font-medium mb-4">Великий вибір подарунків</h2>
          <h3 className="text-white text-[16px] leading-[140%] font-normal">Знайдіть ідеальний подарунок для будь-якої нагоди! У нас широкий асортимент, що включає ексклюзивні, креативні та персоналізовані варіанти для всіх вікових категорій та інтересів.</h3>
        </div>
        <div className="w-[100%] h-[198px] bg-cover bg-center bg-[url('/src/image/main/gift-main.png')] rounded-[32px]">
        </div>
      </div>

      <div className="flex flex-col-reverse gap-4 col-span-2 rounded-[40px] bg-violet-for-card-and-states p-6">
        <div>
          <h2 className="text-white text-[32px] leading-[130%] font-medium mb-4">Декілька варіантів оплати</h2>
          <h3 className="text-white text-[16px] leading-[140%] font-normal">Оплачуйте так, як вам зручно! Приймаємо банківські картки, електронні гаманці та післяплату, щоб кожен міг обрати найзручніший спосіб покупки.
          </h3>
        </div>
        <div className="w-[100%] h-[100%] bg-cover bg-center bg-[url('/src/image/main/payment-main.png')] rounded-[32px]">
        </div>
      </div>

      <div className="flex flex-col gap-4 col-span-2 row-span-2 rounded-[40px] bg-blue-for-card-and-states p-6">
        <div>
          <h2 className="text-white text-[32px] leading-[130%] font-medium mb-4">Допомога у виборі подарунку за допомогою опитування</h2>
          <h3 className="text-white text-[16px] leading-[140%] font-normal">Не знаєте, що подарувати? Наш інтуїтивний генератор подарунків підбере найкращі варіанти на основі ваших відповідей! Просто пройдіть коротке опитування – і ми знайдемо ідеальний сюрприз.</h3>
        </div>
        <div className="w-[100%] h-[100%] bg-cover bg-center bg-[url('/src/image/main/consulting-main.png')] rounded-[32px]">
      </div>
      </div>

      <div className="flex flex-row gap-4 col-span-4 rounded-[40px] bg-violet-for-card-and-states p-6">
        <div>
          <h2 className="text-white text-[32px] leading-[130%] font-medium mb-4">Швидка доставка замовлення</h2>
          <h3 className="text-white text-[16px] leading-[140%] font-normal">Ми гарантуємо оперативну доставку,<br /> щоб ваш подарунок прибув вчасно! <br />Обирайте зручний спосіб отримання: кур'єрська доставка, самовивіз або <br /> електронні сертифікати в лічені хвилини.</h3>
        </div>
      <div className="w-[100%] h-[100%] bg-cover bg-center bg-[url('/src/image/main/delivery-truck-main.png')] rounded-[32px]">
      </div>
      </div>

    </div>
  )
}