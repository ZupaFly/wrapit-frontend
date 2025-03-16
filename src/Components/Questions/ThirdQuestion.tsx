/* eslint-disable react/react-in-jsx-scope */
import { useNavigate, useOutletContext } from "react-router-dom";
import { peoplelist } from "../../utils/peoplelist";

type SurveyContext = {
  answers: { question1: string, question3: string };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, category: string, attribute?: string) => void;
};

export const ThirdQuestion = () => {
  const { answers, handleChange } = useOutletContext<SurveyContext>();
  const navigate = useNavigate();

  const category = answers.question1;

  const quest3 = peoplelist[category as keyof typeof peoplelist].quest3;


  if (!quest3) {
    return <div>Помилка: не знайдено питання для цієї категорії.</div>;
  }

  return (
      <div className="grid grid-cols-5 gap-[24px] mt-10 ml-10 mr-10 mb-20">
        <div className="flex flex-col gap-4 col-span-3 bg-white rounded-[32px] p-8">
          <div className="flex justify-between">
            <h3 className="text-[32px]">{quest3.title}</h3>
            <div>3 / 4</div>
          </div>

          {quest3.values.map((value: string, index: number) => (
            <label key={index} className="flex items-center text-[16px]">
              <input
                type="radio"
                name="question3"
                value={value}
                checked={answers.question3 === quest3.attributes[index]}
                onChange={(e) => handleChange(e, "question3", quest3.attributes[index])}
              className="mr-2"
            />
            {value}
          </label>
        ))}

        <button
          className={`mt-4 p-2 text-[16px] text-white rounded-[120px] col-span-3 w-full cursor-pointer 
          ${answers.question3 ? "bg-primary" : "bg-gray-60 cursor-not-allowed"}`}
          disabled={!answers.question3}
          onClick={() => {
            if (answers.question3) {
              navigate("/survey/4");
            }
          }}
        >
          Далі
        </button>
      </div>

      <div
        className="bg-center bg-cover col-span-2 rounded-[32px]"
        style={{backgroundImage: `url(${quest3.image})`}}></div>
    </div>
  );
};
