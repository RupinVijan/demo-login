import React , {useState} from "react";
import "../assets/css/login.css";
import Navbar from "../components/Navbar";

function Login() {
  const [userData, setUserData] = useState({email:"",password:""});
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch('https://demo-login-back.herokuapp.com/api/login' , {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(userData)
    })
    const response = await res.json();
    console.log(response)
    if(response.status){
      localStorage.setItem("userToken", response.user.Item.email);
      // toast(response.msg)
      window.alert(response.msg)
      window.location = '/question';
    }else{
      // toast(response.msg)
      window.alert(response.msg)
    }
  }
  return (
    <div>
      <Navbar/>
    <div className="pen-title"></div>
    <div className="container">
      <div className="card"></div>
      <div className="card">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input type="email" id="email" name="email" value={userData.email} onChange={(e)=>{setUserData({...userData , email:e.currentTarget.value})}} required/>
            <label htmlFor="email">Email</label>
            <div className="bar"></div>
          </div>
          <div className="input-container">
            <input type="password" id="password" name="password" value={userData.password} onChange={(e)=>{setUserData({...userData , password:e.currentTarget.value})}} required />
            <label htmlFor="password">Password</label>
            <div className="bar"></div>
          </div>
          <div className="button-container">
            <button>
              <span>Go</span>
            </button>
          </div>
          {/* <div className="footer"><a href="#">Forgot your password?</a></div> */}
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login;
