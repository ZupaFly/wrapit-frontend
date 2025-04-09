import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

/* eslint-disable react/react-in-jsx-scope */
export const Shop = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex-grow px-10">
      <div className="flex mt-16 justify-between items-center">
        <h2 className="text-[64px] uppercase font-bold text-gray-100">магазин</h2>
        <button className="border rounded-[80px] h-11 w-50 cursor-pointer">Фільтри</button>
      </div>
        <div>hello {user.firstName}</div>
        <div>Here is you phone number: {user.email}</div>
    </div>
  )
}
