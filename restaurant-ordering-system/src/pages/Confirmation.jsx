import { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import FoodGame from '../components/FoodGame';

const Confirmation = () => {
  const [showGame, setShowGame] = useState(false);
  const location = useLocation();
  const orderId = location.state?.orderId;

  if (!orderId) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <div className="container" style={{padding: '80px 0', textAlign: 'center', animation: 'fadeIn 1s ease-out'}}>
      <div style={{fontSize: '100px', marginBottom: '30px'}}>🍽️</div>
      <h1 className="text-gradient" style={{fontSize: '52px', fontWeight: '900', marginBottom: '15px'}}>Cooking in Progress!</h1>
      <p style={{fontSize: '20px', color: '#636e72', maxWidth: '600px', margin: '0 auto 50px'}}>
        The chefs at Kovai Flavours have received your order. Your authentic feast is being prepared with care.
      </p>
      
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center', alignItems: 'flex-start'}}>
        <div className="glass-form" style={{width: '100%', maxWidth: '420px', padding: '40px', textAlign: 'left'}}>
            <div style={{marginBottom: '30px'}}>
                <span style={{fontSize: '12px', fontWeight: '800', color: '#ff5722', textTransform: 'uppercase', letterSpacing: '2px'}}>Order Reference</span>
                <h2 style={{fontSize: '32px', fontWeight: '900', color: '#333', marginTop: '5px'}}>{orderId}</h2>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', background: '#fff9f7', padding: '15px', borderRadius: '18px', border: '1px solid #fff0eb'}}>
                    <div style={{fontSize: '24px', background: 'white', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)'}}>🔥</div>
                    <div>
                        <p style={{fontSize: '12px', color: '#999', fontWeight: '600'}}>Status</p>
                        <p style={{fontSize: '16px', fontWeight: '800', color: '#333'}}>Preparing Hot & Fresh</p>
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', background: '#fff9f7', padding: '15px', borderRadius: '18px', border: '1px solid #fff0eb'}}>
                    <div style={{fontSize: '24px', background: 'white', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)'}}>⏲️</div>
                    <div>
                        <p style={{fontSize: '12px', color: '#999', fontWeight: '600'}}>Est. Serving Time</p>
                        <p style={{fontSize: '16px', fontWeight: '800', color: '#333'}}>20 - 25 Minutes</p>
                    </div>
                </div>
            </div>

            <div style={{marginTop: '30px', display: 'flex', gap: '15px'}}>
                <Link to="/order-history" className="btn-premium btn-outline" style={{flex: 1, justifyContent: 'center', padding: '12px'}}>History</Link>
                <Link to="/" className="btn-premium btn-primary" style={{flex: 1.5, justifyContent: 'center', padding: '12px'}}>Back Home</Link>
            </div>
        </div>

        {/* Game Promotion Card */}
        <div style={{
            width: '100%', 
            maxWidth: '420px', 
            background: 'linear-gradient(135deg, #1a1a1b, #333)', 
            padding: '40px', 
            borderRadius: '28px', 
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}>
            <div style={{fontSize: '60px', marginBottom: '20px'}}>🎮</div>
            <h3 style={{fontSize: '24px', fontWeight: '800', marginBottom: '10px'}}>The Fun Zone</h3>
            <p style={{opacity: '0.8', marginBottom: '30px'}}>Don't let the wait be boring! Play our mini-game and catch falling food.</p>
            <button 
                onClick={() => setShowGame(true)} 
                className="btn-premium"
                style={{background: 'white', color: '#2d3436', width: '100%', justifyContent: 'center'}}
            >
                Launch Mini-Game 🚀
            </button>
            <p style={{fontSize: '12px', opacity: '0.5', marginTop: '20px'}}>Warning: Highly Addictive!</p>
        </div>
      </div>

      <FoodGame isOpen={showGame} onClose={() => setShowGame(false)} />

      <p style={{marginTop: '60px', fontSize: '14px', color: '#999'}}>
        A digital receipt of your order is available in your <Link to="/order-history" style={{color: '#ff5722', fontWeight: '600'}}>History</Link>.
      </p>
    </div>
  );
};

export default Confirmation;
