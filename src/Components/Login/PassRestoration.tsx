/* eslint-disable react/react-in-jsx-scope */
import { useRef, useState, useEffect } from "react";
import hidePass from "../../image/icons/hidePassword.png";
import showPass from "../../image/icons/showPassword.png";
import { useOutletContext } from "react-router-dom";

type StepCount = {
  passStep: number;
  handleStep: () => void;
};

export const PassRestoration = () => {
  const { passStep, handleStep } = useOutletContext<StepCount>();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRetry, setShowPasswordRetry] = useState(false);
  const [passNew, setPassNew] = useState({
    password: "",
    repeatPassword: "",
  });

  useEffect(() => {
    setError(passNew.password !== passNew.repeatPassword);
  }, [passNew]);

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassNew({ ...passNew, [e.target.name]: e.target.value });
  };

  const toogleSeePassword = () => setShowPassword(!showPassword);
  const toogleSeePasswordRetry = () => setShowPasswordRetry(!showPasswordRetry);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
  
    if (value && index < digits.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="col-span-2 mt-20">
      <div className="mb-16">
        <h1 className="uppercase text-gray-100 text-[64px] font-bold mb-2">Вхід</h1>
        <h3 className="text-24px text-gray-90 font-normal">Відновлення пароля</h3>
      </div>

      {passStep === 1 && (
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) {
              alert("Будь ласка, введіть email");
              return;
            }
            handleStep();
          }}
        >
          <div className="mb-6">
            <h5 className="text-gray-90 text-[16px] font-normal mb-1">Введіть ваш e-mail</h5>
            <input
              type='email'
              name="email"
              required
              placeholder="username@gmail.com"
              onChange={handleEmail}
              className="px-4 border border-gray-20 rounded-[94px] w-[100%] h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal"
            />
          </div>
          <button
            type="submit"
            className="w-[100%] rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-6 bg-primary cursor-pointer"
          >
            Далі
          </button>
        </form>
      )}

      {passStep === 2 && (
        <form 
        onSubmit={(e) => {
          e.preventDefault();
          if (digits.length !== 4) {
            alert("Будь ласка, всі цифри");
            return;
          }
          handleStep();
        }}>
          <div className="mb-6">
            <h5 className="text-gray-90 text-[16px] font-normal mb-1">
              Ми надіслали код на вашу адресу: {email}
            </h5>
            <div className="flex gap-6 items-center justify-center">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e)}
                  maxLength={1}
                  inputMode="numeric"
                  required
                  className="border text-center border-gray-20 rounded-[94px] w-[100%] h-10"
                />
              ))}
            </div>
          </div>
          <button
            type='submit'
            className="w-[100%] rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-6 bg-primary cursor-pointer"
          >
            Далі
          </button>
        </form>
      )}

      {passStep === 3 && (
        <form>
          <div className="mb-6">
            <h5 className="text-gray-90 text-[16px] font-normal mb-1">Пароль</h5>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={passNew.password}
                onChange={handleNewPassword}
                placeholder="Введіть пароль"
                autoComplete="new-password"
                className={`px-4 border rounded-[94px] w-full h-10 ${
                  error ? "border-error" : "border-gray-20"
                }`}
              />
              <img className="absolute right-4 top-2 cursor-pointer" src={showPassword ? showPass : hidePass} onClick={toogleSeePassword} />
            </div>
          </div>

          <div className="mb-10">
              <h5 className="text-gray-90 text-[16px] font-normal mb-1">Повторіть пароль</h5>
              <div className="relative">
                <input
                  type={showPasswordRetry ? 'text' : 'password'}
                  name="repeatPassword"
                  required
                  value={passNew.repeatPassword}
                  onChange={handleNewPassword}
                  placeholder="Повторіть пароль"
                  autoComplete="new-password"
                  className={`relative px-4 border rounded-[94px] w-full h-10 placeholder:text-gray-60 placeholder:text-[16px] placeholder:font-normal ${
                    error ? 'border-error' : 'border-gray-20 '
                  }`}
                />
                {error && <div className="absolute text-error">Паролі не співпадають</div>}
                <img
                  className="absolute right-4 top-2 cursor-pointer"
                  src={showPasswordRetry ? showPass : hidePass}
                  alt=""
                  onClick={toogleSeePasswordRetry}
                />
              </div>
            </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleStep();
            }}
            className="w-[100%] rounded-[120px] h-14 text-gray-20 text-[16px] font-medium mb-6 bg-primary cursor-pointer"
          >
            Далі
          </button>
        </form>
      )}
    </div>
  );
};
