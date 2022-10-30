import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import './index.css'
import {Login} from './Pages/Login';
import {Register} from './Pages/Register';
import {Main} from './Pages/Main';
import {ApiProvider} from "@reduxjs/toolkit/dist/query/react";
import {apiSlice} from "./redux/features/api/apiSlice";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ApiProvider api={apiSlice}>
            <RouterProvider router={router}/>
        </ApiProvider>
    </React.StrictMode>
)
