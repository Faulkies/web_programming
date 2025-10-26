//Max

import { BrowserRouter as Router, Routes, Link, Route, } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import './App.css';
import AdminDashboard from "./pages/store/admin/AdminDashboard";
import Home from "./pages/store/home/Home";
import ForgotPassword from "./pages/store/auth/ForgotPassword";
import AddProduct from "./pages/store/admin/AddProduct";
import CustomerLogin from "./pages/store/auth/CustomerLogin";
import Help from "./pages/store/home/Help";
import Browse from "./pages/store/home/Browse";
import Search from "./pages/store/home/Search";
import Profile from "./pages/store/home/Profile";
import ProfileOrders from "./pages/store/home/ProfileOrders";
import ProductsPage from "./pages/store/admin/ProductsPage";
import ProtectedRoute from "./pages/store/auth/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Browse" element={<Browse />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile/Orders" element={<ProfileOrders />} />

          {/* ADMIN */}
          <Route path="/Admin" element={<ProtectedRoute requiredRole="User"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/Admin/AddProduct" element={<ProtectedRoute requiredRole="User"><AddProduct /></ProtectedRoute>} />
          <Route path="/Admin/ProductsPage" element={<ProtectedRoute requiredRole="User"><ProductsPage /></ProtectedRoute>} />
          <Route path="/admin/AddNewProduct" element={<ProtectedRoute requiredRole="User"><AddProduct /></ProtectedRoute>} />



          {/* AUTH */}
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Login" element={<CustomerLogin />} />

          
        </Routes>
      </Router>
  );
}

export default App;
  