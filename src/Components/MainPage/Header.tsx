import askIcon from '../../image/header/ask-icon.png';
import cartIcon from '../../image/header/cart-icon.png';
import headerLogo from '../../image/header/header-logo.svg';
import wrapitMainLogo from '../../image/header/wraplt-main-logo.png';
import userLogin from '../../image/header/user-login.png';


export const Header = () => {
  return (
    <div className="h-screen mb-20">
      <div className="flex flex-col bg-light-violet h-[50vh] justify-between mb-[80px]">

        <nav className="mt-[40px] ml-[40px] mr-[40px] flex flex-row h-[61px] bg-header-color justify-between rounded-[138px] items-center">

          <div className="pl-[16px] flex gap-[64px] flex-1">
            <a href="#" 
              className="text-white uppercase font-normal text-[14px] leading-[110%] relative 
                         after:content-[' '] after:block after:absolute after:left-0 after:top-[140%] after:w-full after:h-[1px] 
                         after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-300 
                         hover:after:scale-x-100 hover:after:origin-left">
              головна
            </a>
            <a href="#" 
              className="text-white uppercase font-normal text-[14px] leading-[110%] relative 
                         after:content-[' '] after:block after:absolute after:left-0 after:top-[140%] after:w-full after:h-[1px] 
                         after:bg-white after:scale-x-0 after:origin-right after:transition-transform after:duration-300 
                         hover:after:scale-x-100 hover:after:origin-left">
              магазин
            </a>
          </div>

          <img 
            src={headerLogo} 
            alt="header-logo" 
            className="h-[54px] flex-1 pt-2"/>

          <div className="pr-[16px] flex gap-[40px] flex-1 justify-end items-center">
            <a href="#">
              <img 
                src={userLogin}
                alt="user-logo-icon" 
                className="transition-all duration-200 hover:scale-110"/>
            </a>
            <a href="#">
              <img
                src={cartIcon} 
                alt="cart-icon" 
                className="transition-all duration-200 hover:scale-110"/>
            </a>
            <a href="#">
              <img 
                src={askIcon} 
                alt="ask-icon" 
                className="transition-all duration-200 hover:scale-110"/>
            </a>
            <button 
              className="bg-primary h-[44px] w-[207px] rounded-[80px] text-white font-medium text-[16px] 
                         transition-all duration-200 hover:scale-110 cursor-pointer">
                Підібрати подарунок
            </button>
          </div>
        </nav>

        <div className="flex justify-center items-center">
          <img className="mx-auto" src={wrapitMainLogo} alt="wrapit-main-logo" />
        </div>

      </div>
      <div>
        <div className="flex flex-col pl-[317px]">
          <h2 className="text-gray-100 uppercase mb-[16px] font-medium text-[40px]">про нас</h2>
          <h3 
            className="mb-[30px] font-normal text-[20px] leading-[140%]">
              Ми віримо, що кожен подарунок – це не просто річ, а<br /> особливий момент радості та турботи. Саме тому наш <br />сервіс допомагає вам швидко та легко знайти <br />ідеальний презент для будь-кого та на будь-який <br /> випадок.
          </h3>
          <button 
            className="bg-primary rounded-[80px] text-white w-[260px] h-[60px] font-medium text-[16px] leading-[120%] 
                       cursor-pointer transition-all duration-200 hover:opacity-80">
            До магазину
          </button>
        </div>
      </div>
    </div>
  )
}
