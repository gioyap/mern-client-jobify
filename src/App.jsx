import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { 
  DashboardLayout, 
  HomeLayout, 
  Login, 
  Register,
  Error,
  Landing,
  AddJob,
  Stats,
  Admin,
  AllJob,
  Profile,
} from './pages'
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement:<Error/>,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/register',
        element: <Register/>,
      },
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/dashboard',
        element: <DashboardLayout/>,
        children:[
          {
            index: true,
            element:<AddJob/>,
          },
          {
            path: 'stats',
            element: <Stats />
          },
          {
            path: 'all-jobs',
            element: <AllJob />,
          },

          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },    
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;