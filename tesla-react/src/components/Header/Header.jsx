import { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import VehiclesDropdown from '../VehiclesDropdown/VehiclesDropdown';

export default function Header({ theme, onThemeToggle }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeNav, setActiveNav] = useState('');
    const headerRef = useRef(null);
    const dropdownRef = useRef(null);

    // Feature 6: Sticky header on scroll (useState + useEffect)
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isDropdownOpen &&
                headerRef.current &&
                !headerRef.current.contains(e.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isDropdownOpen]);

    const handleVehiclesClick = () => {
        setIsDropdownOpen((prev) => !prev);
        setActiveNav('Vehicles');
    };

    const handleNavItemClick = (label) => {
        setActiveNav(label);
        setIsDropdownOpen(false);
    };

    return (
        <>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`} ref={headerRef}>
                <div className="header-container">
                    {/* Logo */}
                    <a href="#" className="logo">
                        <span className="logo-text">TESLA</span>
                    </a>

                    {/* Nav Center - Feature 5: Active Nav Highlight */}
                    <Navbar
                        activeItem={activeNav}
                        onItemClick={handleNavItemClick}
                        onVehiclesClick={handleVehiclesClick}
                    />

                    {/* Right Icons */}
                    <div className="nav-right">
                        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
                        <a href="#" aria-label="Support">
                            <svg viewBox="0 0 24 24" className="icon">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                        <a href="#" aria-label="Region">
                            <svg viewBox="0 0 24 24" className="icon">
                                <path
                                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                        <a href="#" aria-label="Account">
                            <svg viewBox="0 0 24 24" className="icon">
                                <path
                                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Feature 3: Vehicles Dropdown - Conditional Rendering */}
                <div ref={dropdownRef}>
                    <VehiclesDropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />
                </div>
            </header>
        </>
    );
}
