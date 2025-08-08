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
    maxPrice: 10000,
    categories: []
  });
  const [sortOption, setSortOption] = useState<string>("");
  const [categoryMap, setCategoryMap] = useState<Record<string, number>>({});

  const itemsPerPage = 6;
  const user = useSelector((state: RootState) => state.user);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://ec2-44-203-84-198.compute-1.amazonaws.com/categories?pageable.page=0&pageable.size=1000");
      const data = await response.json();
      const map: Record<string, number> = {};
      data.content.forEach((category: { id: number; name: string }) => {
        map[category.name] = category.id;
      });
      setCategoryMap(map);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (
  currentPage: number,
  filters: FiltersType = activeFilters,
  sort: string = sortOption
) => {
  const token = user.token;
  if (!token) return;
  setIsLoading(true);

  try {
    const sortParams: string[] = [];

    const categoryIds = filters.categories
      .map(name => categoryMap[name])
      .filter((id): id is number => id !== undefined);

    if (sort) {
      sortParams.push(sort);
    }

    const requestBody = {
      categoryIds,
      page: currentPage - 1,
      size: itemsPerPage,
      sort: sortParams,
    };

    const queryParams = new URLSearchParams({
      minPrice: filters.minPrice.toString(),
      maxPrice: filters.maxPrice.toString(),
    });

    const url = `http://ec2-44-203-84-198.compute-1.amazonaws.com/items?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
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
    setFilteredProducts(newItems);
    setHasMore(!data.last);

  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    fetchCategories().then(() => {
      fetchProducts(1);
    });
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, activeFilters, sortOption);
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
      maxPrice: 10000,
      categories: []
    };
    setPage(1);
    setActiveFilters(defaultFilters);
    setSortOption("");
    fetchProducts(1, defaultFilters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    setPage(1);
    fetchProducts(1, activeFilters, value);
  };

  return (
    <div className='flex-grow px-10 relative min-h-screen mb-20'>
      <div className="flex mt-16 justify-between items-center">
        <h2 className="text-[64px] uppercase font-bold text-gray-100">магазин</h2>
        <div className="flex gap-4">
          <select 
            onChange={handleSortChange}
            value={sortOption}
            className="border rounded-[80px] h-11 px-4 cursor-pointer bg-white"
          >
            <option value="">Сортування</option>
            <option value="price,asc">Ціна (зростання)</option>
            <option value="price,desc">Ціна (спадання)</option>
            <option value="name,asc">Назва (А-Я)</option>
            <option value="name,desc">Назва (Я-А)</option>
          </select>
          <button 
            className="border rounded-[80px] h-11 px-4 cursor-pointer"
            onClick={() => setShowFilters(!showFilters)}
          >
            Фільтри
          </button>
        </div>
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
