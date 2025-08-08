import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store';

/* eslint-disable react/react-in-jsx-scope */
export const AllCategories = () => {
  const [categories, setCategories] = useState<{ id: number; name: string; description: string }[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  });
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = user.token;
      setLoading(true);
      try {
        const response = await fetch(
          `http://ec2-44-203-84-198.compute-1.amazonaws.com/categories?page=${pageInfo.currentPage}&size=1000`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to load categories');
        }

        const data = await response.json();
        setCategories(data.content);
        setPageInfo({
          currentPage: data.number,
          totalPages: data.totalPages,
          totalElements: data.totalElements
        });
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [pageInfo.currentPage, user.token]);

  const handlePreviousPage = () => {
    if (pageInfo.currentPage > 0) {
      setPageInfo(prev => ({...prev, currentPage: prev.currentPage - 1}));
    }
  };

  const handleNextPage = () => {
    if (pageInfo.currentPage < pageInfo.totalPages - 1) {
      setPageInfo(prev => ({...prev, currentPage: prev.currentPage + 1}));
    }
  };

  return (
    <div className="p-4">
      <h3 className="mb-4">All Categories</h3>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4 mb-4">
        {categories.map((item) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg shadow-md">
            <h4>Item ID: {item.id}</h4>
            <h4>Item name: {item.name}</h4>
            <p className="text-gray-600">Item description: {item.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={handlePreviousPage}
          disabled={pageInfo.currentPage === 0 || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pageInfo.currentPage + 1} of {pageInfo.totalPages}
        </span>
        <button 
          onClick={handleNextPage}
          disabled={pageInfo.currentPage >= pageInfo.totalPages - 1 || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};