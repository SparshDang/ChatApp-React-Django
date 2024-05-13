import React from 'react'
import AuthContext from './AuthContext'

export default function AuthProvider({children}) {
  let userData = {
    name:null,
    username:null,
    email:null
  }
  const registerHandler = async (data) => {
    const url = "http://"+process.env.REACT_APP_API_URL + 'register';
    const req = await fetch(url, {
      method:'POST',
      body: JSON.stringify(data),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    })
    const response = await req.json()
    if (response.status !== 200){
      return
    }

  }

  const loginHandler = async (data) => {
    const url = "http://"+process.env.REACT_APP_API_URL + 'login';
    const req = await fetch(url, {
      method:'POST',
      credentials:"include",
      body:JSON.stringify( {
        username:data.username,
        password:data.password,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    const response = await req.json()
    if( response.status === 200){
      setUserData()
    }

  }



  const setUserData = async () => {
    const url = "http://"+process.env.REACT_APP_API_URL + 'user';
    const request = await fetch(url, {
      credentials:"include"
    });
    const response = await request.json()
    userData = {response, isAuthenticated:true};

  }

  const value =     {
    userData:userData,
    setUser: setUserData,
    logoutHandler : ()=>{},
    loginHandler : loginHandler,
    registerHandler : registerHandler
}
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
