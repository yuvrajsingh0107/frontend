import { useEffect, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uplodeArrow from "../assets/upload-arrow-svgrepo-com.svg";

import { AuthContext } from "../context/AuthContext";
  import { SearchContext } from "../context/SearchContext";
import SideBarHome from "./SideBarHome";

function Navbar() {

  const [open, setOpen] = useState(false);
  const [searchField, setSearchField] = useState(false);
  const cardRef = useRef(null);
  const { setSearchQuery } = useContext(SearchContext)
  const navigate = useNavigate();


  const [sidebar, setSideBar] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const { user, setUser } = useContext(AuthContext);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setSearchQuery(search.trim());
    navigate("/");

  };


  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  return (
    <>
      {
        !searchField &&

        <nav className="relative px-4 py-1   bg-gray-950  w-full  ">
          <div className="  flex items-center justify-between">

            <div className="flex items-center gap-4">
              {/* Hamburger  */}
              <svg
                onClick={() => setSideBar(true)}
                width="30px"
                height="30px"
              viewBox="0 0 24 24" fill
              ="none"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M20 7L4 7" stroke="#d5d8e2" strokeWidth="1.5" strokeLinecap="round"></path>
                <path d="M20 12L4 12" stroke="#d5d8e2" strokeWidth="1.5" strokeLinecap="round"></path>
                <path d="M20 17L4 17" stroke="#d5d8e2" strokeWidth="1.5" strokeLinecap="round"></path>
              </g>            </svg>

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-600">
              MyTube
            </Link>
            </div>

            {/* Search Bar */}
            <form
              className="flex-1 mx-6 flex items-center justify-end max-w-lg"
            >
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" hidden  md:block flex-1 border text-white border-gray-500 rounded-l-full px-4 py-1 outline-none"
              />
              <button
                type="submit"
                onClick={handleSearch}
                className="bg-blue-500 border border-blue-500 text-white px-4 py-1 hidden md:block md:rounded-l-none md:rounded-r-full hover:bg-blue-600"
              >
                🔍
              </button

              >

              <button
                className="bg-blue-500 text-white px-2 py-2  md:hidden rounded-full hover:bg-blue-600"
                onClick={() => setSearchField(true)}
              >
                🔍
              </button>
            </form>

            {/* User / Login */}
            {user ? (
              // <Link to={`/channel/${user._id}`}>
              <div className="relative flex gap-4 items-center">
                <img
                  src={user.avatar || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border"
                  onClick={() => setOpen(!open)}
                />
                {/* Profile Card */}
                {open && (
                  <div
                    ref={cardRef}
                    className="absolute right-0 mt-100 w-72 dark:bg-gray-700 dark:text-gray-200 bg-white text-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    {/* Cover image */}
                    <div className="h-20 bg-gray-300">
                      <img
                        src={user.coverImage || "https://via.placeholder.com/300x100"}
                        alt="cover"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Avatar overlapping cover */}
                    <div className="relative -mt-10 flex items-center px-4">
                      <img
                        src={user.avatar || "https://via.placeholder.com/80"}
                        alt="profile"
                        className="w-16 h-16 rounded-full border-4 border-white shadow-md"
                      />
                      <div className="ml-3 overflow-hidden">
                        <h2 className="font-semibold text-lg truncate">{user.userName || "John Doe"}</h2>
                        <p className="text-sm text-gray-500 truncate max-w-[160px]">
                          {user.email || "johndoeverylongemailaddress@exampledomain.com"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <ul className="mt-4 px-4 pb-4 space-y-2">
                      <li 
                        onClick={() => navigate("/yourchannel")}
                        className="hover:bg-gray-600 p-2 rounded-lg cursor-pointer">
                          Profile
                        </li>
                      <li
                        className="hover:bg-gray-600 p-2 rounded-lg cursor-pointer text-red-600"
                        onClick={() => {
                          setUser(null);
                          localStorage.removeItem("user");
                          navigate("/");
                        }}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}

                {/* <img
                  className=" h-7 w-7"
                  src={uplodeArrow}
                  alt=""
                  onClick={() => { navigate("/uplode") }}
                /> */}

              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white mr-3 px-4 py-1 rounded-lg hover:bg-blue-600"
              >
                Login
              </Link>
            )}


          </div>
        </nav>
      }
      {/* for mobile only */}
      {
        searchField &&
        <div className="w-full max-w-md mx-auto select-none bg-slate-900 text-slate-100 ">
          {/* Sticky Header */}
          <div className="flex items-center gap-2 px-3 py-3 sticky top-0 z-30 bg-slate-900/80 backdrop-blur border-b border-slate-800">

            {/* Back button */}


            {/* Search field */}
            <div
              className={`flex items-center gap-2 flex-1 rounded-2xl px-3  ring-1 bg-slate-800/80 shadow-sm transition ${focused ? "ring-2 ring-blue-500" : "ring-slate-700"
                }`}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full bg-transparent outline-none text-slate-100 placeholder:text-slate-400 text-[15px]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="p-1.5 rounded-full hover:bg-slate-700"
                >
                  ✖
                </button>
              )}
              <button
                type="submit"
                onClick={handleSearch}
                className="p-1.5 rounded-full hover:bg-slate-700"
              >
                🔍
              </button>
            </div>

            {/* Cancel button */}
            <button
              onClick={() => setSearchField(false)}
              className={`text-sm font-medium transition px-2 py-1 rounded-xl text-blue-400 `} >
              Cancel
            </button>
          </div>

        </div>
      }

      {sidebar &&
        <div>
          <div onClick={() => setSideBar(false)} className='fixed w-full h-full backdrop-blur-sm  z-25'>
          </div>
          <SideBarHome />
        </div>
      }


    </>
  );
};

export default Navbar;
