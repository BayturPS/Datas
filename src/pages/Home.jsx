import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "./BaseUrl";
import styled from "styled-components";

const Home = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const dbRef = fireDb.child("contacts");

    const fetchData = (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    };
    dbRef.on("value", fetchData);
    return () => {
      dbRef.off("value", fetchData);
    };
  }, []);

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await fetch(`${BASE_URL}/${id}.json`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to save data");
        }
        toast.success("Contact Deleted Successfully");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <StyledTable className="styled-table">
        <thead>
          <tr>
            <StyledTh>No.</StyledTh>
            <StyledTh>Name</StyledTh>
            <StyledTh>Email</StyledTh>
            <StyledTh>Contact</StyledTh>
            <StyledTh>Actions</StyledTh>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <StyledTh scope="row">{index + 1}</StyledTh>
                <StyledTd>{data[id].name}</StyledTd>
                <StyledTd>{data[id].email}</StyledTd>
                <StyledTd>{data[id].contact}</StyledTd>
                <StyledTd>
                  <Link to={`/update/${id}`}>
                    <StyledEditBtn>Edit</StyledEditBtn>
                  </Link>

                  <StyledDeleteBtn onClick={() => onDelete(id)}>
                    Delete
                  </StyledDeleteBtn>

                  <Link to={`/view/${id}`}>
                    <StyledViewBtn className="btn btn-view">View</StyledViewBtn>
                  </Link>
                </StyledTd>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default Home;

const StyledTable = styled.table`
  border-collapse: collapse;
  margin: auto;
  font-size: 0.9rem;
  font-family: sans-serif;
  max-width: 800px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

  & > thead > tr {
    background-color: #009879;
    color: #ffffff;
  }
`;

const StyledTh = styled.th`
  padding: 12px 15px;
`;

const StyledTd = styled.td`
  padding: 12px 15px;
`;

const StyledEditBtn = styled.button`
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

const StyledDeleteBtn = styled.button`
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
  background-color: #f44336;
`;

const StyledViewBtn = styled.button`
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
  background-color: #e7e7e7;
  color: black;
`;
