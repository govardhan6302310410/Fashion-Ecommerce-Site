import React, { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {

    const { token, setCartItems,backendUrl} = useContext(ShopContext)
    const navigate = useNavigate()
    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    
    const verifyPayment = async() =>{
        try {
            if(!token){
                return null;
            }
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } });

            if(response.data.success){
                setCartItems({})
                navigate('/orders')
            }
            else{
                navigate('/cart')
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    
    <div>
      
    </div>
  )
}

export default Verify
