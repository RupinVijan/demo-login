import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AskQuestion from "./pages/AskQuestion";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<SignUp/>} />
          <Route path="/question" element={<AskQuestion/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
