import axios from './axiosConfig'
import { toast } from 'react-toastify'

export const currentUserService = async () => {
    try {
        const { data } = await axios.get('user/current-user')
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const loginService = async (userData) => {
    try {
        const { data } = await axios.post('user/login', userData)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const registerService = async (userData) => {
    try {
        const { data } = await axios.post('user/register', userData)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const logoutService = async () => {
    try {
        const { data } = await axios.get('user/logout')
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const resetPasswordService = async (email) => {
    try {
        const { data } = await axios.post('user/reset-password', email)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const updateUserService = async (userData) => {
    try {
        const { data } = await axios.put('user/update', userData)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

// export const deleteUserService = async () => {
//     try {
//         const { data } = await axios.delete('user/delete')
//         return data
//     } catch (error) {
//         toast.error(error.response.data.message)
//     }
// }

