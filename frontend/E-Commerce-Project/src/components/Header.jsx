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
    <header className="h-16 shadow-md bg-pink-50 fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        <div className="hidden bg-white  lg:flex items-center w-full border-black/20 justify-between max-w-sm border rounded-full  focus-within:shadow  pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none text-black"
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white border-none">
            <FaSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenu((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaUserCircle />
                )}
              </div>
            )}

            {menu && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenu((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>

                <nav>
                  
                    <Link
                      to={"/orders"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenu((prev) => !prev)}
                    >
                      Past Orders
                    </Link>
                  
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <MdOutlineShoppingCart />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700  "
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
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