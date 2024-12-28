import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from '../../pages/partials/Nav'

const Layout = () => {
    const location = useLocation()
    console.log(location.pathname)
    const hideNavBar = location.pathname === '/notfound'
    return (

        <>
            {!hideNavBar && <Nav />}
            <Outlet />
        </>
    )
}

export default Layout
