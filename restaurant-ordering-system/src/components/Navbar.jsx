import { NavLink, Link } from 'react-router-dom';

const Navbar = ({ cartCount, cartTotal }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <span style={{fontSize: '32px'}}>🥣</span>
        <span>KOVAI <span style={{color: 'var(--secondary)', fontWeight: '400'}}>FLAVOURS</span></span>
      </Link>

      
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/menu">Menu</NavLink></li>
        <li><NavLink to="/order-history">Orders</NavLink></li>
        <li><NavLink to="/table-booking">Booking</NavLink></li>
      </ul>

      <div className="nav-actions" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
        <NavLink to="/cart" className="cart-badge-wrapper" style={{position: 'relative', textDecoration: 'none'}}>
          <div style={{fontSize: '24px'}}>🛒</div>
          {cartCount > 0 && (
            <span className="cart-count-badge">{cartCount}</span>
          )}
        </NavLink>
        
        <div className="nav-price">
          ₹{cartTotal}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
