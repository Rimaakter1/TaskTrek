import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ErrorPage from '../pages/ErrorPage'
import AddTask from '../pages/AddTask'
import Home from '../pages/Home'
import TasksBoard from '../pages/TasksBoard'
import Profile from '../pages/Profile'
import TodayTasks from '../pages/TodayTasks'
import UpcomingTasks from '../pages/UpcomingTasks'
import { Settings } from 'lucide-react'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },


            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'add-task',
                element: <AddTask></AddTask>
            },
            {
                path: 'tasks-board',
                element: <TasksBoard></TasksBoard>
            },
            {
                path: 'today-tasks',
                element: <TodayTasks></TodayTasks>
            },
            {
                path: 'upcoming-tasks',
                element: <UpcomingTasks></UpcomingTasks>
            },
            {
                path: 'settings',
                element: <Settings></Settings>
            }
        ],
    },
    {
        path: 'login',
        element: <Login></Login>
    },
    {
        path: 'register',
        element: <Register></Register>
    },



])