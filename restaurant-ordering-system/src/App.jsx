import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, NavLink } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import TableBooking from './pages/TableBooking';
import OrderHistory from './pages/OrderHistory';
import Confirmation from './pages/Confirmation';

// Small component to handle auto-scroll to top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [toasts, setToasts] = useState([]);

  // Toast helper with types and icons
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const icons = {
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️',
      cart: '🛒',
      order: '🍱',
      table: '🪑'
    };
    
    setToasts(prev => [...prev, { id, message, type, icon: icons[type] || '✨' }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      showToast(`${item.name} quantity increased to ${existingItem.quantity + 1}!`, 'cart');
      setCart(prevCart => prevCart.map(cartItem =>
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      showToast(`Added ${item.name} to your basket!`, 'success');
      setCart(prevCart => [...prevCart, { ...item, quantity: 1 }]);
    }
  };


  const removeFromCart = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    showToast(`${item?.name || 'Item'} removed from cart.`, 'info');
  };

  const clearCart = () => {
    setCart([]);
    showToast("Cart has been cleared.", 'info');
  };

  const updateQuantity = (itemId, delta) => {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    setCart(prevCart => prevCart.map(i => {
      if (i.id === itemId) return { ...i, quantity: newQuantity };
      return i;
    }));

    if (delta > 0) {
        showToast(`${item.name} quantity increased!`, 'cart');
    } else {
        showToast(`${item.name} quantity decreased.`, 'info');
    }
  };

  const placeOrder = (customerDetails) => {
    const newOrder = {
      id: `KOVAI-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      customer: customerDetails,
      status: 'Order Placed',
      prepTime: '20-25 mins'
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    showToast("Order placed successfully! Chef is starting... 👨‍🍳", 'order');
    return newOrder.id;
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-main">
        <Navbar cartCount={cartCount} cartTotal={cartTotal} />
        
        <div className="container" style={{minHeight: '70vh'}}>
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="/cart" element={
              <Cart 
                cart={cart} 
                updateQuantity={updateQuantity} 
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                placeOrder={placeOrder}
              />
            } />
            <Route path="/table-booking" element={<TableBooking showToast={(msg) => showToast(msg, 'table')} />} />
            <Route path="/order-history" element={<OrderHistory orders={orders} />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </div>

        {/* Improved Toast Container */}
        <div className="toast-container">
          {toasts.map(t => (
            <div key={t.id} className={`toast ${t.type}`}>
              <div className="toast-icon">{t.icon}</div>
              <div className="toast-message">{t.message}</div>
              <div className="toast-progress">
                <div className="toast-progress-bar"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="mobile-nav-bar">
          <NavLink to="/" className="mobile-nav-link">
            <span>🏠</span>
            Home
          </NavLink>
          <NavLink to="/menu" className="mobile-nav-link">
            <span>📖</span>
            Menu
          </NavLink>
          <NavLink to="/order-history" className="mobile-nav-link">
            <span>📜</span>
            Orders
          </NavLink>
          <NavLink to="/cart" className="mobile-nav-link" style={{position: 'relative'}}>
            <span>🛒</span>
            Cart
            {cart.length > 0 && (
              <span className="cart-count-badge" style={{scale: '0.8', top: '-5px', right: '-8px'}}>
                {cart.length}
              </span>
            )}
          </NavLink>
        </div>

        <footer style={{textAlign: 'center', padding: '40px', marginTop: '80px', borderTop: '1px solid #eee'}}>
          <p style={{fontSize: '14px', color: '#888'}}>
            &copy; 2024 Kovai Flavours - Coimbatore. Traditional Taste Guaranteed.
          </p>
        </footer>

      </div>
    </Router>
  );
}

export default App;