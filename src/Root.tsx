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
import { Provider } from "react-redux";
import { store } from './redux/store'
import { ProfileMain } from "./Components/UserProfile/ProfileMain";
import { HomePage } from "./Components/MainPage/HomePage";
import { PersonalInformation } from "./Components/UserProfile/PersonalInformation";
import { ChangePassword } from "./Components/UserProfile/ChangePassword";
import { CheckOrderStatus } from "./Components/UserProfile/CheckOrderStatus";
import { ProfileLogOf } from "./Components/UserProfile/ProfilelogOff";
import { ProfileNoLogin } from "./Components/UserProfile/ProfileNoLogin";
import { FeedBackForm } from "./Components/Help/FeedBackForm";
import { PassRestoration } from "./Components/Login/PassRestoration";
import { AdminPageAuth } from "./Components/AdminPage/AdminPageAuth";
import { AdminMainPage } from "./Components/AdminPage/AdminMainPage";
import { AdminAuthProvider } from "./Components/AdminPage/AdminAuthContext";
import { AddItem } from "./Components/AdminPage/AdminItems.tsx/AddItem";
import { AllItem } from "./Components/AdminPage/AdminItems.tsx/AllItems";
import { AddCategory } from "./Components/AdminPage/Categories.tsx/AddCategory";
import { AllCategories } from "./Components/AdminPage/Categories.tsx/AllCategories";

export const Root = () => {
  return (
    <Provider store={store}>
      <AdminAuthProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route index element={<HomePage />} />
              <Route path="profile" element={<ProfileMain />}>
                <Route path="personalinfo" element={<PersonalInformation />}/>
                <Route path="changepass" element={<ChangePassword />}/>
                <Route path="chekorder" element={<CheckOrderStatus />}/>
                <Route path="logoff" element={<ProfileLogOf />}/>
                <Route path="errorLogin" element={<ProfileNoLogin />}/>
              </Route>
              <Route path="shop" element={<Shop />}/>
              <Route path="feedback" element={<FeedBackForm />}/>
              <Route path="admin" element={<AdminPageAuth />}>
                <Route path="adminmain" element={<AdminMainPage/>}>
                  <Route path="createitem" element={<AddItem />} />
                  <Route path="listofitems" element={<AllItem />} />
                  <Route path="createcategory" element={<AddCategory />} />
                  <Route path="listofcategories" element={<AllCategories />} />
                </Route>
              </Route>
            </Route>

            <Route path="/registration" element={<Registration />}>
              <Route path="login" element={<Login />} />
              <Route path="passrestoration" element={<PassRestoration />} />
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
      </AdminAuthProvider>
    </Provider>
  );
};
