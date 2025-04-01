import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Card } from "../Card/Card";
/* eslint-disable react/react-in-jsx-scope */

type Props = {
  answers: { 
    question1: string, 
    question2: string,
    question3: string, 
    question4: string,
    question5: string, 
    question6: string,
  };
}
export const SurveyResult = () => {
  const navigate = useNavigate();
  const { answers } = useOutletContext<Props>();

  return (
    <div className=" bg-white">

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

      <div className="grid grid-cols-6 gap-24 mx-10 mt-10 mb-16 max-[1024px]:mt-8 max-[1024px]:flex max-[1024px]:flex-col">
        <div className="col-span-2">
          <Card/>
        </div>
        <div className="col-span-2">
        <Card/>
        </div>
        <div className="col-span-2">
          <Card/>
        </div>
      </div>

      <button
          className={`border rounded-[120px] h-[56px] lg:hidden w-[90%] mx-6 ${answers.question6
            ? 'mb-20'
            : 'mb-0'
          }`}
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
