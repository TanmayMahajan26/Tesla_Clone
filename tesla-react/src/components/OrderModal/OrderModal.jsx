import { useState } from 'react';

export default function OrderModal({ isOpen, onClose }) {
    // Feature 1: Form validation using state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error on change
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validate = () => {
        const newErrors = { name: '', email: '' };
        let isValid = true;

        if (formData.name.trim() === '') {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setIsSubmitted(true);
            const userName = formData.name;

            setTimeout(() => {
                onClose();
                alert(`Thank you, ${userName}! We have received your order request.`);
                // Reset form
                setFormData({ name: '', email: '', phone: '' });
                setErrors({ name: '', email: '' });
                setIsSubmitted(false);
            }, 1000);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`modal-overlay ${isOpen ? 'visible' : ''}`}
            onClick={handleOverlayClick}
            style={!isOpen ? { pointerEvents: 'none' } : {}}
        >
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>&times;</button>
                <h2>Order Your Tesla</h2>
                <p>Enter your details to proceed.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="order-name">Full Name</label>
                        <input
                            type="text"
                            id="order-name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className={errors.name ? 'error' : ''}
                        />
                        <div className="error-msg">{errors.name}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="order-email">Email Address</label>
                        <input
                            type="text"
                            id="order-email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={errors.email ? 'error' : ''}
                        />
                        <div className="error-msg">{errors.email}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="order-phone">Phone Number</label>
                        <input
                            type="tel"
                            id="order-phone"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-primary full-width ${isSubmitted ? 'btn-success' : ''}`}
                    >
                        {isSubmitted ? 'Request Received!' : 'Submit Order'}
                    </button>
                </form>
            </div>
        </div>
    );
}
