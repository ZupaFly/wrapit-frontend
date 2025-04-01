/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../MainPage/Footer";
import backButton from '../../image/survey-main/button/Button.png'

export const Survey = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      setAnswers({ 
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
      });
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
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className={`flex-grow-1 ${location.pathname === "/survey/result" ? "bg-white" : "bg-light-violet"}`}>

      <button
        onClick={handleBack}
        className="h-[40px] w-[40px] bg-center bg-cover cursor-pointer mt-10 ml-10 border border-gray-20 rounded-full"
        style={{
          backgroundImage: `url(${backButton})`
        }}
      />

        <h1 
          className={`uppercase mt-16 max-[1024px]:mt-10 px-10 max-[1024px]:px-6 text-[64px] max-[1024px]:text-[32px] font-bold ${location.pathname === "/survey/result" ? "hidden" : ""}`}>
            Підібрати подарунок
        </h1>
        <Outlet context={{ answers, handleChange }} />

      </div>
      <Footer />
    </div>
  );
};
