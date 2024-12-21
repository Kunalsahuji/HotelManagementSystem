import axios from './axiosConfig'
import { toast } from 'react-toastify'

export const createReviewService = async (reviewData) => {
    try {
        const { data } = await axios.post('review/create', reviewData)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const updateReviewService = async (reviewData, reviewId) => {
    try {
        const { data } = await axios.put(`review/update/${reviewId}`, reviewData)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const deleteReviewService = async (reviewId) => {
    try {
        const { data } = await axios.delete(`review/delete/${reviewId}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const viewReviewsService = async (propertyId) => {
    try {
        const { data } = await axios.get(`review/view/${propertyId}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}