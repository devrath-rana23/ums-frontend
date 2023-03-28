import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks";
import ImageUrls from "../../../utils/constants/ImageUrls";
import { Logout } from "../../../utils/Utils";

export const Header = () => {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [headerLinks, setHeaderLinks] = useState([
    { name: "Dashboard", link: "/dashboard", active: false },
    { name: "User Management", link: "/user", active: false },
  ]);

  useEffect(() => {
    const headerLinksCopy = headerLinks.map((item, index) => {
      return item.link === location.pathname
        ? { ...item, active: true }
        : { ...item, active: false };
    });
    setHeaderLinks(headerLinksCopy);
  }, []);

  const handleClick = (indexR, item) => {
    const headerLinksCopy = headerLinks.map((item, index) => {
      return index === indexR
        ? { ...item, active: true }
        : { ...item, active: false };
    });
    setHeaderLinks(headerLinksCopy);
    navigate(item.link);
  };

  return (
    <>
      <header className="p-5 flex justify-between shadow-lg sticky top-0 bg-white items-center">
        <h1>
          Welcome <strong>{user?.user?.name}</strong>
        </h1>
        <figure>
          <img src={ImageUrls.logo} className="h-10 w-10" alt="logo" />
        </figure>
        <ul className="flex justify-between gap-20 items-center">
          {headerLinks.map((item, index) => (
            <li
              onClick={() => handleClick(index, item)}
              key={index}
              className={`hover:text-orange-500 cursor-pointer ${item.active ? "text-orange-500" : ""
                }`}
            >
              <span>{item.name}</span>
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
