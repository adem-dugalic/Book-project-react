/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment } from "react";
import {
  FaFirstOrder,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { TiDocumentAdd, TiUserAddOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="relative top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg justify-between">
      <div className="">
        <SideBarIcon
          icon={<FaFirstOrder size="28" />}
          text="Dashboard"
          link="/"
        />
        <Divider />
        {user ? (
          <>
            <SideBarIcon
              icon={<TiDocumentAdd size="32" />}
              text="Add book"
              link="/addBook"
            />
            <SideBarIcon
              icon={<TiUserAddOutline size="32" />}
              text="Add Author"
              link="/addAuthor"
            />
          </>
        ) : (
          <></>
        )}
        {/* <SideBarIcon icon={<BsFillLightningFill size="20" />} />
        <SideBarIcon icon={<FaPoo size="20" />} />  */}
      </div>
      <div className="pb-2">
        <Divider />
        {!user ? (
          <Fragment>
            <SideBarIcon
              icon={<FaSignInAlt size="25" />}
              text="Log in"
              link="/login"
            />
            <SideBarIcon
              icon={<FaUser size="22" />}
              text="Register"
              link="/register"
            />
          </Fragment>
        ) : (
          <button className="ml-2" onClick={() => onLogout()}>
            <div className="sidebar-icon group">
              <FaSignOutAlt size="22" />
              <span className="sidebar-tooltip group-hover:scale-100">
                Logout
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

const SideBarIcon = ({ icon, text, link }) => (
  <Link to={link}>
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  </Link>
);

const Divider = () => <hr className="sidebar-hr bg-gray-900 border-0" />;
export default sidebar;
