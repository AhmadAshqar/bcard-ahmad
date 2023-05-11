import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { SANDBOX_ROUTES } from '../../routes/routesModel'
import NavItem from '../../layout/components/NavItem'


const ConditionalRendering = () => {
  return (
    <>
        <AppBar position='sticky' color='secondary'>
            <Toolbar>
                <NavItem label='ConditionalRendering' to={SANDBOX_ROUTES.ConditionalRendering} color='black'/>
            </Toolbar>
        </AppBar>

        <Outlet />
    </>
  )
}

export default ConditionalRendering