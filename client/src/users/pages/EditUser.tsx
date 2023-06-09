import React, {useEffect, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../providers/UserProvider";
import useHandleUsers from "../hooks/useHandleUsers";
import useForm from "../../forms/hooks/useForm";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/Joi/signupSchema";
import Container from "@mui/material/Container";
import UserForm from "../components/UserForm";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import normalizeUser from "../helpers/normalization/normalizeUser";
import PageHeader from "../../components/PageHeader";
import UserType from "../models/types/userType";
import Error from "../../components/Error";
import ErrorPage from "../../pages/ErrorPage";
import Spinner from "../../components/Spinner";

const EditUser = () => {
  const { user } = useUser();
  const { handleUpdateUser, handleGetUser, value: { isLoading, error} } = useHandleUsers();
  const { value, ...rest } = useForm(
    initialSignupForm,
    signupSchema,
    handleUpdateUser
  );
  const [DATA, setDATA] = useState<UserType | null>(null);
  
  useEffect(() => {
    if (user && user._id) {
      handleGetUser(user._id)
      .then((data) => {
        if (data) {
          setDATA(data);
        }
      })
      .catch((error) => {
        <Error errorMessage={error}/>
      });
    }
  }, []);
  
    if (isLoading) {
    return <Spinner/>
  }

  if (error) {
    return <ErrorPage/>
  }
  return (
    <Container>

    <PageHeader
      title="Edit User"
      subtitle="Here you can edit your profile details"
      />
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
    <Form
      onSubmit={rest.onSubmit}
      onReset={rest.handleReset}
      onFormChange={rest.validateForm}
      styles={{ maxWidth: "800px" }}
      title={"Update User"}
      to={ROUTES.CARDS}>
      <Input
        name="first"
        label="first name"
        error={value.errors.first}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
        />
      <Input
        name="middle"
        label="middle name"
        error={value.errors.middle}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
        required={false}
        />
      <Input
        name="last"
        label="last name"
        error={value.errors.last}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
        />
      <Input
        name="phone"
        label="phone"
        type="phone"
        error={value.errors.phone}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="email"
        label="email"
        type="email"
        error={value.errors.email}
        onInputChange={rest.handleInputChange}
        data={DATA ? { ...DATA, email: DATA.email } : value.data}
        breakPoints={{ sm: 6 }}
        />
      <Input
        name="password"
        label="password"
        type="password"
        error={value.errors.password}
        onInputChange={rest.handleInputChange}
        data={DATA ? { ...DATA, password: DATA.password } : value.data}
        breakPoints={{ sm: 6 }}
        />
      <Input
        name="url"
        label="image url"
        error={value.errors.url}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
        required={false}
        />
      <Input
        name="alt"
        label="image alt"
        error={value.errors.alt}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
        required={false}
        />
      <Input
        name="state"
        label="state"
        error={value.errors.state}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
        required={false}
      />
      <Input
        label="country"
        name="country"
        error={value.errors.country}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
        />
      <Input
        name="city"
        label="city"
        error={value.errors.city}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
        />
      <Input
        name="street"
        label="street"
        error={value.errors.street}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
        />
      <Input
        name="houseNumber"
        label="house Number"
        type="number"
        error={value.errors.houseNumber}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
        />
      <Input
        name="zip"
        label="zip"
        error={value.errors.zip}
        onInputChange={rest.handleInputChange}
        data={value.data}
        breakPoints={{ sm: 6 }}
        />
      <Grid item>
        <FormControlLabel
          name="isBusiness"
          control={
            <Checkbox
            value={value.data.isBusiness}
            color="primary"
            onChange={e =>
              rest.setData({ ...value.data, isBusiness: !!e.target.checked })
            }
            />
          }
          label="Change to business"
          />
      </Grid>
    </Form>
    </Container>
    </Container>
  );
};

export default EditUser;
