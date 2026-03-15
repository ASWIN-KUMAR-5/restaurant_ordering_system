import { Link } from 'react-router-dom';

const OrderHistory = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="container" style={{paddingTop: '100px', textAlign: 'center'}}>
        <div style={{fontSize: '100px', marginBottom: '30px'}}>📜</div>
        <h2 style={{fontSize: '36px', fontWeight: '800', marginBottom: '15px', color: '#333'}}>No Orders Found</h2>
        <p style={{color: '#636e72', fontSize: '18px', marginBottom: '40px'}}>You haven't tasted the magic yet. Your history is waiting for its first entry!</p>
        <Link to="/menu" className="btn-premium btn-primary" style={{padding: '18px 40px'}}>
            Order Something Tasty
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop: '60px', paddingBottom: '100px'}}>
      <div className="section-header">
        <h2 className="text-gradient">Your Food Journey</h2>
        <p>A history of every traditional bite you've enjoyed with us.</p>
      </div>

      <div style={{maxWidth: '850px', margin: '0 auto'}}>
        {orders.map((order) => (
          <div key={order.id} className="glass-form" style={{padding: '35px', marginBottom: '30px', position: 'relative', border: '1px solid rgba(0,0,0,0.03)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px'}}>
              <div>
                <span style={{fontSize: '11px', fontWeight: '800', color: '#ff5722', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '4px'}}>Receipt ID</span>
                <span style={{fontWeight: '900', fontSize: '22px', color: '#333'}}>{order.id}</span>
                <span style={{display: 'block', fontSize: '13px', color: '#999', marginTop: '5px'}}>📅 {order.date}</span>
              </div>
              <div style={{textAlign: 'right'}}>
                <span className="badge-premium" style={{
                    background: '#e3f2fd', 
                    color: '#1976d2', 
                    display: 'inline-block', 
                    padding: '8px 16px',
                    borderRadius: '12px'
                }}>
                    🍽️ {order.status}
                </span>
                <div style={{marginTop: '10px', fontSize: '13px', color: '#636e72'}}>
                    Table: <strong>{order.customer.tableNumber}</strong>
                </div>
              </div>
            </div>
            
            <div style={{background: '#fafafa', padding: '25px', borderRadius: '18px', marginBottom: '30px', border: '1px solid #f0f0f0'}}>
                <div style={{marginBottom: '15px', fontWeight: '800', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px', color: '#888'}}>
                    Items Ordered
                </div>
                {order.items.map((item, idx) => (
                    <div key={idx} style={{display: 'flex', justifyContent: 'space-between', fontSize: '16px', marginBottom: '8px'}}>
                        <span style={{fontWeight: '600'}}>
                            {item.name} <span style={{color: '#ff5722', fontSize: '14px'}}>x {item.quantity}</span>
                        </span>
                        <span style={{fontWeight: '700'}}>₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px dashed #eee', paddingTop: '25px'}}>
                <div style={{fontSize: '14px', color: '#636e72'}}>
                    <p style={{marginBottom: '5px'}}><strong>Placed By:</strong> {order.customer.name}</p>
                    <p><strong>Order Type:</strong> {order.customer.orderType}</p>
                </div>
                <div style={{textAlign: 'right'}}>
                    <span style={{fontSize: '13px', fontWeight: '800', color: '#999', textTransform: 'uppercase'}}>Total Amount</span>
                    <h3 style={{color: '#ff5722', fontSize: '32px', fontWeight: '900'}}>₹{order.total.toFixed(2)}</h3>
                </div>
            </div>

            <div style={{
                marginTop: '25px', 
                padding: '12px 20px', 
                background: '#fff9f7', 
                borderRadius: '12px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '10px',
                fontSize: '14px',
                color: '#ff5722',
                fontWeight: '600'
            }}>
                ⏱️ Estimated cooking time: {order.prepTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
