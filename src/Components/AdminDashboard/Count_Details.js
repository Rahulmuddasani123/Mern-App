import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { fetchusers } from '../../Slices/userSlice'
import { useEffect } from 'react'



function Count_Details() {

    let {user_details}=useSelector(state=>state.user)
    let {products}=useSelector(state=>state.product)
    let dispatch=useDispatch()

    useEffect(()=>{
        dispatch(fetchusers())
        console.log(user_details)
    },[dispatch])

    // Ensure user_details is an array
  const userCount = Array.isArray(user_details) ? user_details.length : 0;

   const productCount = Array.isArray(products) ? products.length : 0;

  return (
    <div>

    <div className='container mt-2'>
        <div className='row p-3'>

            <div className='col-4'>
                <div className='rounded shadow-lg'>
                    <div >
                        <div className='p-3'>
                            <h5>Number of Users</h5>
                            <h3>{userCount}</h3>
                        </div>
                    </div>
                </div>
            </div>

             <div className='col-4'>
                <div className='rounded shadow-lg'>
                    <div >
                        <div className='p-3'>
                            <h5>Number of Products</h5>
                            <h3>{productCount}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </div>
  )
}

export default Count_Details