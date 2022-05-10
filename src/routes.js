import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Ideal from './pages/Ideal';
import IdealVs from './sections/@dashboard/Ideal/IdealVs'
import FinalWinner from './sections/@dashboard/Ideal/FinalWinner';
import Ranks from './sections/@dashboard/Ideal/Ranks';
import Quiz from './pages/Quiz';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        // { path: 'app', element: <DashboardApp /> },
        // { path: 'user', element: <User /> },
        // { path: 'products', element: <Products /> },
        // { path: 'blog', element: <Blog /> },
        { path: 'Ideal', element: <Ideal />},
        { path: 'Ideal/:id', element: <IdealVs />},
        { path: 'Ideal/winner/:id', element: <FinalWinner />},
        { path: 'Ideal/ranks/:id', element: <Ranks />},
        { path: 'Quiz', element: <Quiz />}

      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
