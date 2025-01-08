import React, { useEffect, useState } from 'react'
import logo from "../img/insta.png"
import '../css/SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const SignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

  const postData = () => {

    if (!emailRegex.test(email)) {
      notifyA("Invalid Email")
      return
    } else if (!passRegex.test(password)) {
      notifyA("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character")
      return
    }

    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          notifyB(data.message)
          navigate("/signin")
        }
        console.log(data)
      })
  }

  return (
    <div className='signUp'>
      <div className='form-container'>
        <div className="form">
          <img className='signUpLogo' src={logo} alt="" />
          <p className='loginPara'>
            Sign up to see photos and videos <br /> from your friends.
          </p>
          <div>
            <input
              type="email"
              name='email'
              id='email'
              value={email} onChange={(e) => { setEmail(e.target.value) }}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="text"
              name='name'
              id='name'
              value={name} onChange={(e) => { setName(e.target.value) }}
              placeholder="Full Name"
            />
          </div>
          <div>
            <input
              type="text"
              name='username'
              id='username'
              value={userName} onChange={(e) => { setUserName(e.target.value) }}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              name='password'
              id='password'
              value={password} onChange={(e) => { setPassword(e.target.value) }}
              placeholder="Password"
            />
          </div>
          <p className='loginPara' style={{ fontSize: "12px", margin: "3px 0px" }}>
            By signing up, you agree to our Terms, <br />privacy policy and cookies policy
          </p>
          <input
            type="submit"
            id='submit-btn'
            value="Sign up"
            onClick={() => { postData() }}
          />
        </div>
        <div className="form2">

          Already have an account ?
          <Link to={"/signin"}>
            <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default SignUp
