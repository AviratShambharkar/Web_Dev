import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 w-full z-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
        <Link to="/home" className="text-2xl font-bold">
          HackathonHub
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/explore1" className="hover:text-gray-400">
            Explore 1
          </Link>
          <Link to="/explore2" className="hover:text-gray-400">
            Explore 2
          </Link>
          <Link to="/explore3" className="hover:text-gray-400">
            Explore 3
          </Link>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-1 hover:text-gray-400">
              <span>Account</span>
              <ChevronDownIcon className="w-5 h-5" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`${
                        active ? "bg-gray-600" : ""
                      } block px-4 py-2 text-sm`}
                    >
                      My Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/edit-profile"
                      className={`${
                        active ? "bg-gray-600" : ""
                      } block px-4 py-2 text-sm`}
                    >
                      Edit Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? "bg-gray-600" : ""
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
