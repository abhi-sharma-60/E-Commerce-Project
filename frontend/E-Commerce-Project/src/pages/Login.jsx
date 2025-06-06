import React, { useContext } from 'react'
import { FaEye } from "react-icons/fa"
import { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import loginIcons from '../assets/loginIcons.png'
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {

    const [showPassword,setShowPassword] = useState(false)

    const [data,setData] = useState({
        email : "",
        password : ""
    })

    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }


    // Handle Google login
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
        const idToken = credentialResponse?.credential;

    if (!idToken) {
      throw new Error("No token received from Google");
    }
      const dataResponse = await fetch(SummaryApi.googleLogin.url, {
        method: SummaryApi.googleLogin.method,
        credentials : 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         idToken:  credentialResponse.credential,
        }),
      })

      const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

    } catch (error) {
      setErrorMessage("Failed to sign in with Google. Please try again.");
    }
  };


  const handleGoogleLoginFailure = () => {
    setErrorMessage("Google login failed. Please try again.");
  };



return (
    <section id='login'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto text-8xl'>
                        <img src={loginIcons} alt = "login icons"/>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2'>
                            <input type="email" 
                            placeholder='Enter Email'
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div>
                        <label>Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                            type={showPassword ? "text" : "password"}
                            placeholder='Enter Password'
                            value={data.password}
                            name='password' 
                            onChange={handleOnChange}
                            className='w-full h-full outline-none bg-transparent'/>

                            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                                {
                                    showPassword ? (
                                        <FaEyeSlash/>
                                    )
                                    :
                                    (
                                        <FaEye/>
                                    )
                                }
                            </div>

                        </div>
                        
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password ?
                        </Link>

                    </div>

                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                </form>

                <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
            </div>

            <div className="mt-6">
        <div className="flex items-center justify-center mb-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <div className="flex justify-center">
          <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </GoogleOAuthProvider>
        </div>
      </div>

            

        </div>
    </section>
  )
}

export default Login