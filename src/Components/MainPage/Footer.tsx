/* eslint-disable react/react-in-jsx-scope */
import footerLogo from '../../image/footer/WRAPLT-logo-footer.png';

export const Footer = () => {
  return (
    <div className="flex flex-col bg-gray-100 pt-20 px-10 pb-8">
      <div className="flex justify-end border-b border-gray-80 pb-6 mb-4">
        <img src={footerLogo} alt="" />
      </div>
      <div className="flex justify-between w-1/3">
        <h4 className="text-gray-70 font-normal text-[14px] uppercase leading-[110%]">@2025</h4>
        <h4 className="text-gray-70 font-normal text-[14px] uppercase leading-[110%]">Located in ukraine</h4>
      </div>
  </div>
  )
}