import { Outlet } from "react-router-dom";
import ImageUrls from "../../../utils/constants/ImageUrls";

export const Unauthorized = (props) => {
  const { logoBig } = ImageUrls;
  return (
    <div className="h-screen flex">
      <section className="flex-[1] flex justify-between items-center flex-col">
        <section className="flex flex-col h-full justify-center">
          <div className="self-center">
            <h1 className="text-2xl font-bold mb-16 leading-[120%] text-center tracking-[0.06em] text-[#f8950a]">
              UMS
            </h1>
          </div>
          {props.children ?? <Outlet />}
        </section>
        <section className="mb-[56px]">
          <figure className="">
            <img className="w-[92px] h-[70px]" src={logoBig} alt="logo" />
          </figure>
        </section>
      </section>
      <section
        className="flex-[1]"
        style={{
          background:
            "linear-gradient(211.35deg,#b87d1e 11.53%,rgba(255, 165, 9, 0.46) 116.72%)",
        }}
      ></section>
    </div>
  );
};
