/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface Feedback {
  feedbackId: number;
  message: string;
  userId: number;
}

export const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const url = 'http://ec2-44-203-84-198.compute-1.amazonaws.com/feedbacks?page=0&size=50';
  const user = useSelector((state: RootState) => state.user);
  const token = user.token;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('Помилка при завантаженні фідбеків');
        }
        const data = await response.json();
        setFeedbacks(data.content);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-[32px] font-bold mb-6">Відгуки користувачів</h2>

      {loading && <p>Завантаження...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-6">
        {feedbacks.map((fb) => (
          <div key={fb.feedbackId} className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white">
            <p className="text-gray-800">Повідомлення: {fb.message}</p>
            <p className="text-gray-500 text-sm mt-1">ID користувача: {fb.userId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
