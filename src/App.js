import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error, Landing, Auth, Profile } from "./pages/";
import { ToastContainer } from "react-toastify";
import AuthContext from "./store/auth-context";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const authCtxt = useContext(AuthContext);
  console.log(authCtxt);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {!authCtxt.isLoggedIn && <Route path="auth" element={<Auth />} />}
        {authCtxt.isLoggedIn && <Route path="profile" element={<Profile />} />}
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
