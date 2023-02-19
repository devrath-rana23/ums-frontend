import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks";
import ImageUrls from "../../../utils/constants/ImageUrls";
import { Logout } from "../../../utils/Utils";

export const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [headerLinks, setHeaderLinks] = useState([
    { name: "Dashboard", link: "/dashboard", active: true },
    { name: "User Management", link: "/user", active: false },
  ]);

  const handleClick = (indexR) => {
    const headerLinksCopy = headerLinks.map((item, index) => {
      return index === indexR
        ? { ...item, active: true }
        : { ...item, active: false };
    });
    setHeaderLinks(headerLinksCopy);
  };

  return (
    <>
      <header className="p-5 flex justify-between bg-red-50">
        <h1>
          Welcome <strong>{user?.user?.name}</strong>
        </h1>
        <figure>
          <img src={ImageUrls.logo} className="h-10 w-10" alt="logo" />
        </figure>
        <ul className="flex justify-between gap-20 items-center">
          {headerLinks.map((item, index) => (
            <li
              onClick={() => handleClick(index)}
              key={index}
              className={`hover:text-orange-500 cursor-pointer ${
                item.active ? "text-orange-500" : ""
              }`}
            >
              <span onClick={() => navigate(item.link)}>{item.name}</span>
            </li>
          ))}
          <li
            className="hover:text-orange-500 cursor-pointer"
            onClick={() => {
              Logout(setUser);
            }}
          >
            Logout
          </li>
        </ul>
      </header>
    </>
  );
};
