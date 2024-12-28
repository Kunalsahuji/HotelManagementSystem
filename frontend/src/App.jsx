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
import NotFound from './pages/partials/NotFound'

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
        <Route path='/admin-pannel'
          element={
            <ProtectedRoute>
              <IsAdmin><AdminPanel /></IsAdmin>
            </ProtectedRoute>}
        >

          {/*child route */}

          <Route path='users' element={<AllUser />} />
          <Route path='properties' element={<Allproperties />} />
          <Route path='bookings' element={<AllBookings />} />
          <Route path='payments' element={<AllPayment />} />
        </Route>
        {/* <Route path='/' element={<Layout />}/> */}
        <Route path='/' element={<Home />} />
        <Route path='/property/create' element={
          <ProtectedRoute>
            <CreateProperty />
          </ProtectedRoute>}
        />
        <Route
          path='/property/edit/:id'
          element={
            <ProtectedRoute>
              <EditProperty />
            </ProtectedRoute>}
        />
        <Route
          path='/property/:id'
          element={
            <ProtectedRoute>
              <SingleProperty />
            </ProtectedRoute>}
        />
        <Route
          path='/booking/:id'
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>}
        />
        <Route
          path='/profile/'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>}
        />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />

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
