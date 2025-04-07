import React, { useRef, useState } from "react";

const initialAttributes = [
  'man', 'woman', 'kids', 'teenager', 'couple', 'boss', 'parents', 'friend',
  '500', '1000', '3000', '3000+',
  'personal', 'impersonal', 'characters', 'unpersonalized',
  'holliday', 'universal',
  'active', 'busines', 'creative', 'home',
  'sport', 'cars', 'self-development', 'alcohol', 'gadgets',
  'boardgames', 'handmade', 'cartoons', 'books', 'aesthetic',
  'practical', 'emotional', 'unique', 'exclusive', 'romantic', 'trendy',
  'colleague', 'friend',
];

export const AddItem = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    price: undefined as number | undefined,
    attributes: [] as string[],
    mainImageUrl: null as File | null,
    categoriesId: ''
  });

  const [attributesList, setAttributesList] = useState(initialAttributes);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) || 0 : value,
    }));
  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setItemData((prev) => ({ ...prev, mainImageUrl: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAttributeClick = (attribute: string) => {
    setItemData((prev) => ({
      ...prev,
      attributes: prev.attributes.includes(attribute) ? prev.attributes : [...prev.attributes, attribute],
    }));
  };

  const handleRemoveAttribute = (attribute: string) => {
    setItemData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((attr) => attr !== attribute),
    }));
    setAttributesList((prev) => [...prev, attribute]);
  };

  console.log(itemData);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!itemData.mainImageUrl) {
      alert("Будь ласка, виберіть фото!");
      return;
    }

    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("description", itemData.description);
    formData.append("price", JSON.stringify(itemData.price)); // Передаємо як JSON-об'єкт
    formData.append("attributes", JSON.stringify(itemData.attributes));
    formData.append("categoriesId", itemData.categoriesId);
    
    if (itemData.mainImageUrl) {
      formData.append("mainImageUrl", itemData.mainImageUrl);
    }

    try {
      const response = await fetch('http://ec2-44-203-84-198.compute-1.amazonaws.com/items', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Помилка при завантаженні!");
      }

      alert("Товар успішно додано!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Помилка при завантаженні товару");
    }
  }

  return (
    <div>
      <h3 className="text-[50px] mb-10">ДОДАТИ ТОВАР</h3>
      <div className="flex gap-20">
        <form className="flex flex-col" onSubmit={handleFormSubmit}>
          <div>
            <h3 className="text-gray-90 text-[16px] font-normal mb-1">Назва товару</h3>
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
            <h3 className="text-gray-90 text-[16px] font-normal mb-1">Опис товару</h3>
            <textarea
              required
              name="description"
              value={itemData.description}
              onChange={handleFormChange}
              className="px-4 border border-gray-20 rounded-[12px] w-[500px] h-32 resize-y"
            />
          </div>

          <div>
            <h3 className="text-gray-90 text-[16px] font-normal mb-1">Ціна</h3>
            <div className="relative">
              <input
                type="number"
                required
                name="price"
                value={itemData.price}
                onChange={handleFormChange}
                className="px-4 pr-12 border border-gray-20 rounded-[94px] w-[500px] h-10"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                грн
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-gray-90 text-[16px] font-normal mb-1">Вибрані атрибути</h3>
            <div className="flex gap-2 flex-wrap">
              {itemData.attributes.map((attr) => (
                <span
                  key={attr}
                  className="bg-blue-200 px-3 py-1 rounded-full cursor-pointer"
                  onClick={() => handleRemoveAttribute(attr)}
                >
                  {attr} ✖
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-gray-90 text-[16px] font-normal mb-1">Додати фото продукту</h3>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              required
              onChange={handleFileChange}
              className="px-4 py-1 border border-gray-20 rounded-[94px] w-[250px] h-10 cursor-pointer"
            />
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                setItemData((prev) => ({ ...prev, mainImageUrl: null }));
                setPreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              X
            </button>
          </div>

          <button
            type="submit"
            className="my-4 px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            Додати товар
          </button>
        </form>

        <div>
          <h3>Доступні атрибути</h3>
          <div className="flex flex-wrap gap-2">
            {attributesList.map((item, index) => (
              <span
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer"
                onClick={() => handleAttributeClick(item)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <h3 className="text-[50px] mb-3">Прев&apos;ю</h3>
      <div className="flex gap-11 mb-6">
        <div className="flex flex-col gap-6 w-[400px]">
          {preview && 
          <img src={preview} alt="Прев'ю" className="rounded-[8px] w-100 h-100 object-cover" />}
          <div className="flex flex-row justify-between">
            <h3 className="text-gray-70">{itemData.name}</h3>
            {itemData.price && <h3 className="text-gray-90">{itemData.price} грн</h3>}
          </div>
        </div>

        <div className="flex flex-row gap-6 w-[800px] h-[250px]">
          {preview && 
          <img src={preview} alt="Прев'ю" className="rounded-[8px] h-[250px] w-[250px] object-cover" />}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-gray-90 text-[24px] font-normal">{itemData.name}</h3>
              <h3 className="text-gray-70 text-[16px] font-normal">{itemData.description}</h3>
            </div>
            <div className="flex justify-end">
              {itemData.price && <h3 className="text-gray-100 text-[32px] font-medium">{itemData.price} грн</h3>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
