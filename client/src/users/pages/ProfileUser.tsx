import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useHandleUsers from '../hooks/useHandleUsers';
import Spinner from '../../components/Spinner';
import Error from "../../components/Error";
import { getUser } from '../service/localStorage';
import UserType from '../models/types/userType';
import { useUser } from '../providers/UserProvider';
import { Container } from '@mui/material';
import PageHeader from '../../components/PageHeader';

const ProfilePage = () => {
  const { handleGetUser, value } = useHandleUsers();
  const { error, isLoading } = value;
  const { user } = useUser();

  const userId = user?._id || '';
  const [userData, setUserData] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetUser(userId);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <Container>
    <PageHeader
      title="Profile Page"
      subtitle="Here you can see your Profile"
    />
    <div className="profile-page">
      <div className="profile-container">
        <img src={userData?.image.url} alt={userData?.image.alt} style={{ width: "200px" }} />
        <div className="profile-info center">
          <div className="profile-row">
            <h3>Name:</h3>
            <p>{userData?.name.first}</p>
          </div>
          <div className="profile-row">
            <h3>Last Name:</h3>
            <p>{userData?.name.last}</p>
          </div>
          <div className="profile-row">
            <h3>Phone:</h3>
            <p>{userData?.phone}</p>
          </div>
          <div className="profile-row">
            <h3>Email:</h3>
            <p>{userData?.email}</p>
          </div>
          <div className="profile-row">
            <h3>Country:</h3>
            <p>{userData?.address.country}</p>
          </div>
          <div className="profile-row">
            <h3>State:</h3>
            <p>{userData?.address.state}</p>
          </div>
          <div className="profile-row">
            <h3>City:</h3>
            <p>{userData?.address.city}</p>
          </div>
          <div className="profile-row">
            <h3>Street:</h3>
            <p>{userData?.address.street}</p>
          </div>
          <div className="profile-row">
            <h3>House Number:</h3>
            <p>{userData?.address.houseNumber}</p>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default ProfilePage;
