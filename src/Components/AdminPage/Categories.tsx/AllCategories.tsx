import { useEffect, useState } from "react";

/* eslint-disable react/react-in-jsx-scope */
export const AllCategories = () => {
  const [categories, setCategories] = useState<{ id: number; name: string; description: string }[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://ec2-44-203-84-198.compute-1.amazonaws.com/categories',
          {
            method: 'GET',
          }
        );

        if (!response.ok) {
          throw new Error('Помилка при завантаженні');
        }

        const data = await response.json();
        setCategories(data.content);
      } catch (error) {
        console.error('Помилка логіну:', error);
        setError('Не вдалося завантажити категорії');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Усі категорії</h3>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {categories.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">{item.name}</h4>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
