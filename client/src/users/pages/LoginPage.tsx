import { Container } from '@mui/material'
import React from 'react'
import PageHeader from '../../components/PageHeader'
import { Navigate } from 'react-router-dom'
import ROUTES from '../../routes/routesModel'

const LoginPage = () => {
    const user = false
/*     const user = true */

    if(user) return <Navigate replace to={ROUTES.ROOT}/>


  return (
    <Container>
        <PageHeader
        title="Login Page"
        subtitle="In order to login, Fill out the form and click the submit button"
        />
    </Container>
  )
}

export default LoginPage