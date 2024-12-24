import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './pages/partials/Nav'
import AdminPanel from './pages/AdminPanel'
import AllUser from './pages/partials/AllUser'
import Allproperties from './pages/partials/AllProperties'
import AllBookings from './pages/partials/AllBookings'
import AllPayment from './pages/partials/AllPayment'
import Home from './pages/Home'
import CreateProperty from './pages/CreateProperty'
import EditProperty from './pages/EditProperty'
import SingleProperty from './pages/SingleProperty'
import BookingPage from './pages/BookingPage'
import ProfilePage from './pages/ProfilePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { asyncCurrentUser } from './store/actions/userAction'
import IsAdmin from './components/auth/IsAdmin'

const App = () => {
  const user = useSelector(store => store.user)
  console.log(`userAtApp.jsx`, user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(asyncCurrentUser())
  }, [dispatch])
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/admin-pannel' element={<IsAdmin><AdminPanel /></IsAdmin>}>

          {/*child route */}
          
          <Route path='users' element={<AllUser />}></Route>
          <Route path='properties' element={<Allproperties />}></Route>
          <Route path='bookings' element={<AllBookings />}></Route>
          <Route path='payments' element={<AllPayment />}></Route>
        </Route>

        <Route path='/' element={<Home />}></Route>
        <Route path='/property/create' element={<CreateProperty />}></Route>
        <Route path='/property/edit/:id' element={<EditProperty />}></Route>
        <Route path='/property/:id' element={<SingleProperty />}></Route>
        <Route path='/booking/:id' element={<BookingPage />}></Route>
        <Route path='/profile/' element={<ProfilePage />}></Route>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
        </Route>
      </Routes >

    </>
  )
}

export default App
