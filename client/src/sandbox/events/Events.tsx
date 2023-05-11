import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { SANDBOX_ROUTES } from '../../routes/routesModel'
import NavItem from '../../layout/components/NavItem'


const Events = () => {
  return (
    <>
        <AppBar position='sticky' color='secondary'>
            <Toolbar>
                <NavItem label='OnClick' to={SANDBOX_ROUTES.OnClick} color='black'/>
                <NavItem label='RaisingEvents' to={SANDBOX_ROUTES.RaisingEvents} color='black'/>
            </Toolbar>
        </AppBar>

        <Outlet />
    </>
  )
}

export default Events