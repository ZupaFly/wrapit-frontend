import { useState } from "react";

export interface FiltersType {
  minPrice: number;
  maxPrice: number;
  categories: string[];
}

/* eslint-disable react/react-in-jsx-scope */
export const Filters = ({ 
  isVisible,
  onApplyFilters
}: {
  isVisible: boolean;
  onApplyFilters: (filters: FiltersType) => void;
}) => {
  const [minPrice, setMinPrice] = useState<number>(100);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories: string[] = [
    "Тюмології",
    "Книги",
    "Спорт",
    "Подорожі",
    "Пеймінг",
    "Настільні ігри",
    "Творчість",
    "Фотографія",
    "Кулінарія",
    "Догляд за собою",
    "Без товари",
    "Для дому",
    "Для авто",
    "Сертифікати",
    "DIY-набори"
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      minPrice,
      maxPrice,
      categories: selectedCategories
    });
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Фільтри</h3>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Ціна</h4>
        <div className="flex justify-between mb-2">
          <span>{minPrice} грн</span>
          <span>{maxPrice} грн</span>
        </div>
        <div className="flex space-x-4">
          <input
            type="range"
            min="100"
            max="5000"
            value={minPrice}
            onChange={(e) => setMinPrice(parseInt(e.target.value))}
            className="w-full"
          />
          <input
            type="range"
            min="100"
            max="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Категорія</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="mr-2"
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={handleApply}
      >
        Застосувати
      </button>
    </div>
  );
};
