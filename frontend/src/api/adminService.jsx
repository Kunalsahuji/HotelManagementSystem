import axios from './axiosConfig'
import { toast } from 'react-toastify'

export const getUsersService = async () => {
    try {
        const { data } = await axios.get('/admin/users')
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const deleteUserService = async (userId) => {
    try {
        const { data } = await axios.delete(`/admin/user/${userId}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const getPropertiesService = async () => {
    try {
        const { data } = await axios.get('admin/properties')
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const deletePropertyService = async (propertyId) => {
    try {
        const { data } = await axios.delete(`/admin/property/${propertyId}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const getBookingsService = async () => {
    try {
        const { data } = await axios.get('admin/bookings')
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const deleteBookingService = async (bookingId) => {
    try {
        const { data } = await axios.delete(`/admin/booking/${bookingId}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const getReviewsService = async () => {
    try {
        const { data } = await axios.get('/admin/reviews')
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const deleteReviewService = async (reviewId) => {
    try {
        const { data } = await axios.delete(`/admin/review/${reviewId}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const getPaymentsServices = async () => {
    try {
        const { data } = await axios.get('/admin/payments')
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const getSinglePaymentService = async (paymentId) => {
    try {
        const { data } = await axios.get(`/admin/payment/${paymentId}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}