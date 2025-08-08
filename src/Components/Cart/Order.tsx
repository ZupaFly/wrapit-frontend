/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  mainImageUrl: string;
  quantity: number;
}

export const Order = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderedItems, setOrderedItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [useUserData, setUseUserData] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      setCartItems(parsedCart);
      const totalSum = parsedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(totalSum);
    }
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setUseUserData(checked);

    if (checked && user) {
      setFormData({
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email || '',
      });
    } else {
      setFormData({ fullName: '', email: '' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setOrderPlaced(true);
    setOrderedItems(cartItems);
    setCartItems([]);
    setTotal(0);
    localStorage.removeItem('cart');
    localStorage.setItem('lastOrder', JSON.stringify(cartItems));
  };

  if (orderPlaced) {
    return (
      <div className="px-10 pt-16 min-h-screen text-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center">Дякуємо за ваше замовлення!</h2>
        <p className="text-center text-lg text-gray-70 mb-10">
          З вами у найближчий час зв’яжеться наш оператор.
        </p>
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-center">Не бажаєте залишити відгук?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {orderedItems.map(item => (
              <div key={item.id} className="flex flex-col items-center">
                <img src={item.mainImageUrl} className="w-[165px] h-[165px] object-cover rounded mb-2" />
                <p className="text-center text-gray-80">{item.name}</p>
                <Link to={`/review/${item.id}`} className="text-blue-600 text-sm underline mt-1">
                  Залишити відгук
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <a href="/shop" className="inline-block bg-primary text-white px-8 py-3 rounded-[80px] hover:bg-gray-800 transition">
            Назад до магазину
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 pt-16 min-h-screen text-gray-900">
      <h2 className="text-3xl font-bold mb-6">Оформлення замовлення</h2>
      <div className='grid grid-cols-12'>
        <div className='flex flex-col col-span-5'>
          <div className='mb-10 border border-gray-20 rounded-[16px] p-4'>
            <h3 className='font-medium text-[32px] leading-[130%] text-gray-90 mb-4'>Дані замовника</h3>
            <form className="flex flex-col col-span-2">
              <div className='mb-6'>
                <h5 className="text-gray-90 text-[16px] font-normal mb-1">ПІБ</h5>
                <input 
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className='px-4 border rounded-[94px] w-full h-10 placeholder:text-gray-60 text-gray-90 placeholder:text-[16px] placeholder:font-normal border-gray-20'
                  placeholder="Введіть ваше ПІБ"
                />
              </div>
              <div className='mb-6'>
                <h5 className="text-gray-90 text-[16px] font-normal mb-1">Ваш email</h5>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className='px-4 border rounded-[94px] w-full h-10 placeholder:text-gray-60 text-gray-90 placeholder:text-[16px] placeholder:font-normal border-gray-20'
                  placeholder="email@example.com"
                />
              </div>
              <div className='flex items-center'>
                <input
                  type="checkbox"
                  checked={useUserData}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 accent-violet-500 rounded-full"
                />
                <h3 className='pl-4'>Дані з мого кабінету</h3>
              </div>
            </form>
          </div>

          <div className='mb-10 border border-gray-20 rounded-[16px] p-4'>
            <h3 className='font-medium text-[32px] leading-[130%] text-gray-90 mb-4'>Доставка та оплата</h3>
            <form className="flex flex-col col-span-2">
              <div className='mb-6'>
                <h5 className="text-gray-90 text-[16px] font-normal mb-6">Доставка</h5>
                <div className='flex flex-col'>
                  <label className="inline-flex items-center space-x-2 cursor-pointer mb-4">
                    <input type="checkbox" className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-gray-60 checked:border-transparent focus:outline-none" />
                    <span className="text-gray-80 text-[16px] font-normal">Самовивіз з магазину</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer mb-4">
                    <input type="checkbox" className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-gray-60 checked:border-transparent focus:outline-none" />
                    <span className='text-gray-80 text-[16px] font-normal'>Доставка у відділення пошти</span>
                  </label>
                </div>
              </div>
              <div>
                <h5 className="text-gray-90 text-[16px] font-normal mb-6">Метод оплати</h5>
                <div className='flex flex-col'>
                  <label className="inline-flex items-center space-x-2 cursor-pointer mb-4">
                    <input type="checkbox" className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-gray-60 checked:border-transparent focus:outline-none" />
                    <span className='text-gray-80 text-[16px] font-normal'>Apple Pay</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer mb-4">
                    <input type="checkbox" className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-gray-60 checked:border-transparent focus:outline-none" />
                    <span className='text-gray-80 text-[16px] font-normal'>Google Pay</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="appearance-none w-4 h-4 border border-gray-400 rounded-full checked:bg-gray-60 checked:border-transparent focus:outline-none" />
                    <span className='text-gray-80 text-[16px] font-normal'>Накладний платіж при отриманні</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <p className="col-span-7">Корзина порожня.</p>
        ) : (
          <div className='col-start-7 col-span-6'>
            <div className='flex flex-col mb-10 border border-gray-20 rounded-[16px] p-4'>
              <h3 className='text-gray-90 text-[32px] font-medium mb-4'>Ваше замовлення</h3>
              <h4 className='text-gray-70 text-[16px] font-normal mb-6'>{cartItems.length} товари</h4>
              {cartItems.map((item) => (
                <div key={item.id} className="mb-4 flex items-center gap-4">
                  <img src={item.mainImageUrl} className="w-[165px] h-[165px] object-cover rounded" />
                  <div>
                    <h3 className='text-gray-90 text-[24px] font-normal'>{item.name}</h3>
                    <p className='text-gray-70 text-[16px] font-normal'>Кількість: {item.quantity}</p>
                    <p className='text-gray-100 text-[32px] font-medium'>Ціна: {item.price} грн</p>
                  </div>
                </div>
              ))}
              <div className='flex justify-between'>
                <h4 className='text-[24px] text-gray-100 font-normal'>Загальна сума:</h4>
                <h4 className='text-[24px] text-gray-100 font-normal'>{total} грн</h4>
              </div>
            </div>
            <button onClick={handleSubmit} className='w-full bg-primary cursor-pointer text-white h-12 px-8 rounded-[80px] hover:bg-gray-800 transition mb-10'>
              Розмістити замовлення
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
