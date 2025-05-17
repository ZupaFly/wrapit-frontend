// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
import { Filters } from "./Filters";
import { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import { FiltersType, Product } from "../../types/Product";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Майстер-клас з дайвінгу в м.Київ",
    price: 2360,
    image: "https://example.com/image1.jpg"
  },
  {
    id: 2,
    title: "Чашка з підігрівом Ember Smart Mug 2",
    price: 3440,
    image: "https://example.com/image2.jpg"
  },
  {
    id: 3,
    title: "В'язана іграшка свинка",
    price: 430,
    image: "https://example.com/image3.jpg"
  },
  {
    id: 4,
    title: "Майстер-клас з дайвінгу в м.Київ",
    price: 2360,
    image: "https://example.com/image1.jpg"
  },
  {
    id: 5,
    title: "Чашка з підігрівом Ember Smart Mug 2",
    price: 3440,
    image: "https://example.com/image2.jpg"
  },
  {
    id: 6,
    title: "В'язана іграшка свинка",
    price: 430,
    image: "https://example.com/image3.jpg"
  },
  {
    id: 7,
    title: "Майстер-клас з дайвінгу в м.Київ",
    price: 2360,
    image: "https://example.com/image1.jpg"
  },
  {
    id: 8,
    title: "Чашка з підігрівом Ember Smart Mug 2",
    price: 3440,
    image: "https://example.com/image2.jpg"
  },
  {
    id: 9,
    title: "В'язана іграшка свинка",
    price: 430,
    image: "https://example.com/image3.jpg"
  },
];

/* eslint-disable react/react-in-jsx-scope */
export const Shop = () => {
  // const user = useSelector((state: RootState) => state.user);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 6; // Загружаем по 6 товаров за раз

  // const fetchProducts = async (currentPage: number, filters: FiltersType | null = null) => {
  //   setIsLoading(true);
  //   try {
  //     let url = `....url`;
      
  //     if (filters) {
  //       url += `&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`;
  //       if (filters.categories.length > 0) {
  //         url += `&categories=${filters.categories.join(',')}`;
  //       }
  //     }
  
  //     const response = await fetch(url);
  //     const data = await response.json();
      
  //     if (!data.products) {
  //       throw new Error('Invalid response format');
  //     }
      
  //     if (currentPage === 1) {
  //       setProducts(data.products);
  //     } else {
  //       setProducts(prev => [...prev, ...data.products]);
  //     }
      
  //     setHasMore(data.hasMore ?? false);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     // Можно добавить уведомление для пользователя
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

   const fetchProducts = async (currentPage: number, filters?: FiltersType) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      let filteredProducts = mockProducts;
      
      if (filters) {
        filteredProducts = mockProducts.filter(product => {
          const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;
          const categoryMatch = filters.categories.length === 0 || true;
          return priceMatch && categoryMatch;
        });
      }
      
      const startIdx = (currentPage - 1) * itemsPerPage;
      const paginatedProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage);
      
      if (currentPage === 1) {
        setProducts(paginatedProducts);
      } else {
        setProducts(prev => [...prev, ...paginatedProducts]);
      }
      
      setHasMore(startIdx + itemsPerPage < filteredProducts.length);
    } catch (error) {
      console.error("Error:", error);
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
    fetchProducts(1, filters);
    setShowFilters(false);
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
            {products.map(product => (
              <Card 
                key={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
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
            />
          </div>
        )}
      </div>
    </div>
  );
}
