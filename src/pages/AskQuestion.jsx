import React,{useState ,useEffect} from 'react'
import Navbar from '../components/Navbar'
import '../assets/css/question.css'


function AskQuestion() { 
    const [reload, setreload] = useState(false);
    const [questionToDisplay, setQuestionToDisplay] = useState();
    useEffect(() => {
        async function x(){
          let userId =  await localStorage.getItem("userToken")
        const res = await fetch(`http://localhost:8080/api/user/${userId}`)
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
        {questionToDisplay?(<h2>Email : {questionToDisplay.email}</h2>):(<h2>Please Login</h2>)}
        
    </div>
  )
}

export default AskQuestion