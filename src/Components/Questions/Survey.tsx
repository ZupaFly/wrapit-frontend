/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../MainPage/Footer";
import backButton from '../../image/survey-main/button/Button.png'

export const Survey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const step = parseInt(location.pathname.split('/')[2], 10);

  const [answers, setAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem("surveyAnswers") || "{}") || {
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
      question6: "",
    };
  });

  console.log(answers);

  useEffect(() => {
    if (location.pathname.endsWith("/survey")) {
      navigate("/survey/1", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    localStorage.setItem("surveyAnswers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("surveyAnswers");
      setAnswers({ question1: "", question2: "", question3: "", question4: "" });
    };
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>, 
    category: string, 
    attribute?: string
  ) => {
    setAnswers((prevAnswers: string[]) => ({
      ...prevAnswers,
      [category]: attribute || event.target.value,
    }));
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/", { replace: true });
    } else {
      navigate(`/survey/${step - 1}`, { replace: true });
    }
  };

  return (
    <div className="h-screen bg-light-violet">

    <button
      onClick={handleBack}
      className="h-[40px] w-[40px] bg-center bg-cover cursor-pointer mt-10 ml-10 border border-gray-20 rounded-full"
      style={{
        backgroundImage: `url(${backButton})`,
        visibility: location.pathname.includes("/survey/result") || location.pathname.includes("/survey/extra1") ? 'hidden' : 'visible',
        pointerEvents: location.pathname.includes("/survey/result") || location.pathname.includes("/survey/extra1") ? 'none' : 'auto',
      }}
  />

      <h1 
        className={`uppercase mt-16 ml-10 text-[64px] font-bold ${location.pathname === "/survey/result" ? "hidden" : ""}`}>
          Підібрати подарунок
      </h1>
      <Outlet context={{ answers, handleChange }} />
      <Footer />
    </div>
  );
};
