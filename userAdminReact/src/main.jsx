import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx'
import UserSignup from './pages/UserSignup.jsx'
import UserLogin from './pages/UserLogin.jsx'
import Home from './pages/Home.jsx'


const router = createBrowserRouter([
  {
    path : '/',
    element : < App />,
    children : [
      {
        path : '/',
        element : < UserLogin />
      },
      {
        path : '/signup',
        element : < UserSignup />
      },
      {
        path : '/user-home',
        element : ( 
          < ProtectedRoute > 
            < Home /> 
          </ProtectedRoute> 
        )
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Provider store={store} >
      < RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
