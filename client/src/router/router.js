import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Admin, AdminDashboard } from "../components";
import Deletesingle from "../components/admin/DeleteSingle";
import CreateCategoryback from "../Hooks/category/CreateCategory";
import DeleteCategory from "../Hooks/category/DeleteCategory";
import { AllCategorypost, Allposts, Categoryposts, CreateCategory, CreatePost, Homepage, UserAccoutCreate, UserAccoutOTP, UserAccoutVerify, Users } from "../pages";
import PostList from "../pages/AdminPage/PostList";
import PostUpdate from "../pages/AdminPage/PostUpdate";
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
            {
                path: '/admin/createcategory',
                element: <CreateCategoryback />
            },
            {
                path: '/admin/deletecategory/:id',
                element: <DeleteCategory />
            },
            {
                path: '/admin/createpost',
                element: <CreatePost />
            },
            {
                path: '/admin/updatepost/:id',
                element: <PostUpdate />
            },
            {
                path: '/admin/deletesingle/:id',
                element: <Deletesingle />
            },
        ]
    }

])