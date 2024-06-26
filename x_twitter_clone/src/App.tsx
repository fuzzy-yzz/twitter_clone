import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import CreateAccount from "./routes/create-account";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
// import { useInsertionEffect } from "react";
import { useState } from "react";
import { useEffect } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./routes/firebase";
import ProtectedRoute from "./components/protected_route";
import ForgotPassword from "./routes/forgot-password";

const router = createBrowserRouter([
  {
    path:"/", 
    element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute> 
    ),
    children: [
      {
        path: "",
        element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute> 
        ),
      },
      {
        path: "profile",
        element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute> 
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-ststem, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;
function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    //wait for firebase
    await auth.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
