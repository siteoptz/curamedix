// CuraMedix HubSpot JavaScript
(function() {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSmoothScrolling();
        initHeaderEffects();
        initBookingModal();
        initCountdownTimer();
        initFormHandling();
    });

    // Mobile Menu Functionality
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    }

    // Smooth Scrolling
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu');
                    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                    if (navMenu && mobileMenuToggle) {
                        navMenu.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            });
        });
    }

    // Header Scroll Effects
    function initHeaderEffects() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Booking Modal
    function initBookingModal() {
        window.openBookingModal = function() {
            const modal = document.getElementById('bookingModal');
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeBookingModal = function() {
            const modal = document.getElementById('bookingModal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        };

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('bookingModal');
            if (event.target === modal) {
                closeBookingModal();
            }
        });

        // Close modal with escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeBookingModal();
            }
        });
    }

    // Countdown Timer
    function initCountdownTimer() {
        const targetDate = new Date('December 31, 2025 23:59:59').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                
                const daysElement = document.getElementById('days');
                const hoursElement = document.getElementById('hours');
                const minutesElement = document.getElementById('minutes');
                const urgencyDaysElement = document.getElementById('urgency-days');
                
                if (daysElement) daysElement.textContent = days;
                if (hoursElement) hoursElement.textContent = hours;
                if (minutesElement) minutesElement.textContent = minutes;
                if (urgencyDaysElement) {
                    urgencyDaysElement.textContent = days + ' days left';
                }
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 60000); // Update every minute
    }

    // Form Handling for HubSpot
    function initFormHandling() {
        const bookingForm = document.getElementById('bookingForm');
        
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Collect form data
                const formData = new FormData(this);
                const data = {};
                
                formData.forEach((value, key) => {
                    data[key] = value;
                });
                
                // HubSpot form submission
                // This will be handled by HubSpot's form embed code
                // For now, we'll just show a success message
                
                alert('Thank you for your interest! We will contact you within 24 hours.');
                closeBookingModal();
                bookingForm.reset();
            });
        }
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.solution-card, .tech-feature, .result-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

})();