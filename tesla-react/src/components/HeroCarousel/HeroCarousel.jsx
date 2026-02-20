import { useState, useEffect, useCallback } from 'react';

export default function HeroCarousel({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Feature 4: Auto-advance slider with useEffect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = useCallback((index) => {
        let newIndex = index;
        if (newIndex < 0) newIndex = slides.length - 1;
        if (newIndex >= slides.length) newIndex = 0;
        setCurrentIndex(newIndex);
    }, [slides.length]);

    const currentSlide = slides[currentIndex];

    return (
        <section
            className="hero-card"
            style={{ backgroundImage: `url('${currentSlide.image}')` }}
        >
            <div className="card-content centered">
                <h1 className="card-title text-white">{currentSlide.model}</h1>
                <p className="card-subtitle text-white">{currentSlide.subtitle}</p>
                <div className="card-buttons">
                    <a href="#" className="btn btn-primary" onClick={(e) => e.preventDefault()}>
                        Order Now
                    </a>
                    <a href="#" className="btn btn-white" onClick={(e) => e.preventDefault()}>
                        View Inventory
                    </a>
                </div>
            </div>

            {/* Carousel Arrows */}
            <button
                className="carousel-arrow arrow-left"
                aria-label="Previous Slide"
                onClick={() => goToSlide(currentIndex - 1)}
            >
                &#10094;
            </button>
            <button
                className="carousel-arrow arrow-right"
                aria-label="Next Slide"
                onClick={() => goToSlide(currentIndex + 1)}
            >
                &#10095;
            </button>

            {/* Pagination Dots */}
            <div className="carousel-dots">
                {slides.map((_, i) => (
                    <span
                        key={i}
                        className={`dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(i)}
                    />
                ))}
            </div>
        </section>
    );
}
