import React, { useState } from "react";

export const AddItem = () => {
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    price: '',
    mainImageUrl: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setItemData((prev) => ({ ...prev, mainImageUrl: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!itemData.mainImageUrl) {
      alert("Будь ласка, виберіть фото!");
      return;
    }

    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("description", itemData.description);
    formData.append("price", itemData.price);
    formData.append("mainImageUrl", itemData.mainImageUrl);

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
          <h3 className="text-gray-90 text-[16px] font-normal mb-1">
            Опис товару
          </h3>
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
          <input
            type="text"
            required
            name="price"
            value={itemData.price}
            onChange={handleFormChange}
            className="px-4 border border-gray-20 rounded-[94px] w-[500px] h-10"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-gray-90 text-[16px] font-normal mb-1">Додати фото продукту</h3>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="px-4 py-1 border border-gray-20 rounded-[94px] w-[250px] h-10 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="my-4 px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
        >
          Додати товар
        </button>
      </form>
    </div>
    <h3 className="text-[50px] mb-3">Прев&apos;ю</h3>
      <div className="flex gap-11 mb-6">
        <div className="flex flex-col gap-6 w-[400px]">
          {preview && 
          <img src={preview} alt="Прев'ю" className="rounded-[8px] w-100 h-100 object-cover" />}
          <div className="flex flex-row justify-between">
            <h3 className="text-gray-70">{itemData.name}</h3>
            <h3 className="text-gray-90">{itemData.price}</h3>
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
              <h3 className="text-gray-100 text-[32px] font-medium">{itemData.price}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
