import React from "react";
import icon from "./favicon-32x32.png";
import { Link } from "react-router-dom";

const Navbar = ({ connectToMetamask, isConnected }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <img src={icon} alt="" />
        <Link to="/" className="navbar-brand ml-2">
          Logo
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNav" className="collapse navbar-collapse">
          <ul
            // style={{ fontSize: "0.8rem", letterSpacing: "0.2rem" }}
            className="navbar-nav ml-auto"
          >
            <li className="nav-item">
              <Link to="/" className="nav-link">
                DASHBOARD
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mint" className="nav-link">
                MARKETPLACE
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/marketplace" className="nav-link">
                TRAINING
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/my-tokens" className="nav-link">
                PACKS
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            {isConnected ? (
              <li>
              <Link to="/account" className="nav-link">
                my account
              </Link>
            </li>
            ):(
              <li>
              <a onClick={connectToMetamask}>
                connect
              </a>
            </li>
            
            )}
            
            

          </form>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
