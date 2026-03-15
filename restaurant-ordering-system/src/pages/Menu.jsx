import { useState, useMemo } from 'react';
import { foodItems, categories } from '../data/foodData';
import FoodCard from '../components/FoodCard';

const Menu = ({ addToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");

  const processedItems = useMemo(() => {
    let result = foodItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "PriceLowHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "PriceHighLow") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Recommended") {
      result.sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      });
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div style={{paddingTop: '40px', paddingBottom: '100px'}}>
      <div className="section-header">
        <h2 className="text-gradient">Explore Our Traditional Menu</h2>
        <p>From spicy starters to cooling desserts, we have it all.</p>
      </div>

      <div className="glass-form" style={{
        marginBottom: '50px', 
        padding: '25px', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{flex: '1', minWidth: '300px', position: 'relative'}}>
            <span style={{position: 'absolute', left: '15px', top: '15px', fontSize: '20px'}}>🔍</span>
            <input
                type="text"
                placeholder="Search your favorite Kovai dish..."
                className="premium-input"
                style={{paddingLeft: '50px'}}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        
        <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
            <select 
                className="premium-input"
                style={{width: 'auto', paddingRight: '40px'}}
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="All">All Categories</option>
                {categories.filter(c => c !== "All").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <select 
                className="premium-input"
                style={{width: 'auto', paddingRight: '40px'}}
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="Recommended">Recommended</option>
                <option value="PriceLowHigh">Price: Low to High</option>
                <option value="PriceHighLow">Price: High to Low</option>
            </select>
        </div>
      </div>

      <div className="menu-grid">
          {processedItems.map(item => (
            <FoodCard 
              key={item.id} 
              food={item} 
              addToCart={addToCart} 
            />
          ))}
      </div>

      {processedItems.length === 0 && (
        <div style={{textAlign: 'center', padding: '100px 0'}}>
          <div style={{fontSize: '80px', marginBottom: '20px'}}>🏜️</div>
          <h2>Oops! No results found</h2>
          <p style={{color: '#636e72', marginBottom: '30px'}}>We couldn't find any dishes matching "{searchTerm}"</p>
          <button 
            className="btn-premium btn-primary"
            onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;