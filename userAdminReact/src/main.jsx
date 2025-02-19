import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx'
import Loader from './utils/Loader/Loader.jsx'
// import AdminLogin from './pages/AdminLogin.jsx'
// import UserSignup from './pages/UserSignup.jsx'
// import UserLogin from './pages/UserLogin.jsx'
// import Home from './pages/Home.jsx'
// import Profile from './pages/Profile.jsx'
// import EditProfile from './pages/EditProfile.jsx'

const UserSignup = React.lazy(()=> import('./pages/UserSignup.jsx')) 
const UserLogin = React.lazy(()=> import('./pages/UserLogin.jsx')) 
const Home = React.lazy(()=> import('./pages/Home.jsx')) 
const Profile = React.lazy(()=> import('./pages/Profile.jsx')) 
const EditProfile = React.lazy(()=> import('./pages/EditProfile.jsx')) 
const AdminLogin = React.lazy(()=> import('./pages/AdminLogin.jsx'))
const AdminHome = React.lazy(()=> import('./pages/AdminHome.jsx'))
const AdminUserUpdate = React.lazy(()=> import('./pages/AdminUserUpdate.jsx'))
const AdminUserSignup = React.lazy(()=> import('./pages/AdminUserSignup.jsx'))

const router = createBrowserRouter([
  {
    path : '/',
    element : < App />,
    children : [
      {
        path : '/',
        element : (
          < ProtectedRoute authentication={false} >
            < UserLogin />
          </ProtectedRoute>
        )
      },
      {
        path : '/signup',
        element : (
          < ProtectedRoute authentication={false} >
            < UserSignup />
          </ProtectedRoute>
        )
      },
      {
        path : '/user-home',
        element : ( 
          < ProtectedRoute authentication > 
            < Home /> 
          </ProtectedRoute> 
        )
      },
      {
        path : '/user-profile',
        element : (
          < ProtectedRoute authentication >
            < Profile />
          </ProtectedRoute>
        )
      },
      {
        path : '/update-profile',
        element : (
          < ProtectedRoute authentication >
            < EditProfile />
          </ProtectedRoute>
        )
      },
      {
        path : '/admin-login',
        element : (
          < ProtectedRoute authentication={false} >
            < AdminLogin />
          </ProtectedRoute>
        )
      },
      {
        path : '/admin-home',
        element : (
          < ProtectedRoute authentication >
            < AdminHome />
          </ProtectedRoute>
        )
      },
      {
        path : '/admin-user-update/:userId',
        element : (
          < ProtectedRoute authentication >
            < AdminUserUpdate />
          </ProtectedRoute>
        )
      },
      {
        path : '/admin-user-signup',
        element : (
          < ProtectedRoute authentication >
            < AdminUserSignup />
          </ProtectedRoute>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Suspense fallback={<Loader/>}>
      < Provider store={store} >
        < RouterProvider router={router} />
      </Provider>
    </Suspense>
  </StrictMode>,
)
