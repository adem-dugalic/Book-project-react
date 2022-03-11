import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/sidebar";
import { MyRoutes, MyRoutesProtected } from "./routes";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";
import { useEffect, useState } from "react";

function App() {
  const [isUser, setIsUser] = useState(true);
  const token = localStorage.getItem("user");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setIsUser(false);
    }
    console.log(token);
    let decodedToken = jwt_decode(token);
    console.log("Decoded Token", decodedToken);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      setIsUser(false);
    } else {
      console.log("Valid token");
      setIsUser(true);
    }
  }, [isUser, setIsUser, dispatch, token]);

  const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      toast.error("logged out");
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
                return <Route key={index} path={path} element={<Page />} />;
              })}
              {MyRoutesProtected.map(({ path, component }, index) => {
                const Page = component;
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <ProtectedRoute user={isUser}>
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
