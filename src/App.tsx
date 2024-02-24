
import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Dashboard } from './pages/dashboard'
import { New } from './pages/dashboard/new'
import { CarDetail } from './pages/car'
import { NewParce } from './pages/dashboard/parceiros'
import { Parcerias } from './pages/parcerias'

import { Private } from './routes/Private'

import { Layout } from './components/layout'
import { Dash } from './pages/dash'

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/car/:id",
        element: <CarDetail/>
      },
      {
        path: "/dashboard",
        element: <Private><Dashboard/></Private>
      },
      {
        path: "/dash/id",
        element: <Private><Dash/></Private>
      },
      {
        path: "/dashboard/new",
        element: <Private><New/></Private>
      },
      {
        path: "/parcerias",
        element: <Parcerias/>
      },
      {
        path: "/dashboard/parceiros",
        element: <Private><NewParce/></Private>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
])

export { router };