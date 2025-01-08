import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginContext } from "./context/LoginContext"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import Home from "./screens/Home"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import Profile from "./components/Profile"
import Createpost from "./screens/Createpost"
import UserProfile from "./components/UserProfile"
import MyFolliwngPost from "./screens/myFollowinfPost"
import Modal from "./components/Modal"
import "./App.css"


const App = () => {
  const [userLogin, setUserLogin] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <BrowserRouter>
      <div className='App'>
        <LoginContext.Provider value={{ setUserLogin,setModalOpen }}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/createpost" element={<Createpost />} />
            <Route path="/profile/:userid" element={<UserProfile />} />
            <Route path="/myfollwingpost" element={<MyFolliwngPost />} />
          </Routes>
          <ToastContainer theme='dark' />
          {modalOpen && <Modal setModalOpen={setModalOpen}/>}
        </LoginContext.Provider>

      </div>
    </BrowserRouter>
  )
}

export default App