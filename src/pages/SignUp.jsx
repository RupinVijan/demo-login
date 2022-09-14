import React , {useState} from 'react'
import Navbar from '../components/Navbar';

function SignUp() {
  const [userData, setUserData] = useState({email:"",password:"" , });
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch('https://demo-login-back.herokuapp.com/api/signup' , {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(userData)
    })
    const response = await res.json();
    if(response.status){
      localStorage.setItem("userToken", response.user.Item.email);
      // toast(response.msg)
      window.alert(response.msg)
      window.location = '/question';
    }else{
      // toast(response.msg)
      window.alert(response.msg)
    }
   
    // }
  }
  return (
    <div>
      <Navbar/>
    <div className="pen-title"></div>
    <div className="container">
      <div className="card"></div>
      <div className="card">
        <h1 className="title">Register</h1>
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
          <div className="input-container">
            <input  type="file" accept="image/*" id="image" name="image"  onChange={async(e)=>{
              let file = e.target
               const {url, fields} = await fetch("https://demo-login-back.herokuapp.com/get-signed-url").then(response => response.json())

               const data = {
                 bucket: "test-website-backend",
                 ...fields,
                 'Content-Type': file.files[0].type,
                 file: file.files[0],
               };
         
               const formData  = new FormData();
               for (const name in data) {
                 formData.append(name, data[name]);
               }
         
               const response = await fetch(url, {
                 method: 'POST',
                 body: formData,
               });
               console.log(response)
               const tempURL = `https://test-website-infobility.s3.ap-south-1.amazonaws.com/${fields.key}`
              setUserData({...userData ,  image:tempURL})
            }
            }
               required />
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

export default SignUp