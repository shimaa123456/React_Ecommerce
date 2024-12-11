import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Features/Auth/Pages/LoginPage"; 
import Register from "./Features/Auth/Pages/RegisterPage";
import Dashboard from "./Features/Admin/Pages/Dashboard";
import Home from "./Features/Customers/Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="dashboard" element={<Dashboard/>}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="home" element={<Home/>}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
