import React from 'react'
import { IoCloseSharp } from "react-icons/io5";

const UploadProduct = (
    onClose,
    fetchData
) => {


    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
      })
      const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
      const [fullScreenImage,setFullScreenImage] = useState("")

      const handleOnChange = (e) => {

      }


  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]'>
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Upload Product</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <IoCloseSharp/>
                </div>
            </div>
            <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'>
                <label htmlFor="productName">Product Name : </label>
                <input type="text" id='productName'
                placeholder='Enter Product Name'
                value={data.productName}
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
                />

                <label htmlFor="brandName">Brand Name : </label>
                <input type="text" id='brandName'
                placeholder='Enter Brand Name'
                value={data.brandName}
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
                />


            </form>
        </div>
    </div>
  )
}

export default UploadProduct