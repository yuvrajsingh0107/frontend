import { useContext, useState } from "react";
// import axios from "axios";
import ThemeContext from "../context/TheamContect";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null
  });
  const {setUser} = useContext(AuthContext);
  const {theme, setTheme} = useContext(ThemeContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:  value
    }));
  };

  const handleFileChange = (event) => {
    const { name, value, files } = event.target;
    setForm((prev) => 
      {
        return {
          ...prev,
            [name]:  files[0]
          }
        }
      ); // For single file upload
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    
    formData.append("userName", form.userName);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("fullName", form.fullName);
    formData.append("avatar", form.avatar);
    formData.append("coverImage", form.coverImage);
    
    
    try {
      const res = await register(formData);
       if(res.status === 201){
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        const logedInUser = res.data.data.createdUser;
        
        logedInUser.accessToken = accessToken;
        logedInUser.refreshToken = refreshToken;

        if(logedInUser){
          localStorage.setItem("user", JSON.stringify(logedInUser)); // Optional if you store in cookies
          // setUser();
          setUser(logedInUser);
          setForm({
            fullName: "",
            userName: "",
            email: "",
            password: "",
            avatar: null,
            coverImage: null
          });
          navigate("/");
        }
      }
  
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Something went wrong");
      }
    } finally{
      setLoading(false);
    }
  };

  return (
    <>
    
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
          {/* Theme Toggle Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-sm dark:text-white"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            Register
          </h2>

          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}
          {
            loading && (
            <div className="mb-4 text-white text-sm">processing.....</div>

            )
          }

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={form.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="file"
              name="avatar"
              // value={form.avatar}
              onChange={handleFileChange}
              className="w-full px-4 py-2 text-gray-900 dark:text-white"
            />
            <input
              type="file"
              // value={form.coverImage}
              name="coverImage"
              onChange={handleFileChange}
              className="w-full px-4 py-2 text-gray-900 dark:text-white"
            />

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
            >
              Register
            </button>
          </form>
          <Link to='/login' className="text-blue-600 hover:underline">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

