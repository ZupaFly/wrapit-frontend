/* eslint-disable react/react-in-jsx-scope */
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Card } from "../Card/Card";
import { Product } from "../../types/Product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Props = {
  answers: { 
    question1: string, 
    question2: string,
    question3: string, 
    question4: string,
    question5: string, 
    question6: string,
  };
};

export const SurveyResult = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, number>>({});
  const navigate = useNavigate();
  const { answers } = useOutletContext<Props>();
  const user = useSelector((state: RootState) => state.user);
  const token = user.token;

  const itemsPerPage = 3;

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "http://ec2-44-203-84-198.compute-1.amazonaws.com/categories?pageable.page=0&pageable.size=1000"
      );
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

  const fetchProducts = async () => {
    if (!token) return;

    try {

      const selectedCategories = [
        answers.question1,
        answers.question2,
        answers.question3,
        answers.question5,
      ].filter(Boolean);

      const categoryIds = selectedCategories
        .map(name => categoryMap[name])
        .filter((id): id is number => id !== undefined);

      const maxPrice = Number(answers.question4) || 10000;

      const requestBody = {
        categoryIds,
        page: 0,
        size: itemsPerPage,
      };

      const queryParams = new URLSearchParams({
        minPrice: "0",
        maxPrice: maxPrice.toString(),
      });

      const url = `http://ec2-44-203-84-198.compute-1.amazonaws.com/items?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      setProducts(data.content || []);

      // Похожие товары
      if (data.content?.length > 0) {
        const mainProductIds = data.content.map((p: Product) => p.id);
        const similarResponse = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            categoryIds,
            page: 1,
            size: itemsPerPage,
          }),
        });
        const similarData = await similarResponse.json();
        setSimilarProducts(
          (similarData.content || []).filter(
            (p: Product) => !mainProductIds.includes(p.id)
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (Object.keys(categoryMap).length > 0) {
      fetchProducts();
    }
  }, [categoryMap]);

  return (
    <div className="bg-white">
      <div className="flex flex-grow-1 justify-between items-center mt-16 max-[1024px]:mt-10 mx-10">
        {answers.question6 
          ? <h1 className="uppercase text-[64px] max-[1024px]:text-[32px] font-bold text-gray-100">А як вам такі варіанти?</h1> 
          : <h1 className="uppercase text-[64px] max-[1024px]:text-[32px] font-bold text-gray-100">Гарний вибір для вас&#33;</h1>
        }

        <button
          className="border rounded-[120px] w-[250px] h-[56px] max-[1024px]:hidden"
          onClick={()=> {navigate('../../shop')}}>
          До магазину
        </button>
      </div>

      {/* Основные товары */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-10 mt-10 mb-16">
        {products.map(product => (
          <Card 
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            mainImageUrl={product.mainImageUrl}
            description={product.description}
          />
        ))}
      </div>

      {/* Похожие товары */}
      {similarProducts.length > 0 && (
        <>
          <h2 className="uppercase text-[32px] font-bold mx-10 mb-6 text-gray-100">Схожі товари</h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8 mx-10 mt-4 mb-16">
            {similarProducts.map(product => (
              <Card 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                mainImageUrl={product.mainImageUrl}
                description={product.description}
              />
            ))}
          </div>
        </>
      )}

      <button
        className={`border rounded-[120px] h-[56px] lg:hidden w-[90%] mx-6 ${answers.question6 ? 'mb-20' : 'mb-0'}`}
        onClick={()=> {navigate('../../shop')}}>
        До магазину
      </button>

      {answers.question6
        ? <div className="grid grid-cols-6 gap-24 mx-10">
            <div className="flex justify-between col-span-3">
              <h3></h3>
              <Link to="../extra1">
                <h3></h3>
              </Link>
            </div>
          </div>
        : <div className="grid grid-cols-6 gap-24 mx-10 mt-10 mb-20 max-[1024px]:mb-10 max-[1024px]:block">
            <div className="flex justify-between col-span-3 max-[1024px]:flex max-[1024px]:flex-row">
              <h3>Не влаштовує результат?</h3>
              <Link to="../extra1">
                <h3 className="cursor-pointer border-b">Перепройти тест</h3>
              </Link>
            </div>
          </div>
      }
    </div>
  );
};
