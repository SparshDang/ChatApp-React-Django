import React, {useRef} from "react";
import { Form, useNavigate } from "react-router-dom";

export default function AuthPage() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigator = useNavigate()

    const onLoginSubmit = async (event) => {
        event.preventDefault();
        const url = process.env.REACT_APP_API_URL + 'login';
        const req = await fetch(url, {
          method:'POST',
          body:JSON.stringify( {
            username:usernameRef.current.value,
            password:passwordRef.current.value,
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        const response = await req.json()
        console.log('fd')
        if( response.status === 200){
            navigator("/chats")
        }

    }


  return (
    <>
    <Form method="post">
      <input type="text" name="username" id="username" placeholder="username" />
      <input type="text" name="email" id="email" placeholder="email" />
      <input type="text" name="name" id="name" placeholder="name" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <input type="submit" value="Register" />
    </Form>

    <form method="post" onSubmit={onLoginSubmit}>
        <input type="text" name="username" id='name' ref={usernameRef}/>
        <input type="password" name="password" id='password' ref={passwordRef}/>
        <input type="submit" value="Log in" />
    </form>
    </>
  );
}

export const AuthAction = async ({ params, request }) => {
  const formData = await request.formData();
  console.log(formData)
  const jsonData=  {
    name:formData.get('name'),
    username:formData.get('username'),
    email:formData.get('email'),
    password:formData.get('password')
  }
  console.log(jsonData)
  const url = process.env.REACT_APP_API_URL + 'register';
  const req = await fetch(url, {
    method:'POST',
    body: JSON.stringify(jsonData),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  })
  const response = await req.json()
  console.log(response)
  return null;
};
