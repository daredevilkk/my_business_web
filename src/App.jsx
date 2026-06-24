import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Store from "./components/Store"
import Admin from "./components/Admin"
import Order from "./components/Order"; 
import Help from "./components/Help";
import ProductDetails from "./components/ProductDetails";
import AdminLogin from "./components/AdminLogin";
import { Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Login from "./components/Login";
import "./App.css";
 
function App() {
return (
  
  <>   
<Navbar/>
<Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />  
        <Route path="/" element={<Hero />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/help" element={<Help />} />
        <Route path="/store" element={<Store />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/product/:id" element={<Product />} />
</Routes>


  </>
  


   
);

}
export default App