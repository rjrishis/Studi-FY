import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { TbDashboardFilled } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../services/operations/authAPI";
import { LuShoppingCart } from "react-icons/lu";

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile) || {};
  const { totalItems = 0 } = useSelector((state) => state.cart) || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="w-full h-full flex gap-1 items-center text-white relative group z-[999]">
      {/* Shopping Cart for Students */}
      {user?.accountType === "Student" && (
        <div className="relative">
          <div className="absolute left-6 bottom-4 text-sm font-bold bg-red-5 rounded-full px-[6px]">
            {totalItems}
          </div>
          <LuShoppingCart
            className="h-7 w-8 mr-4 cursor-pointer"
            onClick={() => navigate("/dashboard/cart")}
          />
        </div>
      )}

      {/* Profile Image */}
      <div className="w-10 h-10 rounded-full bg-red-5 text-white text-center overflow-hidden object-cover">
        <img
          className="object-cover aspect-square"
          src={user?.image || "/default-profile.png"} // Fallback image
          alt="Profile"
        />
      </div>

      {/* Arrow Icon */}
      <div className="group-hover:hidden">
        <IoIosArrowUp />
      </div>
      <div className="hidden group-hover:block">
        <IoIosArrowDown />
      </div>

      {/* Dropdown Menu */}
      <div
        className="w-32 rounded-lg bg-richblack-800 border absolute top-[120%] left-[-42%] flex flex-col px-[10px] py-4 
        invisible opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:cursor-pointer"
      >
        <Link to={"/dashboard"} className="text-richblack-5 flex gap-1 items-center">
          <TbDashboardFilled />
          <h1 className="text-richblack-5">Dashboard</h1>
        </Link>

        <Link onClick={handleClick} to={"/"} className="flex gap-1 items-center text-richblack-5">
          <IoLogOutOutline />
          <h1 className="text-richblack-5">Logout</h1>
        </Link>
      </div>
    </div>
  );
};

export default ProfileDropDown;
