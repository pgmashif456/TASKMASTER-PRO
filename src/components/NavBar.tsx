 import React from "react";

import { Link } from "react-router-dom";

export const NavBar: React.FC = () => (

  <nav>

    <Link to="/">
      Dashboard
    </Link>

    {" | "}

    <Link to="/projects">
      Projects
    </Link>

  </nav>
);