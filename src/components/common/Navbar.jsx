import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoFullLight from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links.js";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setToken } from '../store/reducers/authReducer.jsx';
import { PiShoppingCart } from "react-icons/pi";
import ProfileDropDown from "../core/auth/ProfileDropDown.jsx";
import { apiConnector } from "../../services/apiConnector.js";
import { categories } from '../../services/api.js';
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);
  const { totalItems } = useSelector(state => state.cart);
  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Categories result are:", result);
      setSubLinks(result.data.allCategory);
      console.log(subLinks)
    } catch (error) {
      console.log("Could not find the category list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className='h-14 flex items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800'>
      <div className='w-[70%] max-w-maxContent flex items-center justify-between '>
        <Link to={"/"}>
          <img src={LogoFullLight} alt="Logo" />
        </Link>
        <nav className='flex gap-4 font-bold'>
          {NavbarLinks.map((e, i) => (
            e.title === "Catalog" ? (
              <div className='text-white text-lg flex relative items-center gap-1 group cursor-pointer' key={i}>
                <p>{e.title}</p>
                <IoIosArrowDown />
                <div className='z-[999] flex flex-col gap-1 font-inter absolute rounded-md bg-richblack-5 text-richblack-900 p-4 w-[200px] top-[110%] left-[-42%] invisible opacity-0
                              transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:cursor-pointer
                            '>
                  {Array.isArray(subLinks) && subLinks.map((e, i) => (
                    <Link key={i} to={`/catalog/${e.name.split(" ")
                      .join("-")
                      .toLowerCase()}`}>
                      {e.name}
                    </Link>
                  ))}
                  <div className='w-6 h-6 absolute rounded bg-richblack-5 top-0 left-[50%] translate-y-[-15%] rotate-45'></div>
                </div>
              </div>
            ) : (
              <NavLink key={i} to={`${e.path}`} className={({ isActive }) =>
                `text-white text-lg ${isActive ? "text-yellow-25" : "text-white"}`
              }>
                {e.title}
              </NavLink>
            )
          ))}
        </nav>
        <div className='flex items-center gap-8'>
          {user && user?.accountType === "Instructor" && (
            <Link to={"/dashboard/cart"} className='relative'>
              {/* <PiShoppingCart className='text-richblack-5 w-6 h-6'/> */}
              {totalItems > 0 && (
                <span>{totalItems}</span>
              )}
            </Link>
          )}
          {
            token === null && (
              <Link to={"/login"} className='text-richblack-100 text-lg bg-richblack-800 px-5 py-1 rounded-md border '>Login</Link>
            )
          }
          {
            token === null && (
              <Link to={"/signup"} className='text-richblack-100 text-lg bg-richblack-800 px-5 py-1 rounded-md border'>Sign Up</Link>
            )
          }
          {
            token !== null && user && (
              <ProfileDropDown />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;