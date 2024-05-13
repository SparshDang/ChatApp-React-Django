import { createContext } from "react";

const authContext = createContext(
    {
        userData:null,
        setUser: () => {},
        logoutHandler : ()=>{},
        loginHandler : () => {},
        registerHandler : () => {}
    }
)

export default authContext;



