import { BrowserRouter as Router, Routes, Link, Route, } from "react-router-dom";
import './App.css';
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductList from "./pages/admin/ProductList";
import Home from './pages/store/home/Home';
import ForgotPassword from './pages/store/auth/ForgotPassword';
import AddProduct from "./pages/admin/AddProduct";
function App() {
  return (
    <Router>
      <Routes>
          {/* your public site routes here */}
          <Route path="/" element={<Home />} />

          {/* ADMIN */}
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Admin/ProductList" element={<ProductList />} />
          <Route path="/Admin/AddProduct" element={<AddProduct />} /> 

          {/* Login */}
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          

          
        </Routes>
      </Router>
  );
}

export default App;
  