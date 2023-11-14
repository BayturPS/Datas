import React, { useEffect, useState } from "react";
import fireDb from "../firebase";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`contacts/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);

  return (
    <StyledCard>
      <StyledCardHeader>
        <p>User Contact Detail</p>
      </StyledCardHeader>
      <StyledContainer>
        <strong>ID: </strong>
        <span>{id}</span>
        <br />
        <br />
        <strong>Name:</strong>
        <span>{user.name}</span>
        <br />
        <br />
        <strong>Email: </strong>
        <span>{user.email}</span>
        <br />
        <br />
        <strong>Contact: </strong>
        <span>{user.contact}</span>
        <br />
        <br />
        <Link to="/">
          <StyledGoBack className="btn btn-edit">Go Back</StyledGoBack>
        </Link>
      </StyledContainer>
    </StyledCard>
  );
};

export default View;

const StyledCard = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(109, 109, 109);
  align-content: center;
  margin: 0 auto;
  border-radius: 9px;
  margin-top: 150px;
`;

const StyledCardHeader = styled.div`
  border-radius: 7px;
  height: 30%;
  background-color: #5d6770;
  color: white;
  text-align: center;
  & p {
    font-size: 20px;
  }
`;

const StyledContainer = styled.div`
  padding: 4px 16px;
`;

const StyledGoBack = styled.button`
  border: none;
  color: white;
  padding: 5px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  background-color: #008cba;
`;
