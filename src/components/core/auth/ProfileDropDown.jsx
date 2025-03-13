import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { TbDashboardFilled } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../services/operations/authAPI";
import { LuShoppingCart } from "react-icons/lu";

const ProfileDropDown = ({ setMenuOpen }) => {
  const { user } = useSelector((state) => state.profile) || {};
  const { totalItems = 0 } = useSelector((state) => state.cart) || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout(navigate));
    setMenuOpen(false); // Close hamburger on logout
  };

  return (
    <div
      className="relative flex items-center text-white cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Shopping Cart for Students */}
      {user?.accountType === "Student" && (
        <div className="relative">
          <div className="absolute left-6 bottom-4 text-sm font-bold bg-red-500 rounded-full px-[6px]">
            {totalItems}
          </div>
          <LuShoppingCart
            className="h-7 w-8 mr-4"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/dashboard/cart");
              setMenuOpen(false); // Close hamburger on cart click
            }}
          />
        </div>
      )}

      {/* Profile Image */}
      <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={user?.image || "/default-profile.png"}
          alt="Profile"
        />
      </div>

      {/* Arrow Icon */}
      <div>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="z-[999] absolute top-[120%] left-[5%] w-32 rounded-lg bg-richblack-800 border text-white flex flex-col px-[10px] py-4 "
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to="/dashboard"
            className="flex gap-2 items-center hover:text-gray-300"
            onClick={() => setMenuOpen(false)} // Close hamburger on Dashboard click
          >
            <TbDashboardFilled /> Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center hover:text-gray-300 mt-2"
          >
            <IoLogOutOutline /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
