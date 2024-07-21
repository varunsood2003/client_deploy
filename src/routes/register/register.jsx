import "./register.scss";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [error,setError] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await axios.post("https://api-deploy-j18f.onrender.com/api/auth/register",{
        username,email,password
      })
      //console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
    //console.log(username,email,password);
  }
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button >Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
