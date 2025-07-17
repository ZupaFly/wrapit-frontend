/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { Filters } from "./Filters";
import { FiltersType, Product } from "../../types/Product";
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';

export const Shop = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeFilters, setActiveFilters] = useState<FiltersType>({
    minPrice: 100,
    maxPrice: 5000,
    categories: []
  });

  const itemsPerPage = 7;

  const applyClientFilters = (items: Product[], filters: FiltersType): Product[] => {
    return items.filter(item => {
      const matchesCategory =
        filters.categories.length === 0 || 
        (item.category && filters.categories.includes(item.category));

      const matchesPrice =
        item.price >= (filters.minPrice || 0) &&
        item.price <= (filters.maxPrice || Infinity);

      return matchesCategory && matchesPrice;
    });
  };

  const user = useSelector((state: RootState) => state.user);

  const fetchProducts = async (
    currentPage: number,
    filters: FiltersType = activeFilters
  ) => {
    const token = user.token;
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: (currentPage - 1).toString(),
        size: itemsPerPage.toString(),
      });

      filters.categories.forEach(category => {
        queryParams.append('category', category);
      });

      if (filters.minPrice) {
        queryParams.append('minPrice', filters.minPrice.toString());
      }
      if (filters.maxPrice) {
        queryParams.append('maxPrice', filters.maxPrice.toString());
      }

      const url = `http://ec2-44-203-84-198.compute-1.amazonaws.com/items?${queryParams.toString()}`;

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.content) throw new Error("Invalid response format");

      const newItems = currentPage === 1
        ? data.content
        : [...products, ...data.content];

      setProducts(newItems);
      setFilteredProducts(applyClientFilters(newItems, filters));
      setHasMore(!data.last);
      console.log("Продукти з бекенду:", data.content);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  const handleApplyFilters = (filters: FiltersType) => {
    setPage(1);
    setActiveFilters(filters);
    fetchProducts(1, filters);
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      minPrice: 100,
      maxPrice: 5000,
      categories: []
    };
    setPage(1);
    setActiveFilters(defaultFilters);
    fetchProducts(1, defaultFilters);
  };

  return (
    <div className='flex-grow px-10 relative min-h-screen mb-20'>
      <div className="flex mt-16 justify-between items-center">
        <h2 className="text-[64px] uppercase font-bold text-gray-100">магазин</h2>
        <button 
          className="border rounded-[80px] h-11 w-50 cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          Фільтри
        </button>
      </div>

      <div className={`flex ${showFilters ? 'gap-6' : ''} mt-8`}>
        <div className={`${showFilters ? 'w-2/3' : 'w-full'}`}>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${showFilters ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-8 mb-16`}>
            {filteredProducts.map(product => (
              <Card 
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                mainImageUrl={product.mainImageUrl}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8 mb-12">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="border-b-[2px] border-grey-100 text-black h-11 px-6 cursor-pointer text-[16px] transition-colors"
              >
                {isLoading ? 'Завантаження...' : 'Завантажити ще'}
              </button>
            </div>
          )}
        </div>

        {showFilters && (
          <div className="w-1/3 sticky top-4 h-[calc(100vh-150px)] overflow-y-auto">
            <Filters 
              isVisible={showFilters} 
              onApplyFilters={handleApplyFilters}
              initialFilters={activeFilters}
              onResetFilters={handleResetFilters}
            />
          </div>
        )}
      </div>
    </div>
  );
};
