import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { useContext } from "react";

import BasePage from "./pages/BasePage";
import ChatsPage from "./pages/chat_screen/page";
import AuthPage from "./pages/auth_screen/page";
import FriendsPage from "./pages/friends_screen/page";
import authContext from "./context/AuthContext";


function App() {
  const context = useContext(authContext);

  const setUserHandler = async () => {
    if (!context.userData.isAuthenticated){
      await context.setUser()
    }
    return null
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BasePage />,
      children: [
        { path: "/:friend", element: <ChatsPage />, loader:setUserHandler },
        { path: "/auth", element: <AuthPage /> },
        { index:true, element: <FriendsPage /> },
      ],
    },
  ]);
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
