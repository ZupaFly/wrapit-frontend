/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import success from '../../image/icons/success.png';
import envelop from '../../image/icons/mail-letter.png';
import phone from '../../image/icons/phone.png';
import clock from '../../image/icons/clock.png';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const FeedBackForm = () => {
  const url = 'http://ec2-44-203-84-198.compute-1.amazonaws.com/feedbacks';

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [successSent, setSuccessSent] = useState(false);
  const [errorSent, setErrorSent] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const token = user.token;

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSuccessSent(false);
  setErrorSent(false);

  const payload = {
    message: `Ім’я: ${name}\nТелефон: ${phoneNumber}\nПроблема: ${description}`,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setSuccessSent(true);
      setName('');
      setPhoneNumber('');
      setDescription('');
    } else {
      setErrorSent(true);
    }
  } catch (error) {
    setErrorSent(true);
    console.log(error);
  }
};

  return (
    <div className="px-10">
      <h2 className="uppercase text-[64px] max-[1024px]:text-[32px] font-bold text-gray-100 mb-10 max-[1024px]:mb-8 mt-16 max-[1024px]:mt-10">
        Потрібна допомога?
      </h2>

      <div className="grid grid-cols-5 max-[1024px]:flex max-[1024px]:flex-col-reverse">
        <form className="flex flex-col col-span-2" onSubmit={handleSubmit}>
          <div className='mb-6'>
            <h5 className="text-gray-90 text-[16px] font-normal mb-1">Ім’я</h5>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='px-4 border rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal
                border-gray-20'
              placeholder='Введіть ім’я'
              required
            />
          </div>
          <div className='mb-6'>
            <h5 className="text-gray-90 text-[16px] font-normal mb-1">Номер телефону</h5>
            <input 
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='px-4 border rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal
                border-gray-20'
              placeholder='+380...'
              required
            />
          </div>

          <div className="mb-8">
            <h5 className="text-gray-90 text-[16px] font-normal mb-1">Опис проблеми</h5>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опишіть причину звернення"
              className='px-4 py-2 border rounded-[14px] w-full h-15 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal
                border-gray-20'
              required
            />
          </div>

          <button 
            type="submit"
            className='w-full rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-20 max-[1024px]:mb-6 bg-primary cursor-pointer'>
              Надіслати
          </button>
        </form>

        <div className="flex flex-col col-span-2 col-start-4 justify-between">
          <div className="border border-light-violet rounded-[16px] max-[1024px]:mb-10">
            <h2 className='text-[32px] max-[1024px]:text-[24px] text-gray-90 font-medium px-4 pt-4 mb-8'>Наші контакти</h2>
            <div className='flex flex-col'>
              <div className='flex px-4 mb-6 gap-2 items-center'>
                <img src={envelop} alt="envelop icon" className='h-[24px] w-[24px]' />
                <a href='mailto:email00@gmail.com' className='text-[20px] max-[1024px]:text-[16px] text-gray-80 font-normal'>
                  email00@gmail.com
                </a>
              </div>

              <div className='flex px-4 mb-6 gap-2 items-center'>
                <img src={phone} alt="phone icon" className='h-[24px] w-[24px]' />
                <a href='tel:+38050343578' className='text-[20px] max-[1024px]:text-[16px] text-gray-80 font-normal'>
                  +380 50 343 578
                </a>
              </div>

              <div className='flex px-4 mb-4 gap-2 items-center'>
                <img src={clock} alt="clock icon" className='h-[24px] w-[24px]' />
                <div className='text-[20px] max-[1024px]:text-[16px] text-gray-80 font-normal'>9:00-18:00</div>
              </div>
            </div>
          </div>

          {successSent && (
            <div className="max-[1024px]:hidden relative border border-success rounded-[8px] flex flex-row mb-20 items-center gap-4">
              <img src={success} alt="success icon" className='h-[32px] w-[32px] ml-2' />
              <div className='py-2 flex justify-between flex-col'>
                <h4 className='text-gray-90 text-[20px] font-normal'>Успішно</h4>
                <h5 className='text-gray-80 text-[16px] font-normal'>Ваш запит надіслано</h5>
              </div>
            </div>
          )}
        </div>
      </div>

      {(successSent || errorSent) && (
        <div className={`relative border ${successSent ? 'border-success' : 'border-red-500'} rounded-[8px] flex flex-row mb-20 items-center gap-4`}>
          <img src={success} alt="success icon" className='h-[32px] w-[32px] ml-2' />
          <div className='py-2 flex justify-between flex-col'>
            <h4 className='text-gray-90 text-[20px] font-normal'>
              {successSent ? 'Успішно' : 'Помилка'}
            </h4>
            <h5 className='text-gray-80 text-[16px] font-normal'>
              {successSent ? 'Ваш запит надіслано' : 'Не вдалося надіслати. Спробуйте пізніше.'}
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};
