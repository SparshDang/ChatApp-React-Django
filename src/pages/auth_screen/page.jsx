import React, {useRef, useContext} from "react";
import { Form, useNavigate } from "react-router-dom";

import authContext from "../../context/AuthContext";

export default function AuthPage() {
  const context = useContext(authContext);
    const loginUsernameRef = useRef();
    const loginPasswordRef = useRef();

    const registerUsernameRef = useRef();
    const registerNameRef = useRef();
    const registerEmailRef = useRef();
    const registerPasswordRef = useRef();

    const navigator = useNavigate()

    const onLoginSubmit = async (event) => {
        event.preventDefault();
        await context.loginHandler({
          username:loginUsernameRef.current.value,
          password:loginPasswordRef.current.value,
        })
        navigator("/chats")
    }

    const onRegistrationSubmit = async (event) => {  
      event.preventDefault()

      const data = {
        username:registerUsernameRef.current.value,
        name:registerNameRef.current.value,
        email:registerEmailRef.current.value,
        password:registerPasswordRef.current.value
      }
      context.registerHandler(data)
    }

  return (
    <>
    <Form method="post" onSubmit={onRegistrationSubmit}>
      <input type="text" name="username" id="username" placeholder="username" ref={registerUsernameRef} />
      <input type="text" name="email" id="email" placeholder="email" ref={registerEmailRef}/>
      <input type="text" name="name" id="name" placeholder="name" ref={registerNameRef} />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        ref={registerPasswordRef}
      />
      <input type="submit" value="Register" />
    </Form>

    <form method="post" onSubmit={onLoginSubmit}>
        <input type="text" name="username" id='name' ref={loginUsernameRef}/>
        <input type="password" name="password" id='password' ref={loginPasswordRef}/>
        <input type="submit" value="Log in" />
    </form>
    </>
  );
}