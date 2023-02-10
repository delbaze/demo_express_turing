import { NavLink, useNavigate } from "react-router-dom";
import React from "react";

const activeStyle = "bg-cream text-pink font-bold";
const inactiveStyle = " hover:underline ";
const sharedStyle = " p-3 pb-4 rounded-md transition-all ";

export default function Header() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };
  return (
    <header className="pt-4">
      <div className="container">
        <h1 className="mb-5">📕 Wilders Book</h1>
        <nav className="c">
          <ul className="flex">
            <li className="mr-2 h-8">
              <NavLink
                end
                className={({ isActive }) =>
                  (isActive || window.location.pathname.startsWith("/wilders")
                    ? activeStyle
                    : inactiveStyle) + sharedStyle
                }
                to={"/"}
              >
                People
              </NavLink>
            </li>

            <li className="mr-2 h-8">
              <NavLink
                end
                className={({ isActive }) =>
                  (isActive ? activeStyle : inactiveStyle) + sharedStyle
                }
                to={"/skills"}
              >
                Skills
              </NavLink>
            </li>
            <li className="mr-2 h-8">
              <NavLink
                end
                className={({ isActive }) =>
                  (isActive ? activeStyle : inactiveStyle) + sharedStyle
                }
                to={"/backoffice/dashboard"}
              >
                Backoffice
              </NavLink>
            </li>
            <li className="mr-2 h-8">
              <button onClick={handleLogOut}>Se déconnecter</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
