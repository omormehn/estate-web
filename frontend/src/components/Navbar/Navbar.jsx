import React from "react";
import { FiMenu } from "react-icons/fi";
// import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { api } from "../../utils/api";
import { toast } from "react-toastify";
import {
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
 import { IoLogOutOutline } from "react-icons/io5";
 import { FaRegUser } from "react-icons/fa";

const NavbarMenu = [
  {
    id: 1,
    name: "Home",
    url: "/",
  },
  {
    id: 2,
    name: "About Us",
    url: "#about",
  },
  {
    id: 3,
    name: "Properties",
    url: "/properties",
  },
  {
    id: 4,
    name: "Contact Us",
    url: "#contact",
  },
];

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //sets defaults values of keys
  const [showMenu, setShowMenu] = React.useState(false);

  //  const [theme, setTheme] = React.useState(
  //    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  //  );

  const handleLogout = async () => {
    await api.post("/auth/logout");
    updateUser(null);
    toast.success("Logged out Successfully.");
    navigate("/");
  };


  // for changes
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // const toggleTheme = () => {
  //   setTheme(theme === "light" ? "dark" : "light");
  // };

  //  useEffect(() => {
  //    if (theme === "dark") {
  //      document.documentElement.classList.add("dark");
  //      localStorage.setItem("theme", "dark");
  //    } else {
  //      document.documentElement.classList.remove("dark");
  //      localStorage.setItem("theme", "light");
  //    }
  //  }, [theme]);

  // for scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > prevScrollPosition) {
        setIsNavbarHidden(true);
      } else if (scrollPosition < prevScrollPosition) {
        setIsNavbarHidden(false);
      }

      setPrevScrollPosition(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPosition]);

  //  navbar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.tar(".navbar")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <section
      className={`bg-black fixed w-full top-0 z-50 overflow-hidden   ${
        isNavbarHidden ? "hide" : ""
      }`}
    >
      <nav id="navbar">
        <div
          className={
            currentUser
              ? "flexCenter justify-between lg:justify-around gap-x-24 xs:gap-x-44 sm:gap-x-32 lg:gap-x-[15vw] md:gap-x-[20rem] xl:gap-x-[35vw]"
              : "flexCenter justify-between lg:justify-around gap-x-24 xs:gap-x-44 sm:gap-x-32 lg:gap-x-[1vw] md:gap-x-[20rem]"
          }
        >
          <Link to="/">
            <div className="lg:pr-28">
              <img
                src="./logo2.png"
                className="w-36 h-20 py-2 lg:w-56  lg:pr-10"
                alt="logo"
              />
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="list-none  hidden lg:flex lg:flex-row gap-8 text-white">
            {NavbarMenu.map((menu) => {
              if (currentUser) {
                return (
                  (menu.name === "Properties" || menu.name === "Profile") && (
                    <li key={menu.id} className="py-2 flex items-center gap-5">
                      <Link to={menu.url}>{menu.name}</Link>
                      <div className="flex gap-3 items-center">
                        <Menu>
                          <MenuHandler>
                            <div className="flex items-center gap-4 cursor-pointer">
                              <img
                                className="w-7 rounded-full"
                                src={currentUser.user.image || "image.png"}
                                alt=""
                              />
                              <p className="text-sm font-semibold">
                                {currentUser.user.username}
                              </p>
                            </div>
                          </MenuHandler>
                          <div className="absolute w-12">
                            <MenuList className="z- flex flex-col border-0 px-3 py-6 gap-2">
                              <div className="flex gap-2 items-center">
                                <FaRegUser />
                                <Link to="/profile">Profile</Link>
                              </div>
                              <div className="flex gap-2 items-center">
                                <IoLogOutOutline />
                                <p
                                  onClick={handleLogout}
                                  className="text-black font-normal cursor-pointer"
                                >
                                  Logout
                                </p>
                              </div>
                            </MenuList>
                          </div>
                        </Menu>
                      </div>
                    </li>
                  )
                );
              }
              // If no user is logged in, show all menu items
              return (
                <li key={menu.id} className="py-2">
                  {menu.url.startsWith("#") ? (
                    <a
                      href={menu.url}
                      onClick={(e) => {
                        e.preventDefault();
                        const section = document.querySelector(menu.url);
                        section.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {menu.name}
                    </a>
                  ) : (
                    <Link to={menu.url}>{menu.name}</Link>
                  )}
                </li>
              );
            })}

            {!currentUser && (
              <a href="/login" className="button grad">
                GET STARTED
              </a>
            )}
          </div>

          {/* MOBILE MENU */}
          <div className="flex flex-row lg:hidden navbar">
            <FiMenu
              className="text-3xl cursor-pointer sm:ml-48 mx-5 sm:mx-10 text-white"
              onClick={toggleMenu}
            />
            {showMenu && (
              <div>
                <div
                  className="fixed top-20 left-0 right-0 text-black
                               bg-white dark:bg-gray-900 dark:text-white shadow-md
                              rounded-b-xl z-50 py-10 "
                >
                  <ul
                    className="flex flex-col
                        items-center gap-4"
                  >
                    {NavbarMenu.map((menu) => {
                      if (currentUser) {
                        return (
                          menu.name === "Properties" && (
                            <li
                              key={menu.id}
                              className="py-2 flex flex-col  items-center gap-5"
                            >
                              <Link to={menu.url} >{menu.name} </Link>
                              {window.location.reload}
                              <div className=" gap-3 items-center">
                                <Menu>
                                  <MenuHandler>
                                    <div className="flex items-center gap-4 cursor-pointer">
                                      <img
                                        className="w-7 rounded-full"
                                        src={
                                          currentUser.user.image || "image.png"
                                        }
                                        alt=""
                                      />
                                      <p className="text-sm font-semibold">
                                        {currentUser.user.username}
                                      </p>
                                    </div>
                                  </MenuHandler>
                                  <div className="absolute w-12">
                                    <MenuList className="z-50 flex flex-col border-0 px-3 py-6 gap-2">
                                      <div className="flex gap-2 items-center">
                                        <FaRegUser />
                                        <Link to="/profile">Profile</Link>
                                      </div>
                                      <div className="flex gap-2 items-center">
                                        <IoLogOutOutline />
                                        <p
                                          onClick={handleLogout}
                                          className="text-black font-normal cursor-pointer"
                                        >
                                          Logout
                                        </p>
                                      </div>
                                    </MenuList>
                                  </div>
                                </Menu>
                              </div>
                            </li>
                          )
                        );
                      }
                      return (
                        <li key={menu.id} className="py-2">
                          {menu.url.startsWith("#") ? (
                            <a
                              href={menu.url}
                              onClick={(e) => {
                                e.preventDefault();
                                setShowMenu(false);
                                const section = document.querySelector(
                                  menu.url
                                );
                                section.scrollIntoView({ behavior: "smooth" });
                                
                              }}
                            >
                              {menu.name}
                            </a>
                          ) : (
                            <Link onClick={() => {
                              setShowMenu(false)
                            }} to={menu.url}>{menu.name}</Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  {!currentUser && (
                    <div className="flex justify-center">
                      <a href="/login" className=" button grad">
                        GET STARTED
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
