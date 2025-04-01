/* eslint-disable react/react-in-jsx-scope */
import footerLogo from '../../image/footer/WRAPLT-logo-footer.png';

export const Footer = () => {
  return (
    <div className="flex flex-col bg-gray-100 pt-20 max-[1024px]:pt-6 max-[1024px]:pb-5 px-10 pb-8">
      <div className="flex justify-end border-b border-gray-80 pb-6 max-[1024px]:pb-4 mb-4 max-[1024px]:mb-2">
        <img src={footerLogo} alt="" />
      </div>
      <div className="flex justify-between w-1/3 max-[1024px]:w-full">
        <h4 className="text-gray-70 font-normal text-[14px] uppercase leading-[110%]">@2025</h4>
        <h4 className="text-gray-70 font-normal text-[14px] uppercase leading-[110%]">Located in ukraine</h4>
      </div>
  </div>
  )
}