/* eslint-disable react/react-in-jsx-scope */
import { HeaderNav } from './HeaderNav';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export const MainPage = () => {

  return (
    <>
      <HeaderNav />
        <Outlet />
      <Footer />
    </>
  )
}