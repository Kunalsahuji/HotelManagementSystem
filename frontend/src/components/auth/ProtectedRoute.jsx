import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(store => store.user.isLoggedIn)
  const navigate = useNavigate()

  return isLoggedIn ? children : navigate('/')
}

export default ProtectedRoute
