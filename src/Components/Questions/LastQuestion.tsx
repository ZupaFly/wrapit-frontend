/* eslint-disable react/react-in-jsx-scope */
import { useNavigate, useOutletContext } from 'react-router-dom';
import { peoplelist } from '../../utils/peoplelist';


type SurveyContext = {
  answers: { question1: string, question4: string };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, category: string, attribute?: string) => void;
};

export const LastQuestion = () => {
  const { answers, handleChange } = useOutletContext<SurveyContext>();

const navigate = useNavigate();

  const quest4 = peoplelist.finalQuestion;

  return (
    <div className='grid grid-cols-5 gap-[24px] mt-10 px-10 max-[1024px]:px-6 pb-20 max-[1024px]:pb-4 max-[1024px]:flex max-[1024px]:w-full max-[1024px]:flex-col-reverse max-[1024px]:bg-light-violet'>
      <div className="flex flex-col gap-4 col-span-3 bg-white rounded-[32px] p-8">
        <div className="flex justify-between">
          <h3 className='text-[32px] max-[1024px]:text-[24px] text-gray-80'>
            {quest4.title}
          </h3>
          <div
           className='text-[16px] text-gray-80'>
            4/4
          </div>
      </div>
        {quest4.values.map((value, index) => (
          <label key={index} className="flex items-center text-[16px] text-gray-80">
            <input
              type="radio"
              name="question4"
              value={value}
              checked={answers.question4 === quest4.attributes[index]}
              onChange={(e) => handleChange(e, "question4", quest4.attributes[index])}
              className="mr-2"
            />
            {value} 
          </label>
        ))}
        <button
          className={`mt-4 p-2 text-[16px] text-white rounded-[120px] col-span-3 w-full cursor-pointer 
          ${answers.question4 ? "bg-primary" : "bg-gray-60 cursor-not-allowed"}`}
          disabled={!answers.question4}
          onClick={() => {
            if (answers.question4) {
              navigate("/survey/result");
            }
          }}
        >
          Далі
        </button>
      </div>
      <div 
        className='bg-center bg-cover max-[1024px]:w-full max-[1024px]:h-[160px] col-span-2 rounded-[32px]'
        style={{backgroundImage: `url(${quest4.image})`}}></div>
    </div>
  );
};
