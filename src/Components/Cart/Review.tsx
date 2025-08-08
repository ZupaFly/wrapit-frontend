/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const MAX_RATING = 5;

const Star = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
  <svg
    onClick={onClick}
    className={`w-6 h-6 cursor-pointer ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.973c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.287-3.973a1 1 0 00-.364-1.118L2.046 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
  </svg>
);

export const Review = () => {
  const { id } = useParams<{ id: string }>(); // id товару з URL
  const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const token = user.token;

  const [serviceRating, setServiceRating] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState<"yes" | "no" | "">( "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  console.log(productRating);
  console.log(id);

  const handleStarClick = (setRating: (val: number) => void, val: number) => {
    setRating(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!id) {
      setError("Немає ID товару.");
      return;
    }
    if (serviceRating === 0 || productRating === 0) {
      setError("Будь ласка, оцініть і сервіс, і товари.");
      return;
    }
    if (recommend === "") {
      setError("Будь ласка, виберіть, чи порекомендуєте сервіс.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://ec2-44-203-84-198.compute-1.amazonaws.com/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          // userName: user.firstName,
          rating: productRating,
          comment: comment,
          itemId: Number(id),
          // userName: "Користувач", // або отримати реальне ім'я, якщо є
          // serviceRating, // можна додати, якщо сервер підтримує
          // recommend: recommend === "yes",
        }),
        
      });

      console.log(
          'userName:', user.firstName,
          'rating:', productRating,
          'comment:', comment,
          'itemId:', Number(id),
      )

      if (!response.ok) {
        throw new Error(`Помилка: ${response.statusText}`);
      }

      alert("Дякуємо за ваш відгук!");
      navigate("/shop"); // повертаємось у магазин або іншу сторінку
    } catch (err) {
      setError("Не вдалося відправити відгук. Спробуйте пізніше.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-600 hover:text-gray-900"
      >
        ← Назад
      </button>

      <h1 className="text-3xl font-bold mb-6">ЗАЛИШТЕ ВІДГУК</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">
            Як ви оціните роботу нашого сервісу?
          </label>
          <div className="flex space-x-1">
            {[...Array(MAX_RATING)].map((_, i) => (
              <Star
                key={i}
                filled={i < serviceRating}
                onClick={() => handleStarClick(setServiceRating, i + 1)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Як ви оціните якість товарів?
          </label>
          <div className="flex space-x-1">
            {[...Array(MAX_RATING)].map((_, i) => (
              <Star
                key={i}
                filled={i < productRating}
                onClick={() => handleStarClick(setProductRating, i + 1)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Будемо раді розгорнутому відгуку!
          </label>
          <input
            type="text"
            placeholder="Поділіться своїми враженнями!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <fieldset>
          <legend className="font-semibold mb-2">
            Чи порекомендуєте ви наш сервіс друзям?
          </legend>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="recommend"
                value="yes"
                checked={recommend === "yes"}
                onChange={() => setRecommend("yes")}
                required
              />
              <span>Так</span>
            </label>

            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="recommend"
                value="no"
                checked={recommend === "no"}
                onChange={() => setRecommend("no")}
                required
              />
              <span>Ні</span>
            </label>
          </div>
        </fieldset>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Відправка..." : "Надіслати"}
        </button>
      </form>
    </div>
  );
};
