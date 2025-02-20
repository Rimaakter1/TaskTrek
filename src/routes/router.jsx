import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ErrorPage from '../pages/ErrorPage'
import Profile from '../Components/Profile/Profile'
import AddTask from '../Components/AddTask/AddTask'
import Home from '../pages/Home'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
        
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'add-task',
                element:<AddTask></AddTask>
            }
        ],
    },
   


])