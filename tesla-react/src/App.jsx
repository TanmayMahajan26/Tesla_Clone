import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import HeroCarousel from './components/HeroCarousel/HeroCarousel';
import CardGrid from './components/CardGrid/CardGrid';
import OrderModal from './components/OrderModal/OrderModal';
import StickyBar from './components/StickyBar/StickyBar';
import Footer from './components/Footer/Footer';

import { carouselData } from './data/carouselData';
import { vehicleCards } from './data/vehicleCards';
import { footerLinks } from './data/footerLinks';

export default function App() {
    // Feature 2: Theme toggle with localStorage (useState + useEffect)
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('tesla-theme') || 'light';
    });

    // Feature 1: Modal open state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Bonus: localStorage persistence for theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('tesla-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            {/* Header with sticky scroll, nav highlight, dropdown, theme toggle */}
            <Header theme={theme} onThemeToggle={toggleTheme} />

            <main className="main-container">
                {/* Hero Carousel - receives slides as props */}
                <HeroCarousel slides={carouselData} />

                {/* Card Grid - renders VehicleCards dynamically from data */}
                <CardGrid cards={vehicleCards} onOrderClick={openModal} />

                {/* Footer - receives links as props */}
                <Footer links={footerLinks} />
            </main>

            {/* Order Modal - form validation with state */}
            <OrderModal isOpen={isModalOpen} onClose={closeModal} />

            {/* Sticky Bottom Bar */}
            <StickyBar />
        </>
    );
}
