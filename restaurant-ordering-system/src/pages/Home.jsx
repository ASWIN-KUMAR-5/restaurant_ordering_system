import { Link } from 'react-router-dom';
import { foodItems } from '../data/foodData';
import FoodCard from '../components/FoodCard';

const Home = ({ addToCart }) => {
  const featuredItems = foodItems.filter(item => item.isFeatured).slice(0, 3);


  return (
    <div style={{animation: 'fadeIn 0.8s ease-out'}}>
      {/* Hero Section */}
      <section className="hero-premium" style={{
        padding: '100px 0',
        textAlign: 'center',
        background: 'radial-gradient(circle at top right, #fff5f2, #ffffff)',
        borderRadius: '0 0 50px 50px',
        marginBottom: '60px'
      }}>
        <div className="container">
          <span className="badge-premium" style={{background: '#fff0eb', color: '#ff5722', marginBottom: '20px', display: 'inline-block', boxShadow: '0 4px 12px rgba(255,87,34,0.15)'}}>
            ✨ Coimbatore's Most Loved Kitchen
          </span>
          <h1 style={{
            fontSize: '64px',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '20px',
            letterSpacing: '-2px'
          }}>
            The Real <span className="text-gradient">Kovai Flavours</span> <br />
            brought to your soul.
          </h1>

          <p style={{fontSize: '20px', color: '#636e72', maxWidth: '700px', margin: '0 auto 40px'}}>
            Experience the rich heritage of Coimbatore's flavors with our traditional recipes and locally sourced ingredients.
          </p>
          <div style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
            <Link to="/menu" className="btn-premium btn-primary">
              View Menu Card 🍱
            </Link>
            <Link to="/table-booking" className="btn-premium btn-outline">
              Reserve a Table 🪑
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="container">
        <div className="section-header">
          <h2>Chef's Special Picks</h2>
          <p>Hand-picked traditional delights for your first experience.</p>
        </div>
        
        <div className="menu-grid">
          {featuredItems.map(item => (
            <FoodCard key={item.id} food={item} addToCart={addToCart} />
          ))}
        </div>
        
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <Link to="/menu" style={{
                color: '#ff5722',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '18px'
            }}>
                Explore Full Menu <span>→</span>
            </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container" style={{marginTop: '100px', marginBottom: '100px'}}>
        <div className="glass-form" style={{textAlign: 'center'}}>
          <h2 style={{fontSize: '32px', marginBottom: '50px'}}>Why Kovai Flavours?</h2>
          <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '40px'}}>
            <div style={{flex: '1', minWidth: '250px'}}>
              <div style={{fontSize: '50px', marginBottom: '20px'}}>🌾</div>
              <h3 style={{marginBottom: '10px'}}>Pure Ingredients</h3>
              <p style={{color: '#636e72'}}>Locally sourced grains and fresh spices from Erode and Coimbatore.</p>
            </div>
            <div style={{flex: '1', minWidth: '250px'}}>
              <div style={{fontSize: '50px', marginBottom: '20px'}}>⏲️</div>
              <h3 style={{marginBottom: '10px'}}>Fast Service</h3>
              <p style={{color: '#636e72'}}>Hot food served to your table within 15 minutes of ordering.</p>
            </div>
            <div style={{flex: '1', minWidth: '250px'}}>
              <div style={{fontSize: '50px', marginBottom: '20px'}}>🏺</div>
              <h3 style={{marginBottom: '10px'}}>Traditional Taste</h3>
              <p style={{color: '#636e72'}}>Generational recipes for that authentic home-cooked Kovai feeling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer CTA */}
      <section className="container" style={{marginBottom: '100px'}}>
        <div style={{
            background: 'linear-gradient(135deg, #ff5722, #ff8a65)',
            padding: '80px 40px',
            borderRadius: '40px',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 20px 50px rgba(255, 87, 34, 0.3)'
        }}>
            <h2 style={{fontSize: '48px', fontWeight: '900', marginBottom: '15px'}}>Join the Feast!</h2>
            <p style={{fontSize: '20px', opacity: '0.9', marginBottom: '40px'}}>Get 10% Discount on your first Table Booking today.</p>
            <Link to="/table-booking" className="btn-premium" style={{background: 'white', color: '#ff5722'}}>
                Book Your Table Now 🚀
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
