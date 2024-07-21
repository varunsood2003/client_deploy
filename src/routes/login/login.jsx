import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {currentUser,updateUser} = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      updateUser(res.data);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
    //console.log(username,email,password);
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Login</button>
          
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
