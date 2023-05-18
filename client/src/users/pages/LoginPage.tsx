import Joi from "joi";
import React from "react";
import useForm from "../../forms/hooks/useForm";
import Container from "@mui/material/Container";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Button } from "@mui/material";

type Data = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const initialLoginForm = {
    email: "",
    password: "",
  };

  const loginSchema = {
    email: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
  };

  const handleLogin = (data: Data) => {
    console.log(data);
    handleReset();
  };

  const { value, ...rest } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin
  );
  const { data, errors } = value;
  const { handleChange, handleReset, onSubmit, validateForm } = rest;

  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Form
        title="Login"
        onSubmit={onSubmit}
        onReset={handleReset}
        onFormChange={validateForm}
        spacing={1}>
        <Input
          label="email"
          name="email"
          data={data}
          error={errors.email}
          onInputChange={handleChange}
        />
        <Input
          label="password"
          name="password"
          data={data}
          error={errors.password}
          onInputChange={handleChange}
        />

        <Button variant="text" onClick={() => navigate(ROUTES.SIGNUP)}>
          {" "}
          register...
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;