import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./Navbar";
import Home from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import Cart from "./Cart";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { isLoggedIn } from "./utils/auth";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Load cart from backend
  const loadCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/cart", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData.items || []);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  // Check authentication status on app load
  useEffect(() => {
    if (isLoggedIn()) {
      const token = localStorage.getItem("token");
      setUser({ token });
      loadCart();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save cart to backend
  const saveCart = async (cartItems) => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cartItems)
      });
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  // Add to cart with backend sync
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    
    if (existingItem) {
      newCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(newCart);
    
    // Save to backend if user is logged in
    if (isLoggedIn()) {
      saveCart(newCart);
    }
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    
    if (isLoggedIn()) {
      saveCart(newCart);
    }
  };

  // Update cart quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const newCart = cart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(newCart);
    
    if (isLoggedIn()) {
      saveCart(newCart);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCart([]);
  };

  return (
    <>
      <Navbar 
        cartCount={cart.reduce((total, item) => total + (item.quantity || 1), 0)} 
        user={user}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart} 
              removeFromCart={removeFromCart}
              updateCartQuantity={updateCartQuantity}
            />
          } 
        />
        <Route 
          path="/register" 
          element={!isLoggedIn() ? <Register /> : <Navigate to="/" />} 
        />
        <Route 
          path="/login" 
          element={!isLoggedIn() ? <Login setUser={setUser} loadCart={loadCart} /> : <Navigate to="/" />} 
        />
      </Routes>
    </>
  );
}

export default App;