/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";

export interface FiltersType {
  minPrice: number;
  maxPrice: number;
  categories: string[];
}

export const Filters = ({ 
  isVisible,
  onApplyFilters,
  initialFilters,
  onResetFilters
}: {
  isVisible: boolean;
  onApplyFilters: (filters: FiltersType) => void;
  initialFilters?: FiltersType;
  onResetFilters?: () => void;
}) => {
  const [minPrice, setMinPrice] = useState<number>(initialFilters?.minPrice || 100);
  const [maxPrice, setMaxPrice] = useState<number>(initialFilters?.maxPrice || 5000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters?.categories || []);

  const categories = [
    { ua: "Для чоловіків", en: "man" },
    { ua: "Для жінок", en: "woman" },
    { ua: "Для дітей", en: "kids" },
    { ua: "Для підлітків", en: "teenager" },
    { ua: "Для пар", en: "couple" },
    { ua: "Для керівника", en: "boss" },
    { ua: "Для батьків", en: "parents" },
    { ua: "Для друга", en: "friend" },
    { ua: "Персоналізовані", en: "personal" },
    { ua: "Без персоналізації", en: "impersonal" },
    { ua: "Персонажі", en: "characters" },
    { ua: "Неперсоналізовані", en: "unpersonalized" },
    { ua: "Свята", en: "holiday" },
    { ua: "Універсальні", en: "universal" },
    { ua: "Активний відпочинок", en: "active" },
    { ua: "Для бізнесу", en: "business" },
    { ua: "Творчість", en: "creative" },
    { ua: "Для дому", en: "home" },
    { ua: "Спорт", en: "sport" },
    { ua: "Для авто", en: "cars" }
  ];

  // Синхронизация с initialFilters
  useEffect(() => {
    if (initialFilters) {
      setMinPrice(initialFilters.minPrice);
      setMaxPrice(initialFilters.maxPrice);
      setSelectedCategories(initialFilters.categories);
    }
  }, [initialFilters]);

  const toggleCategory = (categoryEn: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryEn)
        ? prev.filter(c => c !== categoryEn)
        : [...prev, categoryEn]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      minPrice,
      maxPrice,
      categories: selectedCategories
    });
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setMinPrice(100);
    setMaxPrice(5000);
    if (onResetFilters) {
      onResetFilters();
    } else {
      onApplyFilters({
        minPrice: 100,
        maxPrice: 5000,
        categories: []
      });
    }
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
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">Категорія</h4>
          {selectedCategories.length > 0 && (
            <button 
              onClick={handleReset}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Скасувати всі
            </button>
          )}
        </div>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {categories.map((category) => (
            <div key={category.en} className="flex items-center">
              <input
                type="checkbox"
                id={category.en}
                checked={selectedCategories.includes(category.en)}
                onChange={() => toggleCategory(category.en)}
                className="mr-2"
              />
              <label htmlFor={category.en} className="cursor-pointer">
                {category.ua}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          onClick={handleApply}
        >
          Застосувати
        </button>
        <button 
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition-colors"
          onClick={handleReset}
        >
          Скинути
        </button>
      </div>
    </div>
  );
};
