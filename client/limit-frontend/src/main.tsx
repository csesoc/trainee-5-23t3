import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './routes/ErrorPage';
import ExamplePage from './routes/examples/ExamplePage';
import HomePage from './routes/HomePage';
import EchoPage from './routes/examples/EchoPage';
import ModePage from './routes/ModePage';
import SessionStart from './routes/SessionStart';
import SelfSessionPage from './components/liveSession/SelfSessionPage';
import ReflectionPage from './routes/ReflectionPage';
import GoodbyePage from './routes/GoodbyePage';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import LoginPage from './routes/auth/LoginPage';
import RegisterPage from './routes/auth/RegisterPage';
import JoinedSessionPage from './routes/sessions/JoinedSessionPage';
import StartSessionButton from './components/CreateSessionButton';
import LiveSessionController from './routes/sessions/LiveSessionController';
import JoinSessionPage from './routes/sessions/JoinSessionPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "example",
        element: <ExamplePage/>
      },
      {
        path: "echo",
        element: <EchoPage/>
      },
      {
        path: "mode",
        element: <ModePage/>
      },
      {
        path: "start",
        element: <SessionStart/>
      },
      {
        path: "reflection",
        element: <ReflectionPage/>
      },
      {
        path: "goodbye",
        element: <GoodbyePage/>
      },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "join",
        element: <JoinSessionPage/>
      },
      {
        path:"join/:session",
        element: <JoinedSessionPage/>
      },
      {
        path: "create",
        element: <StartSessionButton/>
      }, 
      {
        path: "live/:session",
        element: <LiveSessionController/>,
      },
    ]
  },
  {
    path: '/outside_shell',
    element: <ExamplePage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  // </React.StrictMode>,
)
