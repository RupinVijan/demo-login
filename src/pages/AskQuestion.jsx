import React,{useState ,useEffect} from 'react'
import Navbar from '../components/Navbar'
import '../assets/css/question.css'


function AskQuestion() { 
    const [reload, setreload] = useState(false);
    const [questionToDisplay, setQuestionToDisplay] = useState();
    useEffect(() => {
        async function x(){
          let userId =  await localStorage.getItem("userToken")
        const res = await fetch(`https://demo-login-back.herokuapp.com/api/user/${userId}`)
        const response = await res.json();
        console.log(response)
        if(response.status)
        {setQuestionToDisplay(response.user.Item)}
        else{
          setQuestionToDisplay(null)
        }
        // console.log(questionToDisplay.email)
        }
        setreload(true)
        x();
    }, [reload]);
    
  return (
    <div>
        <Navbar/>
        <h1 className='text-center display-4 text-danger'>Profile</h1>
        {questionToDisplay?(<>
        <img src={questionToDisplay?.image} alt="dp" height='200px' width='160px' className='m-2' />
        <h2>Email : {questionToDisplay.email}</h2>
        </>):(<h2>Please Login</h2>
        )}
        
    </div>
  )
}

export default AskQuestion