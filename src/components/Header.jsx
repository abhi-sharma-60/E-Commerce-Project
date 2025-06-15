import React, { useState, useContext, useEffect } from 'react'
import Logo from "./Logo.jsx"
import { FaSearch } from "react-icons/fa"
import { FaUserCircle } from "react-icons/fa"
import { MdOutlineShoppingCart } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { setUserDetails } from '../store/userSlice'
import SummaryApi from '../common'
import ROLE from '../common/role'
import Context from '../context'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()

  const [menu,setMenu] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)


  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents default form submission
      if (search.trim()) {
        navigate(`/search?q=${search.trim()}`);
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setSearch('');
    }
  }, [location.pathname]);
  

  return (
    <header className="h-16 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-700/50 fixed w-full z-40 shadow-soft">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-12 py-3 bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700/50 rounded-2xl text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300"
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              value={search}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-medium">
              <FaSearch className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center group"
                onClick={() => setMenu((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full border-2 border-primary-200 dark:border-primary-700 group-hover:border-primary-400 dark:group-hover:border-primary-500 transition-colors duration-300"
                    alt={user?.name}
                  />
                ) : (
                  <FaUserCircle className="text-neutral-600 dark:text-neutral-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300" />
                )}
              </div>
            )}

            {menu && (
              <div className="absolute bg-white dark:bg-neutral-800 bottom-0 top-11 h-fit p-2 shadow-strong rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 animate-slide-down">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-neutral-100 dark:hover:bg-neutral-700 p-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
                      onClick={() => setMenu((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative group">
              <span className="text-neutral-600 dark:text-neutral-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                <MdOutlineShoppingCart />
              </span>

              <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 shadow-medium animate-bounce-subtle">
                <p className="text-xs font-semibold">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-xl text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 font-medium"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-6 py-2 rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-105 font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header