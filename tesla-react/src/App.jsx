
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import HeroCarousel from './components/HeroCarousel/HeroCarousel';
import CardGrid from './components/CardGrid/CardGrid';
import LoginModal from './components/LoginModal/LoginModal';
import ActionModal from './components/ActionModal/ActionModal';
import StickyBar from './components/StickyBar/StickyBar';
import Footer from './components/Footer/Footer';

import { carouselData } from './data/carouselData';
import { vehicleCards } from './data/vehicleCards';
import { footerLinks } from './data/footerLinks';

export default function App() {
    // Feature 2: Theme toggle with localStorage
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('tesla-theme') || 'light';
    });

    // User State
    const [user, setUser] = useState(null);

    // Modal States
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [actionModal, setActionModal] = useState({
        isOpen: false,
        type: 'drive', // drive, question, inventory, order
        carId: null
    });

    // Theme Persistence
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('tesla-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    // Handlers
    const handleLogin = (userData) => {
        setUser(userData);
        setIsLoginOpen(false);
    };

    const openActionModal = (type, carId = null) => {
        setActionModal({ isOpen: true, type, carId });
    };

    const closeActionModal = () => {
        setActionModal({ ...actionModal, isOpen: false });
    };

    return (
        <>
            <Header
                theme={theme}
                onThemeToggle={toggleTheme}
                user={user}
                onLoginClick={() => setIsLoginOpen(true)}
                onLogoutClick={() => setUser(null)}
                onShopClick={() => openActionModal('shop')}
            />

            <main className="main-container">
                <HeroCarousel
                    slides={carouselData}
                    onOrderClick={() => openActionModal('inventory')}
                    onDemoDriveClick={() => openActionModal('drive')}
                />

                <CardGrid
                    cards={vehicleCards}
                    onOrderClick={(carId) => openActionModal('order', carId)}
                    onLearnClick={(carId) => openActionModal('drive', carId)} // Learn more -> Test Drive for now or scroll
                />

                <Footer links={footerLinks} />
            </main>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLogin={handleLogin}
            />

            <ActionModal
                isOpen={actionModal.isOpen}
                onClose={closeActionModal}
                type={actionModal.type}
                defaultCarId={actionModal.carId}
            />

            <StickyBar
                onScheduleClick={() => openActionModal('drive')}
                onQuestionClick={() => openActionModal('question')}
            />
        </>
    );
}
