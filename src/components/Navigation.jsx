import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.navList}>
        <li className={classes.navItem}>
          <NavLink
            exact="true"
            to="/"
            className={({ isActive }) =>
              isActive ? classes.activeLink : classes.navLink
            }
          >
            Home
          </NavLink>
        </li>
        <li className={classes.navItem}>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? classes.activeLink : classes.navLink
            }
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
