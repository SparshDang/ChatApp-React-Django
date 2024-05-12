import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ChatsPage from "./pages/chat_screen/page";
import AuthPage, {AuthAction} from "./pages/auth_screen/page";



const router = createBrowserRouter(
  [
    {path:"/chats", element: <ChatsPage/>},
    {path:"/auth", element: <AuthPage/>, action:AuthAction},
  ]
)

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
