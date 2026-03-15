import { useState } from 'react';

const FoodCard = ({ food, addToCart }) => {
  const [imgError, setImgError] = useState(false);

  // Generate a consistent color for the placeholder based on the name
  const getBackgroundColor = (name) => {
    const colors = [
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
      'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
      'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className={`food-card ${!food.isAvailable ? 'out-of-stock' : ''}`} style={{opacity: food.isAvailable ? 1 : 0.8, filter: food.isAvailable ? 'none' : 'grayscale(0.4)'}}>
      <div className="card-img-wrapper" style={{position: 'relative'}}>
        {!imgError ? (
          <img 
            src={food.image} 
            alt={food.name} 
            onError={() => setImgError(true)} 
            style={{filter: food.isAvailable ? 'none' : 'grayscale(1)'}}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: getBackgroundColor(food.name),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '60px',
            color: 'white',
            fontWeight: '800',
            textShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            {food.name.charAt(0)}
          </div>
        )}

        {!food.isAvailable && (
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                backdropFilter: 'blur(2px)'
            }}>
                <span style={{
                    background: '#f44336',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '50px',
                    fontWeight: '800',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 15px rgba(244, 67, 54, 0.4)'
                }}>
                    Out of Stock 🚫
                </span>
            </div>
        )}
        
        {food.isAvailable && food.isPopular && (
          <span className="badge-premium" style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#ff5722',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            zIndex: 10,
            backdropFilter: 'blur(5px)'
          }}>
            🔥 Popular
          </span>
        )}
      </div>

      <div className="food-info">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
          <h3 style={{margin: 0, color: food.isAvailable ? 'inherit' : '#888'}}>{food.name}</h3>
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            background: food.isAvailable ? '#fff9f0' : '#f5f5f5', 
            padding: '4px 8px', 
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '700',
            color: food.isAvailable ? '#ffa000' : '#888'
          }}>
            ⭐ {food.rating}
          </div>
        </div>
        <p style={{
          color: '#636e72', 
          fontSize: '14px', 
          marginBottom: '20px',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.5',
          opacity: food.isAvailable ? 1 : 0.6
        }}>
          {food.description || "Experience the authentic traditional taste of Coimbatore in every bite. 🌿"}
        </p>
        
        <div className="food-meta" style={{marginTop: 'auto'}}>
          <div className="price-tag" style={{fontSize: '22px', color: food.isAvailable ? 'var(--primary)' : '#888'}}>₹{food.price}</div>
          <button 
            className={`btn-premium ${food.isAvailable ? 'btn-primary' : ''}`}
            onClick={() => food.isAvailable && addToCart(food)}
            disabled={!food.isAvailable}
            style={{
                padding: '10px 22px', 
                fontSize: '14px',
                background: food.isAvailable ? 'var(--primary)' : '#eee',
                color: food.isAvailable ? 'white' : '#888',
                cursor: food.isAvailable ? 'pointer' : 'not-allowed',
                boxShadow: food.isAvailable ? '0 10px 25px rgba(255, 87, 34, 0.2)' : 'none'
            }}
          >
            {food.isAvailable ? 'Add +' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
