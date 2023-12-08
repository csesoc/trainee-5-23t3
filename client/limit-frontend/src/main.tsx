import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './routes/ErrorPage';
import ExamplePage from './routes/ExamplePage';
import HomePage from './routes/HomePage';
import EchoPage from './routes/EchoPage';
import ModePage from './routes/ModePage';
import SessionStart from './routes/SessionStart';
import SessionPage from './routes/SessionPage';
import Modal from './routes/Modal';
import ReflectionPage from './routes/ReflectionPage';
import GoodbyePage from './routes/GoodbyePage';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

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
        path: "session",
        element: <SessionPage/>
      },
      {
        path: "modal",
        element: <Modal/>
      },
      {
        path: "reflection",
        element: <ReflectionPage/>
      },
      {
        path: "goodbye",
        element: <GoodbyePage/>
      }
    ]
  },
  {
    path: '/outside_shell',
    element: <ExamplePage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
