import { useState, useEffect, useRef } from 'react';
import { navItems } from '../../data/navItems';

export default function Navbar({ activeItem, onItemClick, onVehiclesClick }) {
    return (
        <nav className="nav-center">
            {navItems.map((item) => (
                <a
                    key={item.label}
                    className={activeItem === item.label ? 'active' : ''}
                    onClick={(e) => {
                        e.preventDefault();
                        if (item.label === 'Vehicles') {
                            onVehiclesClick();
                        } else if (item.sectionId) {
                            const target = document.getElementById(item.sectionId);
                            if (target) target.scrollIntoView({ behavior: 'smooth' });
                            onItemClick(item.label);
                        } else {
                            onItemClick(item.label);
                        }
                    }}
                >
                    {item.label}
                </a>
            ))}
        </nav>
    );
}
