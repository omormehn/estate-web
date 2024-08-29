import React from "react";
import { FiMenu } from "react-icons/fi";
// import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useEffect, useState } from "react";

const NavbarMenu = [
  {
    id: 1,
    name: "Home",
    url: "/",
  },
  {
    id: 2,
    name: "About Us",
    url: "/about",
  },
  {
    id: 3,
    name: "Properties",
    url: "/properties",
  },
  {
    id: 4,
    name: "Contact Us",
    url: "/contact",
  },
];

const Navbar = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  //sets defaults values of keys
  const [showMenu, setShowMenu] = React.useState(false);

  //  const [theme, setTheme] = React.useState(
  //    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  //  );

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
      if (!event.target.closest(".navbar")) {
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
        <div className="flexCenter justify-around gap-x-[5rem] lg:gap-x-[10vw] md:gap-x-[15rem] xl:gap-x-[25vw] ">
          <img
            src="./logo2.png"
            className="w-40 h-20 py-2 lg:w-56"
            alt="logo"
          />

          {/* DESKTOP MENU */}
          <div className="list-none  hidden lg:flex lg:flex-row gap-8 text-white">
            {NavbarMenu.map((menu) => (
              <li key={menu.id} className="py-2">
                <a href={menu.url}>{menu.name}</a>
              </li>
            ))}
            <a href="" className="button grad">
              GET STARTED
            </a>
            {/* {theme == "dark" ? (
              <BiSolidSun
                className="text-2xl dark:text-white"
                onClick={toggleTheme}
              />
            ) : (
              <BiSolidMoon
                className="text-2xl z-50 text-white "
                onClick={toggleTheme}
              />
            )} */}
          </div>

          {/* MOBILE MENU */}
          <div className="flex flex-row lg:hidden navbar">
            {/* {theme == "dark" ? (
              <BiSolidSun
                className="text-2xl dark:text-white"
                onClick={toggleTheme}
              />
            ) : (
              <BiSolidMoon className="text-2xl " onClick={toggleTheme} />
            )} */}

            <FiMenu
              className="text-3xl cursor-pointer sm:ml-48 mx-5 sm:mx-10 text-white"
              onClick={toggleMenu}
            />
            {showMenu && (
              <div
                
              >
                <div
                  className="fixed top-20 left-0 right-0 text-black
                               bg-white dark:bg-gray-900 dark:text-white shadow-md
                              rounded-b-xl z-50 py-10 "
                >
                  <ul
                    className="flex flex-col
                        items-center gap-4"
                  >
                    {NavbarMenu.map((menu) => (
                      <li key={menu.name}>
                        <a
                          href={menu.url}
                          className="text-xl font-semibold px-2 py-4 md:py-6 inline-block cursor-pointer"
                        >
                          {menu.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="flexCenter">
                    <a href="" className=" button grad ">
                      GET STARTED
                    </a>
                  </div>
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
