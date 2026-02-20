import { useState } from 'react';
import { vehicleCards } from '../../data/vehicleCards';

export default function ActionModal({ isOpen, onClose, type, defaultCarId }) {
    if (!isOpen) return null;

    const [selectedCar, setSelectedCar] = useState(defaultCarId || 'model-y');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        zipCode: '',
        date: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Filter only vehicle cards for the selector (exclude Solar/Powerwall if type is drive)
    const cars = vehicleCards.filter(card =>
        ['model-y', 'model-3', 'model-x', 'model-s', 'cybertruck'].includes(card.id) ||
        (card.id === 'fsd' && type === 'drive') // Allow FSD for drive? Maybe not.
    ).filter(c => c.id !== 'fsd');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            onClose();
            setIsSubmitted(false);
            alert(`Request received! We'll contact you shortly about your ${type === 'drive' ? 'Test Drive' : type === 'question' ? 'Question' : 'Inventory Inquiry'}.`);
        }, 2000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const renderContent = () => {
        if (isSubmitted) {
            return (
                <div className="success-message">
                    <div className="check-icon">✓</div>
                    <h3>Request Received</h3>
                    <p>We'll be in touch shortly.</p>
                </div>
            );
        }

        switch (type) {
            case 'drive':
                return (
                    <>
                        <div className="modal-header">
                            <h2>Schedule a Demo Drive</h2>
                            <p>Test drive a Tesla at a store near you</p>
                        </div>
                        <div className="car-selector">
                            {cars.map(car => (
                                <div
                                    key={car.id}
                                    className={`car-option ${selectedCar === car.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedCar(car.id)}
                                >
                                    <img src={car.image} alt={car.title} />
                                    <span>{car.title}</span>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} className="action-form">
                            <div className="form-row">
                                <input name="firstName" placeholder="First Name" required onChange={handleChange} />
                                <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
                            </div>
                            <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} />
                            <input name="phone" type="tel" placeholder="Phone Number" required onChange={handleChange} />
                            <input name="zipCode" placeholder="Zip Code" required onChange={handleChange} />
                            <button type="submit" className="btn-primary full-width">Schedule Drive</button>
                        </form>
                    </>
                );

            case 'question':
                return (
                    <>
                        <div className="modal-header">
                            <h2>Ask a Question</h2>
                            <p>Our Tesla Advisors can help you.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="action-form">
                            <div className="form-row">
                                <input name="firstName" placeholder="First Name" required onChange={handleChange} />
                                <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
                            </div>
                            <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} />
                            <textarea name="message" placeholder="What's your question?" rows="4" required onChange={handleChange}></textarea>
                            <button type="submit" className="btn-primary full-width">Submit Question</button>
                        </form>
                    </>
                );

            case 'inventory':
                return (
                    <>
                        <div className="modal-header">
                            <h2>View Inventory</h2>
                            <p>Find the perfect Tesla for you</p>
                        </div>
                        <div className="car-selector">
                            {cars.map(car => (
                                <div
                                    key={car.id}
                                    className={`car-option ${selectedCar === car.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedCar(car.id)}
                                >
                                    <img src={car.image} alt={car.title} />
                                    <span>{car.title}</span>
                                </div>
                            ))}
                        </div>
                        <div className="inventory-search">
                            <input name="zipCode" placeholder="Enter Zip Code" onChange={handleChange} />
                            <button type="submit" className="btn-primary full-width" onClick={handleSubmit}>View Results</button>
                        </div>
                    </>
                );

            case 'order':
                return (
                    <>
                        <div className="modal-header">
                            <h2>Order Your Tesla</h2>
                            <p>Select your vehicle to begin configuration</p>
                        </div>
                        <div className="car-selector">
                            {cars.map(car => (
                                <div
                                    key={car.id}
                                    className={`car-option ${selectedCar === car.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedCar(car.id)}
                                >
                                    <img src={car.image} alt={car.title} />
                                    <span>{car.title}</span>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="btn-primary full-width" onClick={handleSubmit}>
                            Continue to Design
                        </button>
                    </>
                );

            case 'shop':
                return (
                    <>
                        <div className="modal-header">
                            <h2>Tesla Shop</h2>
                            <p>Vehicle Accessories, Apparel and Lifestyle</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <p style={{ marginBottom: '24px', color: '#5c5e62' }}>
                                Browse our latest collection of charging equipment, vehicle accessories, and Tesla apparel.
                            </p>
                            <button className="btn-primary full-width" onClick={() => window.open('https://shop.tesla.com', '_blank')}>
                                Visit Official Shop
                            </button>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'visible' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content action-modal">
                <button className="close-btn-absolute" onClick={onClose}>&times;</button>
                {renderContent()}
            </div>
        </div>
    );
}
