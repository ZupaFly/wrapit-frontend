import { ChangeEvent, useState } from "react"

/* eslint-disable react/react-in-jsx-scope */
export const AddCategory = () => {
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });

  const [error, setError] = useState('');

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

  const categoryRequest = {
    name: category.name.trim(),
    description: category.description.trim(),
  }

  console.log(categoryRequest);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://ec2-44-203-84-198.compute-1.amazonaws.com/categories', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(categoryRequest),
      });

      if(!response.ok) {
        throw new Error('Помилка при додаванні категорії')
      }

      alert('Категорію успішно додано')
    } catch (error) {
      console.error("Upload error:", error);
      alert("Помилка при завантаженні товару");
    }

    setCategory({ name: '', description: '' });
    setError('');
  };

  return (
    <div>
      <h3 className="text-[50px] mb-10 uppercase">ДОДАТИ категорію</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-6">
          <h4 className="text-gray-90 text-[16px] font-normal mb-1">Введіть назву категорії</h4>
          <input 
            className="px-4 border border-gray-20 rounded-[94px] w-[500px] h-10"
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
            className="px-4 border border-gray-20 rounded-[94px] w-[500px] h-10"
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

        <button
          type="submit"
          className="my-4 px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
        >
          Додати категорію
        </button>
      </form>
    </div>
  );
};
