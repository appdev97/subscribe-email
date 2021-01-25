import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

const Header = () => {
  return (
    <div className="main-header">
      <Link to="/subscribe">
        <div className="main-header-menu">Subscribe</div>
      </Link>
      <Link to="/publish">
        <div className="main-header-menu">Publish</div>
      </Link>
    </div>
  );
};

export default Header;
