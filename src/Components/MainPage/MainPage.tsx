/* eslint-disable react/react-in-jsx-scope */
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { Questions } from './Questions';

export const MainPage = () => {
  return (
    <>
      <Header />
      <Main />
      <Questions />
      <Footer />
    </>
  )
}