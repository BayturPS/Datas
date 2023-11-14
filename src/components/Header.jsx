import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("Add");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  return (
    <StyledHeader>
      <p className="logo">Contact App</p>
      <StyledHeaderRight>
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>

        <Link to="add">
          <p
            className={`${activeTab === "AddContact" ? "active" : ""}`}
            onClick={() => setActiveTab("AddContact")}
          >
            Add Contact
          </p>
        </Link>

        <Link to="about">
          <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
      </StyledHeaderRight>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  overflow: hidden;
  background-color: #f1f1f1;
  & p {
    float: left;
    color: black;
    text-align: center;
    padding: 10px;
    text-decoration: none;
    font-size: 18px;
    line-height: 15px;
    border-radius: 4px;
  }

  & p.logo {
    font-size: 25px;
    font-weight: bold;
    color: #4284f5;
  }

  & p:hover {
    background-color: #ddd;
    color: #5d6770;
  }

  p:active {
    background-color: dodgerblue;
    color: white;
  }
`;

const StyledHeaderRight = styled.div`
  float: right;
`;
