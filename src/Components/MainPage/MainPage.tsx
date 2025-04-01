/* eslint-disable react/react-in-jsx-scope */
import { HeaderNav } from './HeaderNav';
import { Footer } from './Footer';
import { Outlet } from 'react-router-dom';

export const MainPage = () => {

  return (
    <div className='flex flex-col min-h-screen max-[768px]:min-h:0'>
      <HeaderNav />
        <Outlet />
      <Footer />
    </div>
  )
}