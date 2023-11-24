import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './assets/photo.png'

const Navbar = () => {
  const navigate=useNavigate()
  const [navExpanded, setNavExpanded] = useState(false);
  const logoutHandler=()=>{
    localStorage.removeItem('jwttoken')
    localStorage.removeItem('username')
    navigate('/login')
  }
  const toggleProfile=()=>{
    setNavExpanded(!navExpanded);
  }
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-end">
          <div className="inset-x-0 left-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  onClick={toggleProfile}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={logo}
                    alt=""
                  />
                </button>
              </div>
              {navExpanded ? (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <button
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </button>
                  <button
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2"
                    onClick={logoutHandler}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
