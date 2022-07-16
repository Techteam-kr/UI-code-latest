import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import SideBarComponent from "../SideBar/SidebarComponent";
import { useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";
import "./Header.scss";
import LoginComponent from "../../Common/Login/LoginComponent/LoginComponent";
const Header = ({ isAdmin }) => {
  const navigator = useNavigate();
  const navigateToHome = () => {
    navigator("/");
  };
  const [admin, setAdmin] = useState(isAdmin);
  useEffect(() => {
    // if (!isAdmin) {
    let adminDetails = window.sessionStorage.getItem("Admin");
    let result = JSON.parse(adminDetails);
    setAdmin(result?.isAdmin);
    // }
  }, [isAdmin]);
  return (
    <header>
      {window.screen.width <= 1024 ? (
        <SideBarComponent admin={admin} navigateToHome={navigateToHome} />
      ) : (
        <div className="navigation" role="navigation">
          <div className="logo-block" onClick={navigateToHome}>
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
          </div>
          <nav>
            <ul className="list-n">
              <li>
                <NavLink exact activeClassName="active" to="/">
                  Home
                </NavLink>
              </li>
              {admin ? (
                <>
                  <li>
                    {" "}
                    <NavLink activeClassName="active" to="/dashboard">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/reports">
                      Reports
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  {" "}
                  <NavLink activeClassName="active" to="/my-account">
                    My Account
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink activeClassName="active" to="/faq">
                  FAQ
                </NavLink>
              </li>
              {/* <li className="enrollment-block">
                <NavLink to="/register">
                  <Button className="primary-orange">User Enrollment</Button>
                </NavLink>
              </li> */}
            </ul>
          </nav>

          <LoginComponent admin={admin} />
        </div>
      )}
    </header>
  );
};
export default Header;
