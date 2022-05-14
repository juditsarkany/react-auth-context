import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error, Landing, Auth, Profile } from "./pages/";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./store/auth-context";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="auth" element={<Auth />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
