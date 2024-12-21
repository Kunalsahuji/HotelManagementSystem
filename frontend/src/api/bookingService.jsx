import axios from './axiosConfig'
import { toast } from 'react-toastify'

export const createBookingService = async (bookingData) => {
    try {
        const { data } = await axios.post('/booking/create', bookingData)
        return data
    } catch (error) {
        toast.error(error.response.data.massage)
    }
}

export const viewUserBookingsService = async (userId) => {
    try {
        const { data } = await axios.get(`/booking/view/${userId}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const cancelBookingService = async (bookingId) => {
    try {
        const { data } = await axios.delete(`/booking/delete/${bookingId}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}