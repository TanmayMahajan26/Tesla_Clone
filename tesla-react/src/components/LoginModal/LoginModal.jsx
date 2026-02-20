import { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onLogin }) {
    const [email, setEmail] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Create Account State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            if (isCreating) {
                // Registration Flow
                if (formData.password !== formData.confirmPassword) {
                    alert("Passwords do not match!");
                    setIsLoading(false);
                    return;
                }
                const fullName = `${formData.firstName} ${formData.lastName}`;
                onLogin({ name: fullName, email });
            } else {
                // Sign In Flow
                const name = email.split('@')[0];
                const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
                onLogin({ name: formattedName, email });
            }
            setIsLoading(false);
            onClose();
        }, 1500);
    };

    const inputStyle = {
        borderRadius: '40px',
        padding: '10px 20px',
        background: '#f4f4f4',
        border: '1px solid transparent',
        width: '100%',
        marginBottom: '12px'
    };

    const labelStyle = {
        marginLeft: '12px',
        fontSize: '13px',
        color: '#5c5e62',
        fontWeight: '500',
        marginBottom: '4px',
        display: 'block'
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'visible' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content login-modal">
                <div className="modal-header">
                    <div className="login-logo">
                        <svg viewBox="0 0 342 35" xmlns="http://www.w3.org/2000/svg" className="tesla-logo-modal">
                            <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7m0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7M308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 style={{ textAlign: 'left', marginBottom: '24px', fontSize: '32px', fontWeight: '500' }}>
                        {isCreating ? 'Create Account' : 'Sign In'}
                    </h2>
                    <button className="close-btn-absolute" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleSubmit} className="login-form">

                        {/* Sign In View */}
                        {!isCreating && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="email" style={labelStyle}>Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoFocus
                                        style={inputStyle}
                                    />
                                </div>

                                <button type="submit" className="btn-primary full-width" disabled={isLoading} style={{ marginBottom: '16px' }}>
                                    {isLoading ? 'Signing In...' : 'Next'}
                                </button>

                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <a href="#" style={{ fontSize: '12px', textDecoration: 'underline', color: '#5c5e62' }} onClick={(e) => e.preventDefault()}>
                                        Trouble Signing In?
                                    </a>
                                </div>

                                <div className="divider">
                                    <span>Or</span>
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        type="button"
                                        style={{ background: 'transparent', border: 'none', textDecoration: 'underline', fontSize: '14px', color: '#171a20', cursor: 'pointer', padding: '10px' }}
                                        onClick={() => setIsCreating(true)}
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Create Account View */}
                        {isCreating && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="email" style={labelStyle}>Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName" style={labelStyle}>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName" style={labelStyle}>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" style={labelStyle}>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        style={inputStyle}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        style={inputStyle}
                                    />
                                </div>

                                <button type="submit" className="btn-primary full-width" disabled={isLoading} style={{ marginBottom: '16px' }}>
                                    {isLoading ? 'Creating...' : 'Create Account'}
                                </button>

                                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                                    <span style={{ fontSize: '14px', color: '#5c5e62' }}>Already have an account? </span>
                                    <a
                                        href="#"
                                        style={{ fontSize: '14px', textDecoration: 'underline', color: '#171a20', fontWeight: '500' }}
                                        onClick={(e) => { e.preventDefault(); setIsCreating(false); }}
                                    >
                                        Sign In
                                    </a>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
