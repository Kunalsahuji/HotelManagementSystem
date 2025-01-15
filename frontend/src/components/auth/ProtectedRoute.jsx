import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(store => store.user.isLoggedIn)
  console.log(isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('You need to login to access this page')
      return navigate('/')
    }
  }, [])
  return isLoggedIn && children
}

export default ProtectedRoute
