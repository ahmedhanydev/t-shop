import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import logo from "../../assets/images/logo.png";
import userIcon from "../../assets/icons/user.svg";
import heartIcon from "../../assets/icons/heart.svg";
import shoppingIcon from "../../assets/icons/shopping cart.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cart from "./../../Pages/Cart";
import NavbarSearchHook from "../../hook/search/navbar-search-hook";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedUser } from "../../redux/actions/authAction";
import { Badge } from "primereact/badge";
import GetAllUserCart from "../../hook/cart/get-all-user-cart-hook";
const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Categories", href: "/categories", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Navbar = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [onChangeSearchWord, searchWord] = NavbarSearchHook();
  const [user, setUser] = useState("");
  let word = "";
  if (localStorage.getItem("searchWord") != null) {
    word = localStorage.getItem("searchWord");
  }

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser("");
  };
  // const res = useSelector((state) => state.authReducer.userData);

  useEffect(() => {
    // const run = async () => {
    //   await dispatch(getLoggedUser());
    // };

    // run();
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const [cartNum] = GetAllUserCart();
  const openCart = () => {
    navigate("/cart");
  };
  const [isLogged, setIsLogged] = useState(false);
  const activeLink =
    " bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium";
  const normalLink =
    " hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";
  const activeLinkMobile =
    "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium";
  const normalLinkMobile =
    "text-gray-800 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium";
  return (
    <>
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl  px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-24 border-b-2 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex flex-1 items-center  lg:justify-center pl-5 sm:items-stretch sm:justify-start">
                  {/* logo */}
                  <Link to="/" className="flex flex-shrink-0  items-center">
                    <img
                      className="block h-44 w-auto lg:hidden"
                      src={logo}
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-44 w-auto lg:block"
                      src={logo}
                      alt="Your Company"
                    />
                  </Link>

                  {/* navigation  */}
                  <div className="hidden sm:ml-6  sm:block">
                    <div className="flex space-x-4  sm:space-x-1 mt-[70px] sm:ml-[0px] ml-10">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            isActive ? activeLink : normalLink
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                {/* search bar */}

                <span className=" p-input-icon-left hidden  lg:mr-14 lg:block ">
                  <i className="pi pi-search " />
                  <InputText
                    value={word}
                    onChange={onChangeSearchWord}
                    placeholder="Search"
                    className="h-10 "
                    style={{ backgroundColor: "#F6F6F6" }}
                  />
                </span>

                {/* icons */}
                <div className="absolute inset-y-0 right-0 flex  items-center lg:pr-2 sm:static sm:inset-auto sm:ml-6 ">
                  {/* shopping icon */}
                  <button
                    onClick={() => openCart()}
                    className="flex rounded-lg h-10 w-10 mr-3  items-center justify-center bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800"
                  >
                    <i
                      className="pi text-[#959394]  pi-shopping-cart p-overlay-badge"
                      style={{ fontSize: "1.6rem" }}
                    >
                      <Badge value={cartNum || 0} severity="danger"></Badge>
                    </i>
                  </button>

                  {/* wishlist icon */}
                  <NavLink
                    to="/user/wishlist"
                    className="flex rounded-lg h-10 w-10 items-center justify-center bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800"
                  >
                    <img
                      src={heartIcon}
                      className="h-6 w-6 rounded-full"
                      alt=""
                    />
                  </NavLink>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-lg h-10 w-10  items-center justify-center bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-6 w-6 rounded-full"
                          src={userIcon}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {user ? (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {user.role === "admin" ? (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/admin"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Dashboard
                                </Link>
                              )}
                            </Menu.Item>
                          ) : (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/user"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  My Profile
                                </Link>
                              )}
                            </Menu.Item>
                          )}

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={logOut}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      ) : (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Login
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/signup"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign up
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      )}
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            {/* navigation mobile */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      isActive ? activeLinkMobile : normalLinkMobile
                    }
                    // className={classNames(
                    //   item.current
                    //     ? "bg-gray-900 text-white"
                    //     : "text-gray-800 hover:bg-gray-700 hover:text-white",
                    //   "block rounded-md px-3 py-2 text-base font-medium"
                    // )}
                    // aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
