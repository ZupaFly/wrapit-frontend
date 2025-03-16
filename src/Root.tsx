/* eslint-disable react/react-in-jsx-scope */
import { HashRouter, Route, Routes } from "react-router-dom";

import { MainPage } from './Components/MainPage/MainPage'
import { Login } from "./Components/Login/Login";
import { SignIn } from './Components/Login/SignIn';
import { Survey } from './Components/Questions/Survey'
import { FirstQuestion } from "./Components/Questions/FirstQuestion";
import { SecondQuestion } from "./Components/Questions/SecondQuestion";
import { LastQuestion } from "./Components/Questions/LastQuestion";
import { ThirdQuestion } from './Components/Questions/ThirdQuestion';
import { SurveyResult } from "./Components/Questions/SurveyResult";
import { Shop } from "./Components/Shop/Shop";
import { ExtraQuestionOne } from "./Components/Questions/ExtraQuestionOne";
import { ExtraQuestionTwo } from "./Components/Questions/ExtraQuestionTwo";
import { Registration } from "./Components/Login/Registration";

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="/registration" element={<Registration />}>
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<SignIn />} />
        </Route>

        <Route path="/survey" element={<Survey />}>
          <Route path="1" element={<FirstQuestion />} />
          <Route path="2" element={<SecondQuestion />} />
          <Route path="3" element={<ThirdQuestion />} />
          <Route path="4" element={<LastQuestion />} />
          <Route path="extra1" element={<ExtraQuestionOne />} />
          <Route path="extra2" element={<ExtraQuestionTwo />} />
          <Route path="result" element={<SurveyResult/>}/>
        </Route>

      </Routes>
    </HashRouter>
  );
};
