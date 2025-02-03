import React, { useState } from 'react'

const HorizontalCardProduct = ({category,heading}) => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

  return (
    <div className='container mx-auto px-4 my-6 relative'>


        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

        <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
            product
        </div>

    </div>
  )
}

export default HorizontalCardProduct