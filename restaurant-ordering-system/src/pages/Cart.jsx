import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import BillSummary from '../components/BillSummary';

const Cart = ({ cart, updateQuantity, removeFromCart, clearCart, placeOrder }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    tableNumber: '',
    orderType: 'Dine-in',
    instructions: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validate = () => {
    let newErrors = {};
    if (!customerDetails.name || customerDetails.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (!customerDetails.phone || !/^\d{10}$/.test(customerDetails.phone)) {
      newErrors.phone = "Phone must be a 10-digit number";
    }
    
    // Only validate table number if order type is Dine-in
    if (customerDetails.orderType === 'Dine-in') {
      if (!customerDetails.tableNumber || isNaN(customerDetails.tableNumber)) {
        newErrors.tableNumber = "Please enter a valid table number";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => {
        const newData = { ...prev, [name]: value };
        // Clear table number error if user switches to Takeaway
        if (name === 'orderType' && value === 'Takeaway') {
            setErrors(prevErrors => {
                const { tableNumber, ...rest } = prevErrors;
                return rest;
            });
            newData.tableNumber = ''; // Clear table number if it's takeaway
        }
        return newData;
    });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isProcessing) return;
    if (!validate()) return;
    
    setIsProcessing(true);
    setTimeout(() => {
        const orderId = placeOrder(customerDetails);
        navigate('/confirmation', { state: { orderId } });
    }, 1500); // Add a small fake loading for "premium" feel
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{paddingTop: '100px', textAlign: 'center'}}>
        <div style={{fontSize: '120px', marginBottom: '30px'}}>🛒</div>
        <h2 style={{fontSize: '36px', fontWeight: '800', marginBottom: '15px'}}>Your basket is empty</h2>
        <p style={{color: '#636e72', fontSize: '18px', marginBottom: '40px'}}>Looks like you haven't discovered Kovai's hidden gems yet.</p>
        <Link to="/menu" className="btn-premium btn-primary" style={{padding: '18px 40px'}}>
            Start Exploring Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop: '60px', paddingBottom: '100px'}}>
      <div className="section-header" style={{textAlign: 'left'}}>
        <h2 className="text-gradient">Review Your Basket</h2>
        <p>Everything looks delicious! Double check before we start cooking.</p>
      </div>

      <div className="two-column-layout" style={{display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fffcfb', padding: '15px 25px', borderRadius: '15px', border: '1px solid #fff0eb'}}>
                <span style={{fontWeight: '700', fontSize: '18px'}}>{cart.length} Dishes Selected</span>
                <button onClick={clearCart} style={{background: 'none', border: 'none', color: '#ff5722', fontWeight: '700', cursor: 'pointer'}}>Clear All</button>
            </div>
            
            {cart.map(item => (
                <CartItem 
                    key={item.id} 
                    item={item} 
                    updateQuantity={updateQuantity} 
                    removeFromCart={removeFromCart} 
                />
            ))}
            
            <Link to="/menu" style={{color: '#636e72', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px'}}>
                ← Keep adding more food
            </Link>
        </div>

        <div>
            <div className="glass-form" style={{position: 'sticky', top: '120px', padding: '30px'}}>
                <h3 style={{marginBottom: '20px', fontSize: '22px'}}>Order Summary</h3>
                <BillSummary subtotal={subtotal} />
                
                <div style={{marginTop: '25px', padding: '15px', background: '#f9f9f9', borderRadius: '12px', fontSize: '14px', color: '#666', border: '1px dashed #ddd'}}>
                    <span>🚚 Delivery Type: </span>
                    <strong style={{color: '#333'}}>Table Service / Dine-in</strong>
                    <br />
                    <span>⏱️ Prep Time: </span>
                    <strong style={{color: '#ff5722'}}>20-25 mins</strong>
                </div>

                <button 
                    onClick={() => setShowModal(true)} 
                    className="btn-premium btn-primary" 
                    style={{width: '100%', marginTop: '30px', justifyContent: 'center'}}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '550px', padding: '40px', borderRadius: '30px'}}>
            <button className="close-modal" onClick={() => setShowModal(false)}>&times;</button>
            
            <div style={{textAlign: 'center', marginBottom: '30px'}}>
                <div style={{fontSize: '40px', marginBottom: '10px'}}>📋</div>
                <h3 style={{fontSize: '28px', fontWeight: '800'}}>Final Details</h3>
                <p style={{color: '#636e72'}}>We just need a few things to serve you better.</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label>Your Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="premium-input"
                  placeholder="e.g. Rahul Kumar"
                  value={customerDetails.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>{errors.name}</p>}
              </div>

              <div className="input-block">
                <label>Contact Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="premium-input"
                  placeholder="10-digit mobile number"
                  value={customerDetails.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <p style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>{errors.phone}</p>}
              </div>

              <div style={{display: 'flex', gap: '20px', marginBottom: '15px'}}>
                <div className="input-block" style={{flex: 1}}>
                  <label>Order Type</label>
                  <select name="orderType" className="premium-input" value={customerDetails.orderType} onChange={handleInputChange}>
                    <option value="Dine-in">🍽️ Dine-in</option>
                    <option value="Takeaway">🥡 Takeaway</option>
                  </select>
                </div>

                {customerDetails.orderType === 'Dine-in' && (
                  <div className="input-block" style={{flex: 1, animation: 'fadeIn 0.3s ease'}}>
                    <label>Table Number</label>
                    <input
                      type="text"
                      name="tableNumber"
                      className="premium-input"
                      placeholder="e.g. 12"
                      value={customerDetails.tableNumber}
                      onChange={handleInputChange}
                    />
                    {errors.tableNumber && <p style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>{errors.tableNumber}</p>}
                  </div>
                )}
              </div>

              <div className="input-block">
                <label>Kitchen Instructions (Optional)</label>
                <textarea
                  name="instructions"
                  className="premium-input"
                  rows="2"
                  placeholder="Less spicy? No onions? Tell us..."
                  value={customerDetails.instructions}
                  onChange={handleInputChange}
                  style={{resize: 'none', height: '80px'}}
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-premium btn-primary" 
                style={{width: '100%', marginTop: '10px', justifyContent: 'center', height: '60px'}}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Order...' : 'Place My Order 🎉'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
