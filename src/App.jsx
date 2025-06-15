import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SummaryApi from './common'
import Context from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)


  const fetchUserDetails = async() => {
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : "include"
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }
  

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

  },[])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 transition-colors duration-300">
        <Context.Provider value={{
            fetchUserDetails, // user detail fetch 
            cartProductCount, // current user add to cart product count,
            fetchUserAddToCart
        }}>
          <ToastContainer 
            position='top-center'
            className="mt-16"
            toastClassName="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-strong"
          />
          
          <Header/>
          <main className='min-h-[calc(100vh-120px)] pt-16'>
            <Outlet/>
          </main>
          <Footer/>
        </Context.Provider>
      </div>
    </ThemeProvider>
  )
}

export default App