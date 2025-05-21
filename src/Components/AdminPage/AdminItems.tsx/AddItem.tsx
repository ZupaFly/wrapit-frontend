import { RootState } from '../../../redux/store';
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from '../../Card/Card';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  mainImageUrl: string;
  categoriesIds: number[];
  quantity: number;
}

interface Category {
  id: number;
  name: string;
}

export const AddItem = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [itemData, setItemData] = useState<Omit<Item, 'id'> & { id?: number }>({
    name: '',
    description: '',
    price: 0,
    mainImageUrl: '',
    categoriesIds: [],
    quantity: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const user = useSelector((state: RootState) => state.user);

  // Загрузка товаров и категорий
  useEffect(() => {
    const fetchData = async () => {
      const token = user.token;
      if (!token) {
        setError('Користувач не авторизований');
        return;
      }

      setLoading(true);
      try {
        const [itemsResponse, categoriesResponse] = await Promise.all([
          fetch('http://ec2-44-203-84-198.compute-1.amazonaws.com/items?size=100', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch('http://ec2-44-203-84-198.compute-1.amazonaws.com/categories', {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
        ]);

        if (!itemsResponse.ok) throw new Error('Не вдалося завантажити товари');
        if (!categoriesResponse.ok) throw new Error('Не вдалося завантажити категорії');

        const itemsData = await itemsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setItems(itemsData.content);
        setAllCategories(categoriesData.content);
        setError('');
      } catch (err) {
        console.error('Помилка завантаження:', err);
        setError('Не вдалося завантажити дані з сервера');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.token]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) || 0 : value,
    }));
  };

  const handleCategoryClick = (categoryId: number) => {
    if (!itemData.categoriesIds.includes(categoryId)) {
      setItemData((prev) => ({
        ...prev,
        categoriesIds: [...prev.categoriesIds, categoryId],
      }));
    }
  };

  const handleRemoveCategory = (categoryId: number) => {
    setItemData((prev) => ({
      ...prev,
      categoriesIds: prev.categoriesIds.filter((id) => id !== categoryId),
    }));
  };

  const resetForm = () => {
    setItemData({
      name: '',
      description: '',
      price: 0,
      mainImageUrl: '',
      categoriesIds: [],
      quantity: 0,
    });
    setIsEditing(false);
    setError('');
  };

  const handleEditItem = (item: Item) => {
    setItemData({
      ...item,
      categoriesIds: item.categoriesIds || [],
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteItem = async (id: number) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цей товар?')) return;

    const token = user.token;
    try {
      const response = await fetch(`http://ec2-44-203-84-198.compute-1.amazonaws.com/items/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Не вдалося видалити товар');

      setItems((prev) => prev.filter(item => item.id !== id));
      if (isEditing && itemData.id === id) resetForm();
      alert('Товар успішно видалено');
    } catch (error) {
      console.error("Delete error:", error);
      alert("Помилка при видаленні товару");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = user.token;
    if (!token) {
      alert("Користувач не авторизований");
      return;
    }
  
    try {
      const payload = {
        name: itemData.name,
        description: itemData.description,
        price: itemData.price,
        mainImageUrl: itemData.mainImageUrl,
        categoriesIds: itemData.categoriesIds,
        quantity: itemData.quantity,
        imageUrls: [],
      };
  
      let response;
  
      if (isEditing && itemData.id) {
        response = await fetch(`http://ec2-44-203-84-198.compute-1.amazonaws.com/items/${itemData.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch('http://ec2-44-203-84-198.compute-1.amazonaws.com/items', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }
  
      if (!response.ok) throw new Error('Помилка при збереженні товару');
  
      const result = await response.json();
      alert(`Товар успішно ${isEditing ? 'оновлено' : 'додано'}!`);
  
      setItems((prev) =>
        isEditing
          ? prev.map((item) => (item.id === result.id ? result : item))
          : [...prev, result]
      );
  
      resetForm();
    } catch (error) {
      console.error("Operation error:", error);
      alert("Помилка при операції з товаром");
    }
  };

  const availableCategories = allCategories.filter(
    cat => !itemData.categoriesIds.includes(cat.id)
  );

  return (
    <div className="p-6">
      <h3 className="text-4xl mb-10 font-bold">
        {isEditing ? 'РЕДАГУВАТИ ТОВАР' : 'ДОДАТИ ТОВАР'}
      </h3>
      
      {loading && <p className="text-blue-500">Завантаження...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-20">
        {/* Форма добавления/редактирования */}
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
    {itemData.categoriesIds?.length > 0 ? (
      itemData.categoriesIds.map((categoryId) => {
        const category = allCategories?.find(c => c.id === categoryId);
        return (
          <span
            key={categoryId}
            className="bg-blue-200 px-3 py-1 rounded-full cursor-pointer flex items-center"
            onClick={() => handleRemoveCategory(categoryId)}
          >
            {category?.name || categoryId} ✖
          </span>
        );
      })
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

          <div className="flex gap-4">
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isEditing ? 'Оновити товар' : 'Додати товар'}
            </button>
            
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="mt-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Скасувати
              </button>
            )}
          </div>
        </form>

        {/* Доступные категории */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Доступні категорії</h3>
          <div className="flex flex-wrap gap-2">
            {availableCategories.length > 0 ? (
              availableCategories.map((category) => (
                <span
                  key={category.id}
                  className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </span>
              ))
            ) : (
              <span className="text-gray-400">Всі категорії вибрані</span>
            )}
          </div>
        </div>
      </div>

      {/* Превью товара */}
      <h3 className="text-4xl mt-12 mb-6 font-bold">Прев&apos;ю</h3>
      <div className="flex gap-11 mb-6">
        <div className="flex flex-col gap-6 w-[400px]">
          {itemData.mainImageUrl && (
            <img 
              src={itemData.mainImageUrl} 
              alt="Прев'ю товару" 
              className="rounded-lg w-full h-64 object-cover"
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

      {/* Список существующих товаров */}
      <h3 className="text-4xl mt-12 mb-6 font-bold">Список товарів</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <Card 
              name={item.name} 
              price={item.price} 
              mainImageUrl={item.mainImageUrl} 
            />
            <div className="flex gap-2 mt-2">
            <button
  onClick={() => {
    console.log('Item to edit:', item); // Добавьте эту строку
    handleEditItem(item);
  }}
  className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
>
  Редагувати
</button>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};