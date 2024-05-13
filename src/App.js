import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ChatsPage from "./pages/chat_screen/page";
import AuthPage from "./pages/auth_screen/page";
import AuthProvider from "./context/AuthProvider";

const router = createBrowserRouter([
  { path: "/chats", element: <ChatsPage /> },
  { path: "/auth", element: <AuthPage /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
