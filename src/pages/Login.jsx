import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { login } from "../utils/api";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "../context/TheamContect";
import { Link } from "react-router-dom";




export default function Login() {

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  // const {theme} = useContext(ThemeProvider)

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   async function loginUser({userName, email, password}) {
    console.log("login called ")
    const inputUser = {
      userName : (userName)? userName : null,
      email: email? email : null,
      password: password
    }
      try {
        console.log("in try block")
        setLoading(true);
        const res = await login(inputUser);

        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        const logedInUser = res.data.data.logedInUser;
        
        logedInUser.accessToken = accessToken;
        logedInUser.refreshToken = refreshToken;

        // console.log("login response : ", res );
        // console.log("login response cookies : ", res.cookies );
        console.log("logedInUSer : ", logedInUser);
  
        setUser(logedInUser);
  
        if(logedInUser){
          
      // if (res.data?.token) {
        localStorage.setItem("user", JSON.stringify(logedInUser)); // Optional if you store in cookies
      // }
          console.log("redirection to / ");
          navigate('/')
        } else{
          setError("Invalid credentials");
        }
      } catch (error) {
        throw new Error(error.message)
      } finally{
        setLoading(false);
      }
    }
  //  for testing api 
  // useEffect(() => {
    
  //   loginUser();
  // } , [])



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      console.log(form);
      const inputUser = {
        email: form.emailOrUsername.includes("@")? form.emailOrUsername : null,
        userName: form.emailOrUsername.includes("@")? null : form.emailOrUsername ,
        password: form.password
      }
      console.log(inputUser);
      const res = loginUser(inputUser);
     
     


    
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email or Username */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              name="emailOrUsername"
              value={form.emailOrUsername || ""}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email or username"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <Link to="/register" className="text-blue-600 hover:underline">
          New user? Register here
        </Link>
      </div>
    </div>
  );
}
