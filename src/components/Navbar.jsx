import { useEffect, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uplodeArrow from "../assets/upload-arrow-svgrepo-com.svg";

import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import {  refreshToken } from "../utils/api";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);
  const { setSearchQuery } = useContext(SearchContext)
  const navigate = useNavigate();

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

  return (
    <nav className="bg-gray-950 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyTube
        </Link>

        {/* Search Bar */}
        <form
          className="flex-1 mx-6 flex items-center max-w-lg"
        >
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border text-white border-gray-300 rounded-l-full px-4 py-2 outline-none"
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-full hover:bg-blue-600"
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
                    <h2 className="font-semibold text-lg truncate">{user.name || "John Doe"}</h2>
                    <p className="text-sm text-gray-500 truncate max-w-[160px]">
                      {user.email || "johndoeverylongemailaddress@exampledomain.com"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <ul className="mt-4 px-4 pb-4 space-y-2">
                  <li className="hover:bg-gray-600 p-2 rounded-lg cursor-pointer">Profile</li>
                  <li className="hover:bg-gray-600 p-2 rounded-lg cursor-pointer">Settings</li>
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

            <img
              className=" h-7 w-7"
              src={uplodeArrow}
              alt=""
              onClick={() => { navigate("/uplode") }}
            />



          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
        )}


      </div>
    </nav>
  );
}
