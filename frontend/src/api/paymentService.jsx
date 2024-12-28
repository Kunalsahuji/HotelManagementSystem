import axios from './axiosConfig'
import { toast } from 'react-toastify'


export const processPaymentService = async (paymentData) => {
    try {
        const { data } = await axios.post('/payment', paymentData)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const paymentFetchService = async (paymentId) => {
    try {
        const { data } = await axios.get(`payment/payment-fetch/${paymentId}`)
        return data
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

export const createRazorpayOrderService = async (amount) => {
    try {
        const response = await axios.post('/payment', {
            amount,
            currency: 'INR'
        })
        if (response.status === 200) {
            toast.success('Order created successfully')
        }
        else {
            toast.error('Order creation failed')
        }
        return handleRazorpayScreen(response.data.order.amount)
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

const handleRazorpayScreen = async (amount) => {
    try {
        const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            toast.error('Razorpay SDK failed to load. Are you online?')
            return
        }
        return new Promise((resolve, reject) => {
            console.log(import.meta.env.VITE_RAZORPAY_KEY_ID)
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: amount.toString(),
                currency: 'INR',
                name: 'Aura Elegence',
                description: 'Payment',
                image: 'https://example.com/your_logo',
                // order_id: res.data.order.id,
                handler: function (response) {
                    paymentFetchService(response.razorpay_payment_id)
                        .then((status) => {
                            resolve(status)
                        }).catch((err) => {
                            reject(err)
                        });
                },
                prefill: {
                    name: 'Aura Elegence',
                    email: import.meta.env.VITE_EMAIL,
                },
                notes: {
                    address: 'Aura Elegence',
                },
                theme: {
                    color: '#b17f44'
                },
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        })
    } catch (error) {
        toast.error(error.response.data.message)
    }
}

const loadRazorpayScript = (src) => {
    return new Promise(resolve => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
    })
}



