import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error, Landing, Dashboard, Auth } from "./pages/";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./store/auth-context";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="landing" element={<Landing />} />
          <Route path="auth" element={<Auth />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
