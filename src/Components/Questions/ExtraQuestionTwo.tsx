/* eslint-disable react/react-in-jsx-scope */
import { useNavigate, useOutletContext } from 'react-router-dom';
import { peoplelist } from '../../utils/peoplelist';

type SurveyContext = {
  answers: { 
    question1: string, 
    question2: string,
    question3: string, 
    question4: string,
    question5: string, 
    question6: string,
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, category: string, attribute?: string) => void;
};

export const ExtraQuestionTwo = () => {
  const { answers, handleChange } = useOutletContext<SurveyContext>();

const navigate = useNavigate();

  const quest6 = peoplelist.extraQuestionTwo;
  const identifier = answers.question1;
  const imageUrl = typeof quest6.image === "object" && quest6.image !== null
    ? quest6.image[identifier]
    : quest6.image;

  return (
      <div className='grid grid-cols-5 gap-[24px] mt-10 ml-10 mr-10 mb-20'>
        <div className="flex flex-col gap-4 col-span-3 bg-white rounded-[32px] p-8">
          <div className="flex justify-between">
            <h3 className='text-[32px]'>{quest6.title}</h3>
            <div>1 / 2</div>
        </div>
          {quest6.values.map((value, index) => (
            <label key={index} className="flex items-center text-[16px]">
              <input
                type="radio"
                name="question1"
                value={value}
                checked={answers.question6 === quest6.attributes[index]}
                onChange={(e) => handleChange(e, "question6", quest6.attributes[index])}
                className="mr-2"
              />
              {value} 
            </label>
          ))}
          <button
            className={`mt-4 p-2 text-[16px] text-white rounded-[120px] col-span-3 w-full cursor-pointer 
            ${answers.question6 ? "bg-primary" : "bg-gray-60 cursor-not-allowed"}`}
            disabled={!answers.question6}
            onClick={() => {
              if (answers.question6) {
                navigate("/survey/result");
              }
            }}
          >
            Далі
          </button>
        </div>
        <div 
          className="bg-center bg-cover col-span-2 rounded-[32px]"
          style={{backgroundImage: `url(${imageUrl})`}}></div>
      </div>
  );
};
