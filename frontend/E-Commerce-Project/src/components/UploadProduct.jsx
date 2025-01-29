import React from 'react'
import { IoCloseSharp } from "react-icons/io5"
import productCategory from '../helpers/productCategory'
import { MdCloudUpload } from "react-icons/md"

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
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            
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
                name='productName'
                value={data.productName}
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
                />

                <label htmlFor="brandName" className='mt-3'>Brand Name : </label>
                <input type="text" id='brandName'
                placeholder='Enter Brand Name'
                name='brandName'
                value={data.brandName}
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
                />

                <label htmlFor="category" className='mt-3'>Category : </label>
                <select value={data.category} className='p-2 bg-slate-100 border rounded'>
                    {
                        productCategory.map((el,index) => {
                            return (
                                <option value={el.value} key={el.value+index}>{el.label}</option>
                            )
                        })
                    }
                </select>

                <label htmlFor="productImage" className='mt-3'>Product Image : </label>
                <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center'>
                    <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                        <span className='text-4xl'><MdCloudUpload/></span>
                        <p className='text-sm'>Upload Product Image</p>
                        <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
                    </div>
                </div>

                <div>
                    <img src="" width={80} height={80} className='bg-slate-100 border'/>
                </div>


            </form>
        </div>
    </div>
  )
}

export default UploadProduct