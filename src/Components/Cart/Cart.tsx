/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import closeButton from '../../image/icons/Close_Button.png';
import { Link } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  mainImageUrl: string;
  quantity: number;
}

export const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const updateLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    updateLocalStorage(updatedCart);
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
  };

  const checkAvailableQuantity = async (
    itemId: number,
    desiredQuantity: number
  ): Promise<boolean> => {
    try {
      const res = await fetch(`http://ec2-44-203-84-198.compute-1.amazonaws.com/items/${itemId.toString()}`);
      if (!res.ok) throw new Error('Помилка при отриманні товару');
      const item = await res.json();

      console.log("Продукт у кошику:",item);
      return item.quantity >= desiredQuantity;
    } catch (error) {
      console.error('Помилка перевірки кількості:', error);
      return false;
    }
  };

  const handleChangeQuantity = async (id: number, delta: number) => {
    const currentItem = cartItems.find(item => item.id === id);
    if (!currentItem) return;

    const newQuantity = currentItem.quantity + delta;
    if (newQuantity < 1) return;

    setLoading(true);
    const isAvailable = await checkAvailableQuantity(id, newQuantity);
    setLoading(false);

    if (!isAvailable) {
      alert('Недостатньо товару на складі');
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateLocalStorage(updatedCart);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="px-10 pt-16 pb-24 min-h-screen text-gray-900">
      <h2 className="text-[48px] font-bold uppercase mb-8">Кошик</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Ваш кошик порожній.</p>
      ) : (
        <div className='flex justify-between'>
          <div className="flex flex-col gap-6 mb-10">
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-row gap-6 w-[800px] h-[250px]">
                <img
                  src={item.mainImageUrl}
                  alt={item.name}
                  className="rounded-lg h-[250px] w-[250px] object-cover"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div className='flex justify-between'>
                    <h3 className="text-gray-900 text-2xl font-normal mb-2">{item.name}</h3>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="w-6 h-6 cursor-pointer bg-center bg-no-repeat bg-contain"
                      style={{ backgroundImage: `url(${closeButton})` }}
                      disabled={loading}
                    />
                  </div>
                  <h3 className="text-gray-900 text-2xl font-normal mb-2">{item.description || 'No description'}</h3>
                  <div className="flex justify-between">
                    <div className='flex items-center gap-4'>
                      <button
                        onClick={() => handleChangeQuantity(item.id, -1)}
                        className="bg-gray-200 px-3 py-1 rounded-full text-xl cursor-pointer"
                        disabled={loading}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleChangeQuantity(item.id, 1)}
                        className="bg-gray-200 px-3 py-1 rounded-full text-xl cursor-pointer"
                        disabled={loading}
                      >
                        +
                      </button>
                    </div>
                    <h3 className="text-gray-1000 text-3xl font-medium">{item.price} грн </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col border rounded-[40px] p-4 h-fit">
            <h3 className='text-gray-100 text-[32px] font-medium mb-4'>До сплати</h3>
            <div className="text-lg mb-6">
              <div className='flex justify-between mb-4'>
                <h3 className='font-normal text-[24px] text-gray-70'>Товарів обрано:</h3>
                <h3 className='font-normal text-[24px] text-gray-70'>{totalQuantity}</h3> 
              </div>

              <div className='flex justify-between'>
                <h3 className='font-normal text-[24px] text-gray-100'>Загальна сума:</h3>
                <h3 className='font-normal text-[24px] text-gray-100' >{totalPrice} грн</h3>
              </div>
            </div>
            <div className='flex flex-col w-120 p-4'>
              <Link to='/order'
                  className="flex items-center justify-center bg-primary text-white h-12 px-8 rounded-[80px] cursor-pointer hover:bg-gray-800 transition mb-10 text-center"
                >
                  Оформити замовлення
              </Link>
              <button
                onClick={handleClearCart}
                className="bg-error text-white h-12 px-8 rounded-[80px] cursor-pointer hover:bg-gray-800 transition mb-10"
                disabled={loading}
              >
                Очистити кошик
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
