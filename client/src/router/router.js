import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Admin, AdminDashboard } from "../components";
import { AllCategorypost, Allposts, Categoryposts, CreateCategory, Homepage, UserAccoutCreate, UserAccoutOTP, UserAccoutVerify, Users } from "../pages";
import PostList from "../pages/AdminPage/PostList";
import SingleDataPost from "../pages/SingleDataPost";
import UserAccoutLogin from "../pages/Users/UserAccoutLogin";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Homepage />
            },
            {
                path: '/allposts',
                element: <Allposts />
            },
            {
                path: '/category',
                element: <AllCategorypost />
            },
            {
                path: '/singlepost/:id',
                element: <SingleDataPost />
            },
            {
                path: '/category/:category',
                element: <Categoryposts />
            },
        ]
    },
    {
        path: '/users',
        element: <Users />,
        children: [
            {
                path: '/users/accoutverify',
                element: <UserAccoutVerify />
            },
            {
                path: '/users/otpverification',
                element: <UserAccoutOTP />
            },
            {
                path: '/users/createaccout',
                element: <UserAccoutCreate />
            },
            {
                path: '/users/login',
                element: <UserAccoutLogin />
            },
        ]
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [
            {
                path: '/admin/summary',
                element: <AdminDashboard />
            },
            {
                path: '/admin/posts',
                element: <PostList />
            },
            {
                path: '/admin/category',
                element: <CreateCategory />
            },
        ]
    }

])