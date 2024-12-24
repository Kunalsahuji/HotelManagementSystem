import axios from './axiosConfig'
import { toast } from 'react-toastify'

export const createPropertyService = async (propertyData) => {
    try {
        const { data } = await axios.post('/property/create', propertyData)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const updatePropertyService = async (propertyData, id) => {
    try {
        const { data } = await axios.put(`/property/update/${id}`, propertyData)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const deletePropertyServie = async (propertyId) => {
    try {
        const { data } = await axios.delete(`/property/delete/${propertyId}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const searchPropertiesService = async (query) => {
    try {
        const { data } = await axios.get(`/property/search${query}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const searchMyPorpertiesServicec = async () => {
    try {
        const { data } = await axios.get('/property/find')
        return data
    } catch (error) {
        toast.error(error.response.data.mesaage)
    }
}

export const viewPropertiesService = async (id) => {
    try {
        const { data } = await axios.get(`/property/view/${id}`)
        console.log(`dataOfViewProp`, data)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}