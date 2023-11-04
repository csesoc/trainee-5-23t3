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
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import TestPage from './routes/TestPage';
import StartSessionButton from './components/CreateSessionButton';

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
        element: <TestPage/>
      },
      {
        path: "start",
        element: <StartSessionButton/>
      }
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
