import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/sidebar';
import { MyRoutes, MyRoutesProtected } from './routes';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { useEffect } from 'react';

function App() {
  let token = localStorage.getItem('user');
  const dispatch = useDispatch();

  const guard = () => {
    if (token) {
      return false;
    }
    console.log(token);
    let decodedToken = jwt_decode(token);
    console.log('Decoded Token', decodedToken);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log('Token expired.');
      return false;
    } else {
      console.log('Valid token');
      return true;
    }
  };

  const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      dispatch(logout());
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  useEffect(() => {}, [dispatch]);

  return (
    <>
      <Router>
        <div className="relative flex bg-gray-800 overflow-y-hidden">
          <Sidebar />
          <div className="relative left-0  w-screen">
            <Routes>
              {MyRoutes.map(({ path, component }, index) => {
                const Page = component;
                return (
                  <Route key={index} path={path} element={<Page />} />
                );
              })}
              {MyRoutesProtected.map(({ path, component }, index) => {
                const Page = component;
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <ProtectedRoute user={guard}>
                        <Page />
                      </ProtectedRoute>
                    }
                  />
                );
              })}
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
