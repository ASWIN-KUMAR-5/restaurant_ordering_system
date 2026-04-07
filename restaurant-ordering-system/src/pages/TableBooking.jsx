import { useState } from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const TableBooking = ({ showToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Morning');
  const [customTimeVisible, setCustomTimeVisible] = useState(false);

  const timeSlots = {
    Morning: ['6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    Afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'],
    Evening: ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'],
    Night: ['9:00 PM', '9:30 PM', '10:00 PM']
  };

  const validate = () => {
    let newErrors = {};
    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be a 10-digit number";
    }
    const guestNum = parseInt(formData.guests);
    if (isNaN(guestNum) || guestNum <= 0) {
      newErrors.guests = "Please select a valid number of guests";
    } else if (guestNum > 20) {
        newErrors.guests = "For more than 20 guests, please call us directly";
    }
    
    if (!formData.date) {
        newErrors.date = "Please choose a date";
    }
    if (!formData.time) {
        newErrors.time = "Please choose a time slot";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        showToast(`Table reserved for ${formData.name}!`);
        setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="container" style={{textAlign: 'center', padding: '100px 20px', animation: 'fadeIn 0.5s ease-out'}}>
        <div style={{fontSize: '100px', marginBottom: '30px'}}>🎊</div>
        <h2 className="text-gradient" style={{fontSize: '48px', fontWeight: '900'}}>Table Secured!</h2>
        <p style={{marginTop: '25px', fontSize: '20px', color: '#636e72', maxWidth: '600px', margin: '25px auto 0'}}>
          Awesome <strong>{formData.name}</strong>! We've reserved a spot for <strong>{formData.guests} people</strong> 
          on <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
        </p>
        <div style={{marginTop: '40px', display: 'flex', gap: '20px', justifyContent: 'center'}}>
            <button 
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', phone: '', guests: '2', date: '', time: '' });
              }}
              className="btn-premium btn-primary"
            >
              Make Another Booking
            </button>
            <Link to="/menu" className="btn-premium btn-outline">
              Browse Menu
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop: '60px', paddingBottom: '100px'}}>
      <div className="section-header">
        <h2 className="text-gradient">Book Your Experience</h2>
        <p style={{color: '#636e72'}}>Skip the queue and secure your favorite spot at Kovai Flavours.</p>
      </div>
      
      <div className="two-column-layout" style={{maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '50px', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
            <div>
                <h3 style={{fontSize: '24px', fontWeight: '800', marginBottom: '10px'}}>Dine in Style</h3>
                <p style={{color: '#636e72'}}>Enjoy our traditional meals in a vibrant, heritage-inspired atmosphere.</p>
            </div>
            <div style={{padding: '20px', background: '#fff0eb', borderRadius: '20px', border: '1px solid #ffe8cc'}}>
                <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <li style={{display: 'flex', gap: '10px'}}>✅ <span style={{fontSize: '14px', fontWeight: '600'}}>Instant Confirmation</span></li>
                    <li style={{display: 'flex', gap: '10px'}}>🥗 <span style={{fontSize: '14px', fontWeight: '600'}}>Special Festival Menu</span></li>
                    <li style={{display: 'flex', gap: '10px'}}>🎶 <span style={{fontSize: '14px', fontWeight: '600'}}>Traditional Folk Music</span></li>
                </ul>
            </div>
        </div>

        <div className="glass-form" style={{padding: '40px'}}>
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label>Your Full Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  className="premium-input"
                  placeholder="e.g. Rahul Kumar"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>{errors.name}</p>}
              </div>

              <div className="input-block">
                <label>Phone Number</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  className="premium-input"
                  placeholder="10 digit mobile"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <p style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>{errors.phone}</p>}
              </div>

              <div className="input-block">
                <label>Number of Guests</label>
                <select
                  name="guests"
                  className="premium-input"
                  value={formData.guests}
                  onChange={handleInputChange}
                  style={{appearance: 'none'}}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 15].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                  ))}
                </select>
                {errors.guests && <p style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>{errors.guests}</p>}
              </div>
              <div className="input-block">
                <label>Booking Date</label>
                <input
                  required
                  type="date"
                  name="date"
                  className="premium-input"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-block" style={{marginTop: '20px'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Clock size={16} /> Choose Your Slot
                </label>
                
                <div style={{marginTop: '15px'}}>
                    <div style={{display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '15px'}} className="no-scrollbar">
                        {['Morning', 'Afternoon', 'Evening', 'Night'].map(cat => (
                            <button 
                                key={cat}
                                type="button"
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '50px',
                                    whiteSpace: 'nowrap',
                                    border: 'none',
                                    background: activeCategory === cat ? '#ff5722' : '#f5f5f5',
                                    color: activeCategory === cat ? 'white' : '#666',
                                    fontWeight: '700',
                                    fontSize: '12px',
                                    cursor: 'pointer'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', maxHeight: '250px', overflowY: 'auto', padding: '5px'}} className="no-scrollbar">
                        {timeSlots[activeCategory].map(slot => (
                            <button
                                key={slot}
                                type="button"
                                onClick={() => {
                                    setFormData(prev => ({...prev, time: slot}));
                                    setCustomTimeVisible(false);
                                }}
                                style={{
                                    padding: '12px 5px',
                                    borderRadius: '12px',
                                    border: formData.time === slot && !customTimeVisible ? '2px solid #ff5722' : '2px solid #f0f0f0',
                                    background: formData.time === slot && !customTimeVisible ? '#fff0eb' : 'white',
                                    color: formData.time === slot && !customTimeVisible ? '#ff5722' : '#2d3436',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                    
                    <button 
                        type="button"
                        onClick={() => setCustomTimeVisible(!customTimeVisible)}
                        style={{
                            width: '100%',
                            marginTop: '15px',
                            padding: '12px',
                            borderRadius: '12px',
                            border: '1px dashed #ccc',
                            background: customTimeVisible ? '#f5f5f5' : 'transparent',
                            color: '#666',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        {customTimeVisible ? '❌ Close Custom Time' : '🕒 Choose Custom Time'}
                    </button>

                    {customTimeVisible && (
                        <div style={{marginTop: '10px', animation: 'fadeIn 0.3s ease'}}>
                            <input
                                type="time"
                                name="time"
                                className="premium-input"
                                value={formData.time.includes('M') ? '' : formData.time} // Clear if it was a slot
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                style={{height: '50px'}}
                            />
                            <p style={{fontSize: '11px', color: '#888', marginTop: '5px', textAlign: 'center'}}>Use this for exact minutes (e.g. 7:15 PM)</p>
                        </div>
                    )}
                </div>

                {errors.time && <p style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>{errors.time}</p>}
              </div>


              <button type="submit" className="btn-premium btn-primary" style={{width: '100%', justifyContent: 'center', marginTop: '10px', height: '60px'}}>
                Reserve My Table 🍱
              </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default TableBooking;
