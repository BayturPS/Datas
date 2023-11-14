import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "./BaseUrl";
import styled from "styled-components";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState([]);

  const { name, email, contact } = state;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact) {
      toast.error("Please provide a value in each input field");
    } else {
      if (id) {
        updateContact({ id, data: state });
      } else {
        try {
          const response = await fetch(`${BASE_URL}.json`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
          });
          if (!response.ok) {
            throw new Error("Failed to save data");
          }
          toast.success("Contact Added Successfully");
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}.json`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        const loadedData = [];

        for (const key in responseData) {
          loadedData.push({
            id: key,
            name: responseData[key].name,
            email: responseData[key].email,
            contact: responseData[key].contact,
          });
        }
        setData(loadedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const { id } = useParams();

  const updateContact = async ({ id, data }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}.json`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to save data");
      }
      toast.success("Contact Updated Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getById = async () => {
    const res = await fetch(`${BASE_URL}/${id}.json`);
    const data = await res.json();
    setState({ name: data.name, email: data.email, contact: data.contact });
  };

  useEffect(() => {
    if (id) {
      getById();
    }
  }, [id]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <StyledInput
        type="text"
        id="name"
        name="name"
        placeholder="Your Name..."
        value={name}
        onChange={handleInputChange}
      />

      <label htmlFor="email">Email</label>
      <StyledInput
        type="email"
        id="email"
        name="email"
        placeholder="Your Email..."
        value={email}
        onChange={handleInputChange}
      />

      <label htmlFor="contact">Contact</label>
      <StyledInput
        type="number"
        id="contact"
        name="contact"
        placeholder="Your Contact..."
        value={contact}
        onChange={handleInputChange}
      />

      <StyledSaveBtn
        type="submit"
        value={id ? "Update" : "Save"}
        // onClick={value === "Update" ? () => updateContact(id) : ""}
      />
    </StyledForm>
  );
};

export default AddEdit;

const StyledForm = styled.form`
  margin: auto;
  padding: 15px;
  max-width: 400px;
  align-content: center;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;

const StyledInput = styled.input`
  margin: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledSaveBtn = styled.input`
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;
