/* eslint-disable react/react-in-jsx-scope */
import success from '../../image/icons/success.png';
import envelop from '../../image/icons/mail-letter.png';
import phone from '../../image/icons/phone.png';
import clock from '../../image/icons/clock.png';

export const FeedBackForm = () => {
  return (
    <div className=" px-10">
      <h2 className="uppercase text-[64px] font-bold text-gray-100 mb-10 mt-16">Потрібна допомога?</h2>
      <div className="grid grid-cols-5">
        <form className="flex flex-col col-span-2">
          <div className='mb-6'>
            <h5 className="text-gray-90 text-[16px] font-normal mb-1">Ім’я</h5>
            <input 
              type="text"
              className='px-4 border rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal
                border-gray-20'
            />
          </div>
          <div className='mb-6'>
            <h5 className="text-gray-90 text-[16px] font-normal mb-1">Номер телефону</h5>
            <input 
              type="text"
              className='px-4 border rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal
                border-gray-20'
            />
          </div>

          <div className="mb-8">
            <h5 className="text-gray-90 text-[16px] font-normal mb-1">Опис проблеми</h5>
            <textarea 
              placeholder="Опишіть причину звернення"
              className='px-4 py-2 border rounded-[14px] w-full h-15 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal
                border-gray-20'
            />
          </div>

          <button 
            className='w-full rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-20 bg-primary cursor-pointer'>
              Надіслати
          </button>
        </form>

        <div className="flex flex-col col-span-2 col-start-4 justify-between">
          <div className="border border-light-violet rounded-[16px]">
            <h2 className='text-[32px] text-gray-90 font-medium px-4 pt-4 mb-8'>Наші контакти</h2>
            <div className='flex flex-col'>
              <div className='flex px-4 mb-6 gap-2 items-center'>
                <img
                  src={envelop}
                  alt="envelop icon"
                  className='h-[24px] w-[24px]'
                />
                <a 
                  href='mailto:email00@gmail.com'
                  className='text-[20px] text-gray-80 font-normal'>email00@gmail.com</a>
              </div>

              <div className='flex px-4 mb-6 gap-2 items-center'>
                <img
                  src={phone}
                  alt="envelop icon"
                  className='h-[24px] w-[24px]'
                />
                <a 
                  href='tel:+380 50 343 578 '
                  className='text-[20px] text-gray-80 font-normal'>+380 50 343 578 </a>
              </div>

              <div className='flex px-4 mb-4 gap-2 items-center'>
                <img
                  src={clock}
                  alt="envelop icon"
                  className='h-[24px] w-[24px]'
                />
                <div
                  className='text-[20px] text-gray-80 font-normal'>9:00-18:00</div>
              </div>

            </div>
          </div>

          <div className=" relative border border-success rounded-[8px] flex flex-row mb-20 items-center gap-4">
            <img
              src={success}
              alt="success icon"
              className='h-[32px] w-[32px] ml-2'
            />
            <div className='py-2 flex justify-between flex-col'>
              <h4 className='text-gray-90 text-[20px] font-normal'>Успішно</h4>
              <h5 className='text-gray-80 text-[16px] font-normal'>Ваш запит надіслано</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}