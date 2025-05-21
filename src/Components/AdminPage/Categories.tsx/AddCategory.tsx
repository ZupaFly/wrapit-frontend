import { ChangeEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store';

/* eslint-disable react/react-in-jsx-scope */
export const AddCategory = () => {
  const [category, setCategory] = useState({
    id: 0,
    name: '',
    description: '',
  });

  const [categories, setCategories] = useState<{ id: number; name: string; description: string }[]>([]);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = user.token;
      setLoading(true);
      try {
        const response = await fetch(
          'http://ec2-44-203-84-198.compute-1.amazonaws.com/categories',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Помилка при завантаженні категорій');
        }

        const data = await response.json();
        setCategories(data.content);
      } catch (error) {
        console.error('Помилка завантаження категорій:', error);
        setError('Не вдалося завантажити категорії');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [user.token]);

  const handleInputSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'description' && value.length > 30) {
      setError('Перевищено максимальну довжину опису (30 символів)');
      return;
    } else {
      setError('');
    }

    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = user.token;

    const categoryRequest = {
      name: category.name.trim(),
      description: category.description.trim(),
    };

    try {
      let response;
      if (isEditing) {
        // Редактирование существующей категории
        response = await fetch(`http://ec2-44-203-84-198.compute-1.amazonaws.com/categories/${category.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(categoryRequest),
        });
      } else {
        // Добавление новой категории
        response = await fetch('http://ec2-44-203-84-198.compute-1.amazonaws.com/categories', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(categoryRequest),
        });
      }

      if (!response.ok) {
        throw new Error('Помилка при операції з категорією');
      }

      const updatedCategory = await response.json();
      
      if (isEditing) {
        // Обновление списока категорий после редактирования
        setCategories(categories.map(cat => 
          cat.id === category.id ? updatedCategory : cat
        ));
      } else {
        // Новая категория в список
        setCategories([...categories, updatedCategory]);
      }

      alert(`Категорію успішно ${isEditing ? 'оновлено' : 'додано'}`);
      resetForm();
    } catch (error) {
      console.error("Operation error:", error);
      alert("Помилка при операції з категорією");
    }
  };

  const handleEdit = (categoryToEdit: { id: number; name: string; description: string }) => {
    setCategory(categoryToEdit);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цю категорію?')) {
      return;
    }

    const token = user.token;
    try {
      const response = await fetch(`http://ec2-44-203-84-198.compute-1.amazonaws.com/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Помилка при видаленні категорії');
      }

      // Удаление категории из списка
      setCategories(categories.filter(cat => cat.id !== id));
      alert('Категорію успішно видалено');
      
      // Если удаляли редактируемую категорию, сбрасываем форму
      if (isEditing && category.id === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Помилка при видаленні категорії");
    }
  };

  const resetForm = () => {
    setCategory({
      id: 0,
      name: '',
      description: '',
    });
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h3 className="text-[50px] mb-10 uppercase">
          {isEditing ? 'РЕДАГУВАТИ категорію' : 'ДОДАТИ категорію'}
        </h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-6">
            <h4 className="text-gray-90 text-[16px] font-normal mb-1">Введіть назву категорії</h4>
            <input 
              className="px-4 border border-gray-20 rounded-[94px] w-full md:w-[500px] h-10"
              type="text"
              name="name"
              onChange={handleInputSubmit}
              value={category.name}
              placeholder="назва категорії"
              required
            />
          </div>

          <div className="mb-6">
            <h4 className="text-gray-90 text-[16px] font-normal mb-1">
              Введіть опис категорії (максимум 30 символів)
            </h4>
            <input 
              className="px-4 border border-gray-20 rounded-[94px] w-full md:w-[500px] h-10"
              type="text"
              name="description"
              onChange={handleInputSubmit}
              value={category.description}
              placeholder="опис категорії"
              required
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="my-4 px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
            >
              {isEditing ? 'Оновити категорію' : 'Додати категорію'}
            </button>
            
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="my-4 px-6 py-2 bg-gray-500 text-white rounded-lg cursor-pointer"
              >
                Скасувати
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="flex-1">
        <h3 className="text-[30px] mb-6">Список категорій</h3>
        
        {loading && <p className="text-blue-500">Завантаження...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-4">
          {categories.length === 0 && !loading ? (
            <p>Немає доступних категорій</p>
          ) : (
            categories.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg shadow-md">
                <h4>{item.name}</h4>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                  >
                    Редагувати
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
