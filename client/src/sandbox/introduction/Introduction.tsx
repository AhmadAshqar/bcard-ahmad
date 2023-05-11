import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { SANDBOX_ROUTES } from '../../routes/routesModel'
import NavItem from '../../layout/components/NavItem'


const Introduction = () => {
  return (
    <>
        <AppBar position='sticky' color='secondary'>
            <Toolbar>
                <NavItem label='Babel' to={SANDBOX_ROUTES.Babel} color='black'/>
            </Toolbar>
        </AppBar>

        <Outlet />
    </>
  )
}

export default Introduction