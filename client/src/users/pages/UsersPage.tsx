import React, { useEffect, useState } from 'react';
import { useUser } from '../providers/UserProvider';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import useHandleUsers from '../hooks/useHandleUsers';
import DeleteIcon from "@mui/icons-material/Delete";
import Spinner from '../../components/Spinner';
import ErrorPage from '../../pages/ErrorPage';
import UserType, {  UsersType } from '../models/types/userType';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { STYLED_TABLE_BODY, STYLED_TABLE_HEAD } from '../helpers/styles/styles';
import IconButton from '@mui/material/IconButton';
import { Container } from '@mui/material';
import PageHeader from '../../components/PageHeader';



const UsersPage = () => {
  const {user} = useUser()
  
  useEffect(() => {
    handleGetUsers();
  }, []);
  
  const { handleChangeStatus, handleDeleteUser, handleGetUsers, value: { isLoading, error, users } } = useHandleUsers();
  
  if (isLoading) {
    return <Spinner/>
  }

  if (error) {
    return <ErrorPage/>
  }
  return ( 
    <Container>
    <PageHeader
      title="CRM"
      subtitle="Here you can see details of all users"
    />
    <div className='CRM'>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700, mt:"20px" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell sx={STYLED_TABLE_HEAD}>ID</TableCell>
            <TableCell sx={STYLED_TABLE_HEAD} align="right">Name</TableCell>
            <TableCell sx={STYLED_TABLE_HEAD} align="right">Email</TableCell>
            <TableCell sx={STYLED_TABLE_HEAD} align="right">Phone</TableCell>
            <TableCell sx={STYLED_TABLE_HEAD} align="right">Address</TableCell>
            <TableCell sx={STYLED_TABLE_HEAD} align="right">User Type</TableCell>
            <TableCell sx={STYLED_TABLE_HEAD} align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {users?.map((user: UsersType) => (
            <TableRow key={user._id}>
              <TableCell sx={STYLED_TABLE_BODY} align="right">{user._id}</TableCell>
              <TableCell sx={STYLED_TABLE_BODY} align="right">{user.name.first} {user.name.last}</TableCell>
              <TableCell sx={STYLED_TABLE_BODY} align="right">{user.email}</TableCell>
              <TableCell sx={STYLED_TABLE_BODY} align="right">{user.phone}</TableCell>
              <TableCell sx={STYLED_TABLE_BODY} align="right">{user.address.city} {user.address.street} {user.address.houseNumber}</TableCell>
               <TableCell sx={STYLED_TABLE_BODY} align="right">
                  {user.isAdmin ? 'Admin' : user.isBusiness ? 'Business' : 'Regular'}
                  <br />
                  {!user.isAdmin &&  (
                    <Button variant='contained' size='medium' onClick={() => handleChangeStatus(user)}>
                      Change to {user.isBusiness ? 'Regular' : 'Business'}
                    </Button>
                    )}
                </TableCell>
                <TableCell sx={STYLED_TABLE_BODY} align="right">
                  {!user.isAdmin &&(
                    <IconButton
                    aria-label="delete user"
                    onClick={() => handleDeleteUser(user)}>
                    <DeleteIcon />  
                  </IconButton>
                  )}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </Container>
  );
};

export default UsersPage;
