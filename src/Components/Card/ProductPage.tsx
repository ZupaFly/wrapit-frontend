/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../../types/Product";
import { StarIcon } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  mainImageUrl: string;
  quantity: number;
}

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://ec2-44-203-84-198.compute-1.amazonaws.com/items/${id}`);
        if (!response.ok) throw new Error("Не вдалося завантажити товар");

        const data = await response.json();
        setProduct(data);
        console.log("Основний продукт:", data);

        const rel = await fetch("http://ec2-44-203-84-198.compute-1.amazonaws.com/items?page=0&size=3");
        const relData = await rel.json();
        setRelated(relData.content || []);
        console.log("Додаткові продукти:", relData.content);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = (item: CartItem) => {
    const existingCart = localStorage.getItem("cart");
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    const existingItem = cart.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар додано до кошика!");
  };

  if (loading) return <div className="text-center mt-20">Завантаження...</div>;
  if (!product) return <div className="text-center mt-20 text-red-500">Товар не знайдено</div>;

  return (
    <div className="p-10 text-gray-100">
      <button onClick={() => navigate(-1)} className="text-sm underline mb-4">
        ← Назад
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <img
          src={product.mainImageUrl}
          alt={product.name}
          className="w-full max-w-md rounded-xl shadow-lg"
        />

        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-3xl font-bold uppercase">{product.name}</h1>
            <div className="flex items-center gap-2">
              <span className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    size={20}
                    className={star <= Math.round(product.averageRating || 0) 
                      ? "text-yellow-400 fill-current" 
                      : "text-gray-300 fill-current"
                    }
                  />
                ))}
              </span>
              <span className="text-sm text-gray-300">
                ({product.totalReviews || 0} відгуків)
              </span>
            </div>
          <p>{product.description}</p>
          <p className="text-2xl font-bold text-white">{product.price} ГРН</p>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-fit"
            onClick={() =>
              handleAddToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                mainImageUrl: product.mainImageUrl,
                quantity: 1,
              })
            }
          >
            У кошик
          </button>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-14">
          <h2 className="text-2xl font-semibold mb-4">Відгуки про продукт</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {product.reviews.map((review) => (
              <div key={review.reviewId} className="bg-gray-50 p-4 rounded-xl text-white">
                <div className="text-[16px]">{review.userName}</div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      size={16}
                      className={star <= Math.round(review.rating) ? "text-yellow-400 fill-current" : "text-gray-300 fill-current"}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Вам може сподобатись</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.mainImageUrl}
                  alt={item.name}
                  className="w-full h-44 object-cover mb-3"
                />
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm mt-1">{item.price} грн</div>
                <button
                  className="mt-2 bg-purple-600 text-white px-3 py-1 rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      description: item.description,
                      mainImageUrl: item.mainImageUrl,
                      quantity: 1,
                    });
                  }}
                >
                  У кошик
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
