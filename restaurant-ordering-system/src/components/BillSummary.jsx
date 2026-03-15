const BillSummary = ({ subtotal }) => {
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + tax;

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', color: '#636e72', fontSize: '15px'}}>
        <span>Subtotal</span>
        <span style={{fontWeight: '600'}}>₹{subtotal.toFixed(2)}</span>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', color: '#636e72', fontSize: '15px'}}>
        <span>GST (5%)</span>
        <span style={{fontWeight: '600'}}>₹{tax.toFixed(2)}</span>
      </div>
      <div style={{margin: '10px 0', height: '1px', background: 'rgba(0,0,0,0.05)'}}></div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <span style={{fontWeight: '700', fontSize: '16px'}}>Grand Total</span>
        <span style={{color: '#ff5722', fontWeight: '900', fontSize: '24px'}}>₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default BillSummary;
