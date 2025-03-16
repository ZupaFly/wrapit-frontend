  /* eslint-disable react/react-in-jsx-scope */
  import { Outlet, useNavigate } from 'react-router-dom';
  import backButton from '../../image/icons/Button.png';
  import registartionBgImage from '../../image/registration/registration-bg-image.png'

export const Registration = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }
  return (
    <div className="grid grid-cols-5 bg-white h-screen gap-6">
      <div className='col-span-2 ml-10'>
        <button
          onClick={handleBack}
          className="h-[40px] w-[40px] bg-center bg-cover cursor-pointer mt-10 border border-gray-20 rounded-full"
          style={{
            backgroundImage: `url(${backButton})`
          }}
        />
        <Outlet />

      </div>
      <div className='col-span-3 bg-cover bg-center w-[100%]' style={{backgroundImage: `url(${registartionBgImage})`}}></div>
    </div>
  )
}
