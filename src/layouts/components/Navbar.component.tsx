import { NavLink } from "react-router-dom";

import type { FC } from "react";

import "./Navbar.style.scss";

const navLinks = [
  { title: "Criminals", to: "/" },
  { title: "Wanted", to: "/Wanted" },
];

const NavBar: FC = () => {
  return (
    <>
      <div className="navbar">
        {navLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.to}
            className={({ isActive }) =>
              `navbar__link ${isActive ? "navbar__link-active" : ""}`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>
      <div className="navbar__blocker" />
    </>
  );
};

export default NavBar;
