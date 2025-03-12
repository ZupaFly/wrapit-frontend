import { Link, useNavigate } from "react-router-dom";
import backButton  from '../../image/survey-main/button/Button.png';

/* eslint-disable react/react-in-jsx-scope */
export const SurveyResult = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-light-violet">
        <button
        onClick={() => navigate("/")}
        className="h-[40px] w-[40px] bg-center bg-cover cursor-pointer mt-10 ml-10 border border-gray-20 rounded-full"
        style={{ backgroundImage: `url(${backButton})` }}
      >
      </button>

      <div className="flex justify-between mt-16 mx-10">
        <h1 
          className="uppercase text-[64px] font-bold text-gray-100">
            Гарний вибір для вас&#33;
        </h1>

        <button
          className="border rounded-[120px] w-[250px]"
          onClick={()=> {navigate('../../shop')}}>
          До магазину
        </button>
      </div>

      <div className="grid grid-cols-6 gap-24 mx-10 mt-10">
        <div className="border col-span-2">GoodCard</div>
        <div className="border col-span-2">GoodCard</div>
        <div className="border col-span-2">GoodCard</div>
      </div>

      <div className="grid grid-cols-6 gap-24 mx-10 mt-10">
        <div className="flex justify-between col-span-3">
        <h3>Не влаштовує результат?</h3>
        <Link to="../extra1">
        <h3>Перепройти тест</h3>
        </Link>
        </div>
      </div>
    </div>
  );
};
