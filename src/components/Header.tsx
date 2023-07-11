import { NavLink } from "react-router-dom";
import { AuthContextType, useAuth } from "../security/AuthContext";

const Header = () => {
  const auth = useAuth() as AuthContextType;

  const logout = () => {
    auth.logout();
  };

  const token = localStorage.getItem("token");
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a className="flex items-center" href="/home">
            <img
              src="src\assets\logo11.png"
              className="mr-3 h-6 sm:h-9"
              alt="Thoughts"
            />
          </a>

          <div className="flex items-center lg:order-2">
            {!(token !== null) && (
              <NavLink
                to={"/login"}
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                Log in
              </NavLink>
            )}
            {!(token !== null) && (
              <NavLink
                to={"/signup"}
                className="text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none">
                Get started
              </NavLink>
            )}
            {token !== null && (
              <NavLink
                onClick={() => logout()}
                to={"/login"}
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 ">
                Log Out
              </NavLink>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                {token !== null && (
                  <NavLink
                    to={"/home"}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page">
                    Home
                  </NavLink>
                )}
              </li>
              <li>
                {token !== null && (
                  <NavLink
                    to={"/profile"}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    Profile
                  </NavLink>
                )}
              </li>
              <li>
                {token !== null && (
                  <NavLink
                    to={"/write"}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    Write
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
