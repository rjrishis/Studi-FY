import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { PiShoppingCart } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for the hamburger menu
import LogoFullLight from "../../assets/Logo/Logo-Full-Light.png";
import ProfileDropDown from "../core/auth/ProfileDropDown.jsx";
import { NavbarLinks } from "../../data/navbar-links.js";
import { apiConnector } from "../../services/apiConnector.js";
import { categories } from "../../services/api.js";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(window.innerWidth <= 1000);

  // Function to check screen width
  useEffect(() => {
    const handleResize = () => {
      setShowHamburger(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.allCategory);
    } catch (error) {
      console.error("Could not fetch categories");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <header className="h-14 flex items-center justify-center border-b border-richblack-700 bg-richblack-800">
      <div className="w-[90%] max-w-[1200px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src={LogoFullLight} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        {!showHamburger && (
          <nav className="flex gap-6 font-bold">
            {NavbarLinks.map((e, i) =>
              e.title === "Catalog" ? (
                <div
                  className="text-white text-lg flex relative items-center gap-1 group cursor-pointer"
                  key={i}
                >
                  <p>{e.title}</p>
                  <IoIosArrowDown />
                  <div
                    className="z-[999] flex flex-col gap-1 font-inter absolute rounded-md bg-richblack-5 text-richblack-900 p-4 w-[200px] top-[110%] left-[-42%] invisible opacity-0
                    transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:cursor-pointer"
                  >
                    {Array.isArray(subLinks) &&
                      subLinks.map((e, i) => (
                        <Link
                          key={i}
                          to={`/catalog/${e.name.split(" ").join("-").toLowerCase()}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          {e.name}
                        </Link>
                      ))}
                    <div className="w-6 h-6 absolute rounded bg-richblack-5 top-0 left-[50%] translate-y-[-15%] rotate-45"></div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={i}
                  to={e.path}
                  className={({ isActive }) =>
                    `text-lg ${isActive ? "text-yellow-50" : "text-white"}`
                  }
                >
                  {e.title}
                </NavLink>
              )
            )}
          </nav>
        )}

        {/* Right Section (Profile, Cart, Login/Signup) */}
        {!showHamburger && (
          <div className="flex items-center gap-6">
            {user && user?.accountType === "Instructor" && (
              <Link to="/dashboard/cart" className="relative" onClick={() => setMenuOpen(false)}>
                <PiShoppingCart className="text-white w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token ? (
              <ProfileDropDown />
            ) : (
              <>
                <Link to="/login" className="text-white text-lg bg-richblack-700 px-5 py-1 rounded-md border" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="text-white text-lg bg-richblack-700 px-5 py-1 rounded-md border" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}

        {/* Hamburger Menu Button (Mobile) */}
        {showHamburger && (
          <button className="text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        )}

        {/* Mobile Menu */}
        {menuOpen && showHamburger && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center gap-6 text-white text-xl text-center">
            {NavbarLinks.map((e, i) => (
              <NavLink
                key={i}
                to={e.path}
                className="hover:text-yellow-400"
                onClick={() => setMenuOpen(false)}
              >
                {e.title}
              </NavLink>
            ))}
            {/* Profile Dropdown or Login/Signup */}
            {token ? (
               <ProfileDropDown setMenuOpen={setMenuOpen} />
            ) : (
              <div className="flex flex-col gap-4 mt-6">
                <Link to="/login" className="text-white text-lg bg-richblack-700 px-6 py-2 rounded-md border" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="text-white text-lg bg-richblack-700 px-6 py-2 rounded-md border" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
            {/* Close Button */}
            <button className="absolute top-6 right-6 text-white text-3xl" onClick={() => setMenuOpen(false)}>
              <FiX />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
