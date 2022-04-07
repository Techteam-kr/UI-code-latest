import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import SideBarComponent from "../SideBar/SidebarComponent";
import "./Header.scss";
const Header = () => {
  return (
    <header>
      {window.screen.width < 767 ? (
        <SideBarComponent />
      ) : (
        <div className="navigation" role="navigation">
          <div className="logo-block">
            <img
              className="logo-img"
              src="static/images/karnataka_govt_logo1.png"
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
              <li>
                <NavLink activeClassName="active" to="/faq">
                  FAQ
                </NavLink>
              </li>
              <li className="enrollment-block">
                <NavLink to="/register">
                  <Button className="primary-orange">User Enrollment</Button>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
export default Header;