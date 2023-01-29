import React, { useState } from 'react'
import './signin.css'

export default function Signin(props) {

  const { setcurrentUser } = props;

  const [inputusername, setInputusername] = useState('')
  const [inputpassword, setInputpassword] = useState('')

  const login = async (e) => {
    e.preventDefault()
    if(inputusername.length>0 && inputpassword.length>0) {
      const res = await fetch(`/users/${inputusername}/${inputpassword}`)
    const user = await res.json();
    if (user.message !=="no such user found") {
      setcurrentUser(user);
    } else {
      console.log("user not found")
    }
    }
  }
  return (
    <div className='chatcontainer'>
      <form className='form-container'>
      <div className='title'>
        <h3>Sign in to get started</h3>
      </div>
        <div>
          <input placeholder='email' value={inputusername} onChange={(e) => { setInputusername(e.target.value) }} />
        </div>
        <div>
          <input placeholder='password' value={inputpassword} onChange={(e) => { setInputpassword(e.target.value) }} />
        </div>
        <button className='btn' onClick={login}><p>Sign in</p></button>
      </form>
    </div>
  )
}
