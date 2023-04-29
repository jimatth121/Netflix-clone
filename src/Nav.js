import React, { useEffect, useState } from "react";
import "./Nav.css";

const Nav = () => {
  const [showNav, setShowNav] = useState(false);

  const handleShow = () => {
    if (window.scrollY > 100) {

      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleShow);
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);

  return (
    <div className={`nav ${showNav ? "nav__black" : ""}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />
      <img
        className="nav__avata"
        src="https://i.pinimg.com/564x/44/78/1b/44781ba4ac0c63f2ecf0793a533bf8dc.jpg"
        alt="Netflix Avata"
      />
    </div>
  );
};

export default Nav;
