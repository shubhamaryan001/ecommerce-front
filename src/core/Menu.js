import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./cartHelpers";
import "../index.css";
import { FaUserCircle } from "react-icons/fa";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const { user } = isAuthenticated();

const Menu = ({ history }) => (
  <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-primary">
    <a class="navbar-brand" href="/">
      <img
        src="http://codingheroes.io/resources/img/logo-light-small.png"
        width="250"
        height="auto"
        class="d-inline-block align-top"
        alt=""
      />
      -Bootstrap
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item active">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/about-us")}
            to="/about-us"
          >
            About Us
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/cart")}
            to="/cart"
          >
            Cart
            <sup>
              <large className="cart-badge">{itemTotal()}</large>
            </sup>
          </Link>
        </li>
      </ul>

      {!isAuthenticated() && (
        <ul className="navbar-nav navdrop">
          <li className="nav-item active">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              SignUp
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              SignIn
            </Link>
          </li>
        </ul>
      )}

      {isAuthenticated() && (
        <ul className="navbar-nav navdrop">
          <li className="nav-item  dropdown">
            <Link
              className="nav-link  dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FaUserCircle className="FaUserCircle" />
              {isAuthenticated().user.name}
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                  <Link className="dropdown-item" to="/user/dashboard">
                    Profile
                  </Link>
                </li>
              )}

              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <>
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/admin/dashboard">
                      Admin Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="dropdown-item" to="/user/dashboard">
                      User Dashboard Profile
                    </Link>
                  </li>
                  <Link className="dropdown-item" to="/admin/orders">
               Manage Orders
              </Link>
                </>
              )}

              <Link className="dropdown-item" to="/user/dashboard/orders">
                Orders
              </Link>
              <div className="dropdown-divider"></div>
              <Link
                className="dropdown-item"
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                Logout
              </Link>
            </div>
          </li>
        </ul>
      )}
    </div>
  </nav>
);

export default withRouter(Menu);
