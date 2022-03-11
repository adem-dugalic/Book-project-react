import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/sidebar";
import { MyRoutes, MyRoutesProtected } from "./routes";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { authUser, logout } from "./features/auth/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children }) => {
    let token = localStorage.getItem("user");
    if (!token) {
      dispatch(authUser(false));
    } else {
      let decodedToken = jwt_decode(token);
      let currentDate = new Date();
      //JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        dispatch(authUser(false));
      } else {
        dispatch(authUser(true));
      }
    }

    if (!isAuthenticated) {
      console.log(1);
      toast.error("Please login");
      dispatch(logout());
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <>
      <Router>
        <div className="relative flex bg-gray-800 overflow-y-hidden">
          <Sidebar />
          <div className="relative left-0  w-screen">
            <Routes>
              {MyRoutes.map(({ path, component }, index) => {
                const Page = component;
                return <Route key={index} path={path} element={<Page />} />;
              })}
              {MyRoutesProtected.map(({ path, component }, index) => {
                const Page = component;
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <ProtectedRoute>
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
