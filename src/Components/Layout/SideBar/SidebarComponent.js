import { useState } from "react";
import { NavLink } from "react-router-dom";
import LoginComponent from "../../Common/Login/LoginComponent/LoginComponent";
import "./SidebarComponent.scss";
const SideBarComponent = ({ navigateToHome, admin }) => {
  const [sideBarOpen, setsideBarOpen] = useState(false);
  const openMenuHandler = () => {
    setsideBarOpen((sideBarOpen) => !sideBarOpen);
  };
  return (
    <>
      <div
        id="mySidenav"
        className={!sideBarOpen ? "sidenav" : "sidenav open-side-nav"}
      >
        <span className="closebtn" onClick={openMenuHandler}>
          &times;{" "}
        </span>
        <NavLink onClick={openMenuHandler} to="/">
          Home
        </NavLink>
        {admin ? (
          <>
            <NavLink onClick={openMenuHandler} to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink onClick={openMenuHandler} to="/reports">
              Reports
            </NavLink>
          </>
        ) : (
          <>
            {" "}
            <NavLink onClick={openMenuHandler} to="/my-account">
              My Account
            </NavLink>
          </>
        )}
      </div>
      <span className="hambergur-menu" onClick={openMenuHandler}>
        &#9776;{" "}
      </span>
      <span className="logo-block" onClick={navigateToHome}>
        <img
          className="logo-img"
          src="static/images/central-logo.png"
          alt="logo"
        />
        <img
          className="logo-img"
          src="static/images/govt-symbol.png"
          alt="logo"
        />
      </span>
      <div className="action-block">
        {/* <Button className="primary-orange">
          <SVG
            cacheRequests={true}
            src={`/static/svg/person_add_alt_white_24dp.svg`}
          />
        </Button> */}
        {<LoginComponent admin={admin} />}
      </div>
    </>
  );
};
export default SideBarComponent;
