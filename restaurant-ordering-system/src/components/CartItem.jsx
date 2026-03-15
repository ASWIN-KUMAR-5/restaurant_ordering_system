const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-card">
      <img 
        src={item.image} 
        alt={item.name} 
        style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px'}}
      />
      <div style={{flex: 1}}>
        <h4 style={{fontSize: '18px', fontWeight: '700', marginBottom: '5px'}}>{item.name}</h4>
        <div style={{color: '#ff5722', fontWeight: '800', fontSize: '18px'}}>₹{item.price * item.quantity}</div>
        <div style={{fontSize: '12px', color: '#888'}}>₹{item.price} per unit</div>
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px'}}>
        <div className="qty-control">
            <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
            <span>{item.quantity}</span>
            <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
        </div>
        <button 
          onClick={() => removeFromCart(item.id)}
          style={{
              background: 'none', 
              border: 'none', 
              color: '#ff5722', 
              cursor: 'pointer', 
              fontSize: '13px', 
              fontWeight: '600'
          }}
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
