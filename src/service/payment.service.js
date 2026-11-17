const axios = require("axios");
require("dotenv").config();

const { FLUTTERWAVE_BASE_URL, FLUTTERWAVE_SK_TEST } = process.env;


const flutterwaveApi =  axios.create({
    baseURL: FLUTTERWAVE_BASE_URL,
    headers: {
        Authorization: `Bearer ${FLUTTERWAVE_SK_TEST}`,
        "Content-Type": 'application/json'
    },

    timeout: 30000,
})

const initializePayment = async(paymentData) => {
    try{
        const response = await flutterwaveApi.post(
            '/payments',
            paymentData
        )

        if(response.data.status !== 'success'){
            throw new error(
                response.data.message || 'Payment intialization failed'
            )
        }
    }catch(error){
        console.error('Payment initialization failed', error.response.data || error.message)

    }
}

module.exports = initializePayment