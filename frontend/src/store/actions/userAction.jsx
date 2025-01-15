import { toast } from 'react-toastify'
import { login, logout } from '../reducers/userSlice'
import {
    currentUserService,
    loginService,
    logoutService,
    registerService
} from '../../api/userServices'

export const asyncCurrentUser = () => async (dispatch) => {
    try {
        const user = await currentUserService()
        console.log(user.currentUser)
        dispatch(login(user.currentUser))
        !user && dispatch(logout())
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}
export const asyncRegisterUser = (userData) => async (dispatch) => {
    try {
        const data = await registerService(userData)
        dispatch(asyncCurrentUser())
        // return data
    } catch (error) {

    }
}

export const asyncLoginUser = (userData) => async (dispatch) => {
    try {
        const data = await loginService(userData)
        dispatch(asyncCurrentUser())
        return data
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}

export const asyncLogoutUser = () => async (dispatch) => {
    try {
        const res = await logoutService()
        dispatch(logout())
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
}
