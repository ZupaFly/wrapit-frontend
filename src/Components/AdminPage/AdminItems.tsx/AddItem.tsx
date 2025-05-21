import { RootState } from '../../../redux/store';
import React, { useState } from "react";
import { useSelector } from "react-redux";

const initialCategoriesID = [1, 2, 3];

export const AddItem = () => {
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    price: undefined as number | undefined,
    mainImageUrl: '',
    categoriesIds: [] as number[],
    quantity: undefined as number | undefined,
  });

  const user = useSelector((state: RootState) => state.user);

  const [availableCategories, setAvailableCategories] = useState(initialCategoriesID);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) || 0 : value,
    }));
  };

  const handleCategoryClick = (categoryId: number) => {
    setItemData((prev) => ({
      ...prev,
      categoriesIds: prev.categoriesIds.includes(categoryId) 
        ? prev.categoriesIds 
        : [...prev.categoriesIds, categoryId],
    }));
    setAvailableCategories(prev => prev.filter(id => id !== categoryId));
  };

  const handleRemoveCategory = (categoryId: number) => {
    setItemData((prev) => ({
      ...prev,
      categoriesId: prev.categoriesIds.filter((id) => id !== categoryId),
    }));
    setAvailableCategories((prev) => [...prev, categoryId].sort());
  };

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = user.token;

    try {
      const response = await fetch('http://ec2-44-203-84-198.compute-1.amazonaws.com/items', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: itemData.name,
          description: itemData.description,
          price: itemData.price,
          mainImageUrl: itemData.mainImageUrl,
          imageUrls: [],
          categoriesIds: itemData.categoriesIds,
          quantity: itemData.quantity
        }),
      });

      if (!response.ok) {
        throw new Error("Помилка при завантаженні!");
      }

      const result = await response.json();
      alert("Товар успішно додано!");
      console.log("Server response:", result);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Помилка при завантаженні товару");
    }
  }

  return (
    <div className="p-6">
      <h3 className="text-4xl mb-10 font-bold">ДОДАТИ ТОВАР</h3>
      <div className="flex gap-20">
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="text-gray-90 text-[16px] font-normal mb-1 block">Назва товару</label>
            <input
              type="text"
              required
              name="name"
              value={itemData.name}
              onChange={handleFormChange}
              className="px-4 border border-gray-20 rounded-[94px] w-[500px] h-10"
            />
          </div>

          <div>
            <label className="text-gray-90 text-[16px] font-normal mb-1 block">Опис товару</label>
            <textarea
              required
              name="description"
              value={itemData.description}
              onChange={handleFormChange}
              className="px-4 border border-gray-20 rounded-[12px] w-[500px] h-32 resize-y"
            />
          </div>

          <div>
            <label className="text-gray-90 text-[16px] font-normal mb-1 block">Ціна</label>
            <div className="relative">
              <input
                type="number"
                required
                name="price"
                min="0"
                value={itemData.price || ''}
                onChange={handleFormChange}
                className="px-4 pr-12 border border-gray-20 rounded-[94px] w-[500px] h-10"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                грн
              </span>
            </div>
          </div>

          <div>
            <label className="text-gray-90 text-[16px] font-normal mb-1 block">Вибрані категорії</label>
            <div className="flex gap-2 flex-wrap min-h-8">
              {itemData.categoriesIds.length > 0 ? (
                itemData.categoriesIds.map((categoryId) => (
                  <span
                    key={categoryId}
                    className="bg-blue-200 px-3 py-1 rounded-full cursor-pointer flex items-center"
                    onClick={() => handleRemoveCategory(categoryId)}
                  >
                    {categoryId} ✖
                  </span>
                ))
              ) : (
                <span className="text-gray-400">Не вибрано жодної категорії</span>
              )}
            </div>
          </div>

          <div>
            <label className="text-gray-90 text-[16px] font-normal mb-1 block">Посилання на фото продукту</label>
            <input
              type="text"
              name="mainImageUrl"
              value={itemData.mainImageUrl}
              onChange={handleFormChange}
              required
              className="px-4 py-1 border border-gray-20 rounded-[94px] w-[500px] h-10"
            />
          </div>
          
          <div>
            <label className="text-gray-90 text-[16px] font-normal mb-1 block">Кількість товару</label>
            <input
              type="number"
              name="quantity"
              min="0"
              value={itemData.quantity || ''}
              onChange={handleFormChange}
              required
              className="px-4 py-1 border border-gray-20 rounded-[94px] w-[500px] h-10"
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Додати товар
          </button>
        </form>

        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Доступні категорії</h3>
          <div className="flex flex-wrap gap-2">
            {availableCategories.length > 0 ? (
              availableCategories.map((categoryId) => (
                <span
                  key={categoryId}
                  className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"
                  onClick={() => handleCategoryClick(categoryId)}
                >
                  {categoryId}
                </span>
              ))
            ) : (
              <span className="text-gray-400">Всі категорії вибрані</span>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-4xl mt-12 mb-6 font-bold">Прев&apos;ю</h3>
      <div className="flex gap-11 mb-6">
        <div className="flex flex-col gap-6 w-[400px]">
          {itemData.mainImageUrl && (
            <img 
              src={itemData.mainImageUrl} 
              alt="Прев'ю товару" 
              className="rounded-lg w-full h-64 object-cover"
              // onError={(e) => {
              //   (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400';
              // }}
            />
          )}
          <div className="flex flex-row justify-between">
            <h3 className="text-gray-700 truncate max-w-[200px]">{itemData.name || "Назва товару"}</h3>
            {itemData.price !== undefined && (
              <h3 className="text-gray-900 font-medium">{itemData.price} грн</h3>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-6 w-[800px] h-[250px]">
          {itemData.mainImageUrl && (
            <img 
              src={itemData.mainImageUrl} 
              alt="Прев'ю товару" 
              className="rounded-lg h-[250px] w-[250px] object-cover"
              // onError={(e) => {
              //   (e.target as HTMLImageElement).src = 'https://via.placeholder.com/250';
              // }}
            />
          )}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-gray-900 text-2xl font-normal mb-2">
                {itemData.name || "Назва товару"}
              </h3>
              <p className="text-gray-700 text-base font-normal">
                {itemData.description || "Опис товару"}
              </p>
            </div>
            <div className="flex justify-end">
              {itemData.price !== undefined && (
                <h3 className="text-gray-1000 text-3xl font-medium">
                  {itemData.price} грн
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};