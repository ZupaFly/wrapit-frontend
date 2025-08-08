import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Card } from "../../Card/Card";

/* eslint-disable react/react-in-jsx-scope */
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  mainImageUrl: string;
  categoriesIds: number[];
  quantity: number;
}

export const AllItem = () => {
  const [items, setItems] = useState<Item[]>([]);
  const user = useSelector((state: RootState) => state.user);

  // Загрузка товаров и категорий
  useEffect(() => {
    const fetchData = async () => {
      const token = user.token;
      if (!token) return;

      try {
        const [itemsResponse, categoriesResponse] = await Promise.all([
          fetch('http://ec2-44-203-84-198.compute-1.amazonaws.com/items?size=100', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          categoryIds: [],
          size: 100,
          page: 0,
          sort: [],
        }),
          }),
          fetch('http://ec2-44-203-84-198.compute-1.amazonaws.com/categories', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
        ]);

        if (!itemsResponse.ok) throw new Error('Не вдалося завантажити товари');
        if (!categoriesResponse.ok) throw new Error('Не вдалося завантажити категорії');

        const itemsData = await itemsResponse.json();

        setItems(itemsData.content);
      } catch (err) {
        console.error('Помилка завантаження:', err);
      }
    };

    fetchData();
  }, [user.token]);

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <Card
              id={item.id}
              name={item.name}
              price={item.price}
              mainImageUrl={item.mainImageUrl}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};