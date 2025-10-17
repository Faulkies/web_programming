//Max

import { BrowserRouter as Router, Routes, Link, Route, } from "react-router-dom";
import './App.css';
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductList from "./pages/admin/ProductList";
import Home from "./pages/store/home/Home";
import ForgotPassword from "./pages/store/auth/ForgotPassword";
import AddProduct from "./pages/admin/AddProduct";
import CustomerLogin from "./pages/store/auth/CustomerLogin";
import Help from "./pages/store/home/Help";
import Browse from "./pages/store/home/Browse";
import Search from "./pages/store/home/Search";
import Profile from "./pages/store/home/Profile";
import ProfileOrders from "./pages/store/home/ProfileOrders";


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
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Admin/ProductList" element={<ProductList />} />
          <Route path="/Admin/AddProduct" element={<AddProduct />} /> 



          {/* AUTH */}
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Login" element={<CustomerLogin />} />

          
        </Routes>
      </Router>
  );
}

export default App;
  