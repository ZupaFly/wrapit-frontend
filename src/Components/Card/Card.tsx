/* eslint-disable react/react-in-jsx-scope */
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  mainImageUrl: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  mainImageUrl: string;
  quantity: number;
}

export const Card: FC<CardProps> = ({ id, name, price, description, mainImageUrl }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Зупиняємо подію переходу по картці

    const existingCart = localStorage.getItem("cart");
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        description,
        mainImageUrl,
        quantity: 1,
      });
    }
    console.log("Додається товар:", {
  id,
  name,
  price,
  description,
  mainImageUrl,
});

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар додано до кошика!");
  };

  return (
    <div
      className="flex flex-col gap-6 mb-6 cursor-pointer"
      onClick={() => navigate(`/product/${id}`)}
    >
      <img
        src={mainImageUrl}
        alt={name}
        className="rounded-[8px] w-full h-[414px] object-cover"
      />
      <div className="flex justify-between">
        <h3 className="text-gray-70">{name}</h3>
        <h3 className="text-gray-90">{price} грн</h3>
      </div>
      <div className="relative">
        <button
          onClick={handleAddToCart}
          className="bg-primary text-white text-[16px] h-11 rounded-[80px] cursor-pointer w-[206px] absolute right-0"
        >
          У кошик
        </button>
      </div>
    </div>
  );
};
