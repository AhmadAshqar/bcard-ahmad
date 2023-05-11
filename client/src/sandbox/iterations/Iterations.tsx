import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { SANDBOX_ROUTES } from '../../routes/routesModel'
import NavItem from '../../layout/components/NavItem'


const Iterations = () => {
  return (
    <>
        <AppBar position='sticky' color='secondary'>
            <Toolbar>
                <NavItem label='Loops' to={SANDBOX_ROUTES.Loops} color='black'/>
            </Toolbar>
        </AppBar>

        <Outlet />
    </>
  )
}

export default Iterations