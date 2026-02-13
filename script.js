/* 
   Tesla Clone - Activity 2
   JavaScript Implementation
   
   Features Implemented:
   1. Vehicles Dropdown (Show/Hide Sections)
   2. Order Now Modal (Form Validation + Button Click)
   3. Hero Carousel (Image Gallery / Slider) with Arrow Buttons
   4. Scroll Interaction (Smooth Scroll + Sticky Header)
   + Basic Button Click Interaction on all buttons
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tesla Clone JS loaded.');

    /* =========================================
       Feature 1: Vehicles Dropdown (Show/Hide)
       ========================================= */
    const vehiclesLink = document.getElementById('vehicles-link');
    const vehiclesDropdown = document.getElementById('vehicles-dropdown');

    if (vehiclesLink && vehiclesDropdown) {
        // Toggle dropdown on click
        vehiclesLink.addEventListener('click', (e) => {
            e.preventDefault();
            vehiclesDropdown.classList.toggle('visible');
        });
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!vehiclesLink.contains(e.target) && !vehiclesDropdown.contains(e.target)) {
                vehiclesDropdown.classList.remove('visible');
            }
        });
    }

    /* =========================================
       Feature 2: Order Now Modal + Form Validation
       ========================================= */
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-modal');
    const orderForm = document.getElementById('order-form');

    // Collect ALL "Order Now" buttons
    const orderBtns = document.querySelectorAll('.btn-primary, .btn-primary-small');

    // Open Modal when any "Order Now" button is clicked
    orderBtns.forEach(btn => {
        if (btn.textContent.trim() === 'Order Now') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.remove('hidden');
                setTimeout(() => modal.classList.add('visible'), 10);
            });
        }
    });

    // Close Modal
    function closeModal() {
        modal.classList.remove('visible');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Form Validation on Submit
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');

            // Reset errors
            document.querySelectorAll('.form-group input').forEach(i => i.classList.remove('error'));
            document.querySelectorAll('.error-msg').forEach(m => { m.style.display = 'none'; m.textContent = ''; });

            // Name check
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            // Email check
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            }

            if (isValid) {
                const submitBtn = orderForm.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Request Received!';
                submitBtn.style.backgroundColor = '#3da35d';
                setTimeout(() => {
                    closeModal();
                    alert('Thank you, ' + nameInput.value + '! We have received your order request.');
                    orderForm.reset();
                    submitBtn.textContent = 'Submit Order';
                    submitBtn.style.backgroundColor = '';
                }, 1000);
            }
        });
    }

    function showError(input, message) {
        input.classList.add('error');
        const errorMsg = input.parentElement.querySelector('.error-msg');
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    }

    /* =========================================
       Feature 3: Hero Carousel (Image Gallery)
       ========================================= */
    const heroSection = document.getElementById('hero-section');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroDots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');

    // Set transitions on text
    if (heroTitle) heroTitle.style.transition = 'opacity 0.3s ease';
    if (heroSubtitle) heroSubtitle.style.transition = 'opacity 0.3s ease';

    // Carousel images - using images already present on the page as fallback
    const carouselData = [
        {
            model: "Model 3",
            subtitle: "2.99% APR Available",
            image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Card-Model-3-Desktop-US_PR_MX.jpg"
        },
        {
            model: "Model Y",
            subtitle: "From $31,490 After Tax Credit",
            image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Card-Model-Y-Performance-Desktop-NA-v2.jpg"
        },
        {
            model: "Model S",
            subtitle: "From $66,490",
            image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-Main-Hero-Desktop-LHD.jpg"
        },
        {
            model: "Model X",
            subtitle: "From $63,990",
            image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-X-Main-Hero-Desktop-LHD.jpg"
        }
    ];

    let currentSlide = 0;
    let autoSlideTimer = null;

    // Preload all images to avoid blank screens
    carouselData.forEach(item => {
        const img = new Image();
        img.src = item.image;
    });

    function goToSlide(index) {
        // Wrap around
        if (index < 0) index = carouselData.length - 1;
        if (index >= carouselData.length) index = 0;

        const data = carouselData[index];

        // Fade out
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';

        setTimeout(() => {
            heroSection.style.backgroundImage = "url('" + data.image + "')";
            heroTitle.textContent = data.model;
            heroSubtitle.textContent = data.subtitle;
            heroTitle.style.opacity = '1';
            heroSubtitle.style.opacity = '1';
        }, 300);

        // Update dots
        heroDots.forEach(d => d.classList.remove('active'));
        if (heroDots[index]) heroDots[index].classList.add('active');

        currentSlide = index;
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideTimer = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideTimer) clearInterval(autoSlideTimer);
    }

    // Dot clicks
    heroDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(i);
            startAutoSlide();
        });
    });

    // Arrow button clicks
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(currentSlide - 1);
            startAutoSlide();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(currentSlide + 1);
            startAutoSlide();
        });
    }

    // Start auto-rotation
    startAutoSlide();

    /* =========================================
       Feature 4: Sticky Header + Smooth Scroll
       ========================================= */
    const header = document.querySelector('.header');

    // Sticky header - add background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Map nav text to section IDs for smooth scroll
    const navMap = {
        'Energy': 'energy-section',
        'Charging': 'charging-section',
        'Discover': 'discover-section'
    };

    document.querySelectorAll('.nav-center a').forEach(link => {
        const text = link.textContent.trim();
        if (navMap[text]) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(navMap[text]);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    /* =========================================
       Button Click Interactions
       ========================================= */

    // "Ask a Question" button - show a display message
    document.querySelectorAll('.sticky-btn').forEach(btn => {
        const text = btn.textContent.trim();

        if (text.includes('Ask a Question')) {
            btn.addEventListener('click', () => {
                // Create a floating message instead of alert
                let msgBox = document.getElementById('ask-msg');
                if (!msgBox) {
                    msgBox = document.createElement('div');
                    msgBox.id = 'ask-msg';
                    msgBox.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
                        'background:white;padding:30px 40px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.3);' +
                        'z-index:9999;text-align:center;font-family:Inter,sans-serif;';
                    msgBox.innerHTML = '<h3 style="margin-bottom:10px;">💬 Ask a Question</h3>' +
                        '<p style="color:#5c5e62;margin-bottom:20px;">Button clicked! A Tesla Advisor will be with you shortly.</p>' +
                        '<button onclick="this.parentElement.remove()" style="padding:8px 24px;background:#3e6ae1;color:white;border:none;border-radius:4px;cursor:pointer;font-size:14px;">OK</button>';
                    document.body.appendChild(msgBox);
                }
            });
        }

        if (text.includes('Schedule a Drive')) {
            btn.addEventListener('click', () => {
                let msgBox = document.getElementById('drive-msg');
                if (!msgBox) {
                    msgBox = document.createElement('div');
                    msgBox.id = 'drive-msg';
                    msgBox.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);' +
                        'background:white;padding:30px 40px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.3);' +
                        'z-index:9999;text-align:center;font-family:Inter,sans-serif;';
                    msgBox.innerHTML = '<h3 style="margin-bottom:10px;">🚗 Schedule a Drive</h3>' +
                        '<p style="color:#5c5e62;margin-bottom:20px;">Button clicked! Redirecting to scheduling page...</p>' +
                        '<button onclick="this.parentElement.remove()" style="padding:8px 24px;background:#3e6ae1;color:white;border:none;border-radius:4px;cursor:pointer;font-size:14px;">OK</button>';
                    document.body.appendChild(msgBox);
                }
            });
        }
    });

    // "Learn More" and "View Inventory" buttons - simple interaction
    document.querySelectorAll('.btn').forEach(btn => {
        const text = btn.textContent.trim();
        // Skip order buttons (handled by modal) and submit button
        if (text === 'Order Now' || text === 'Submit Order') return;

        if (text === 'Learn More' || text === 'View Inventory') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('You clicked: ' + text + '\nThis would navigate to the details page.');
            });
        }
    });

});
