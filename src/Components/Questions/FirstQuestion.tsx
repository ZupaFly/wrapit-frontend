/* eslint-disable react/react-in-jsx-scope */
import { useNavigate, useOutletContext } from 'react-router-dom';
import { peoplelist } from '../../utils/peoplelist';

type SurveyContext = {
  answers: { question1: string };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, category: string, attribute?: string) => void;
};

export const FirstQuestion = () => {
  const { answers, handleChange } = useOutletContext<SurveyContext>();

const navigate = useNavigate();

  const quest1 = peoplelist.startQuestion;

  return (
    <div 
      className='grid grid-cols-5 gap-[24px] mt-10 ml-10 mr-10 mb-20'>
        <div className="flex flex-col gap-4 col-span-3 bg-white rounded-[32px] p-8">
          <div className="flex justify-between">
            <h3 className='text-[32px]'>{peoplelist.startQuestion.title}</h3>
            <div>1 / 4</div>
        </div>
          {quest1.values.map((value, index) => (
            <label key={index} className="flex items-center text-[16px]">
              <input
                type="radio"
                name="question1"
                value={value}
                checked={answers.question1 === quest1.attributes[index]}
                onChange={(e) => 
                  handleChange(e, "question1", quest1.attributes[index])}
                className="mr-2"
              />
              {value} 
            </label>
          ))}
          <button
            className={`mt-4 p-2 text-[16px] text-white rounded-[120px] col-span-3 w-full cursor-pointer 
            ${answers.question1 ? "bg-primary" : "bg-gray-60 cursor-not-allowed"}`}
            disabled={!answers.question1}
            onClick={() => {
              if (answers.question1) {
                navigate("/survey/2");
              }
            }}
          >
            Далі
          </button>
        </div>
      <div 
        className="bg-center bg-cover col-span-2 rounded-[32px]"
        style={{backgroundImage: `url(${quest1.image})`}}></div>
    </div>
  );
};
