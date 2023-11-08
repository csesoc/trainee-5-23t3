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
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import JoinedSessionPage from './routes/JoinedSessionPage';
import StartSessionButton from './components/CreateSessionButton';
import LiveSessionController from './routes/LiveSessionController';

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
