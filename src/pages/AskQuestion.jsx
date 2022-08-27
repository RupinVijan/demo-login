import React,{useState ,useEffect} from 'react'
import Navbar from '../components/Navbar'
import '../assets/css/question.css'

function Question ( {reload , setreload}) {
    const [questionAsked, setQuestionAsked] = useState("");
    async function handleSubmit(e){
        e.preventDefault();
       let userId =  await localStorage.getItem("userToken")
       if(!userId){window.alert('User Not logged in!')}
       let body = {
        token:userId,
        question:questionAsked
       }
       const res = await fetch('https://demo-login-back.herokuapp.com/api/question' , {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(body)
    })
    const response = await res.json();
    if(response.status){
        setreload(false)
        setQuestionAsked("")
      // toast(response.msg)
      window.alert(response.msg)
    }else{
      // toast(response.msg)
      window.alert(response.msg)
    }
    }
    return (
        <div className="container">
            <form id="form" class="form" onSubmit={handleSubmit}>
    <input
      type="text"
      class="input"
      id="question"
      value={questionAsked}
      onChange={(e)=>{
        setQuestionAsked(e.currentTarget.value)
      }}
    />
    <button
      class="btn btn-danger"
      data-type="add"
    >
      Add
    </button>
</form>
        </div>
    );
}


function ShowQuestions ({questionToDisplay}) {
   
    
    return(
        <div className='container'>
            <ul id="list" class="list">
           { questionToDisplay.map((e) => {
                return(
                    <li class="item">
  <span class="text">
    {e.question}
  </span>
 
</li>
                );
            })}
            </ul>
        </div>
    );
}

function AskQuestion() { 
    const [reload, setreload] = useState(false);
    const [questionToDisplay, setQuestionToDisplay] = useState([]);
    useEffect(() => {
        async function x(){
        const res = await fetch('https://demo-login-back.herokuapp.com/api/question')
        const response = await res.json();
        setQuestionToDisplay(response.question)
        }
        setreload(true)
        x();
    }, [reload]);
  return (
    <div>
        <Navbar/>
        <h1 className='text-center display-4 text-danger'>Ask a Question?</h1>
        <Question reload={reload} setreload={setreload} />
        <ShowQuestions questionToDisplay={questionToDisplay} />
    </div>
  )
}

export default AskQuestion