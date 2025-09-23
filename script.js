// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
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
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.solution-card, .result-card, .testimonial-card, .tech-stat');
    animateElements.forEach(el => observer.observe(el));
    
    // Form validation
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Counter animation for statistics
    const stats = document.querySelectorAll('.stat-number, .result-percentage');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
});

// Modal functions
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Track modal open event
    trackEvent('Modal', 'Open', 'Booking Consultation');
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeBookingModal();
    }
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Success message
        showSuccessMessage();
        
        // Reset form
        e.target.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Close modal after delay
        setTimeout(() => {
            closeBookingModal();
        }, 3000);
        
        // Track form submission
        trackEvent('Form', 'Submit', 'Booking Consultation');
    }, 1500);
}

// Form validation
function validateForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'organization', 'specialty', 'interest'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError('Please enter a valid email address.');
        return false;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.phone)) {
        showError('Please enter a valid phone number.');
        return false;
    }
    
    return true;
}

// Show error message
function showError(message) {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-error';
    alert.textContent = message;
    
    const form = document.getElementById('bookingForm');
    form.insertBefore(alert, form.firstChild);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Show success message
function showSuccessMessage() {
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = `
        <strong>Success!</strong> Thank you for your interest. We'll contact you within 24 hours.
    `;
    
    const form = document.getElementById('bookingForm');
    form.insertBefore(alert, form.firstChild);
}

// Counter animation
function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isMultiplier = target.includes('x');
    const hasPlus = target.includes('+');
    const hasK = target.includes('K');
    
    let endValue = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (hasK) endValue *= 1000;
    
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
    
    let frame = 0;
    const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuart(frame / totalFrames);
        const currentValue = Math.round(endValue * progress);
        
        let displayValue = currentValue;
        
        if (hasK && currentValue >= 1000) {
            displayValue = (currentValue / 1000).toFixed(0) + 'K';
        } else {
            displayValue = currentValue;
        }
        
        if (hasPlus) displayValue += '+';
        if (isPercentage) displayValue += '%';
        if (isMultiplier) displayValue += 'x';
        
        element.textContent = displayValue;
        
        if (frame === totalFrames) {
            clearInterval(counter);
            element.textContent = target;
        }
    }, frameDuration);
}

// Event tracking (placeholder for analytics)
function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    // Integrate with Google Analytics or other tracking service
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Countdown Timer
function initCountdown() {
    // Set the deadline - December 31, 2025
    const deadline = new Date('December 31, 2025 23:59:59').getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const timeLeft = deadline - now;
        
        // Calculate days, hours, minutes
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        // Update the countdown display
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const urgencyDaysEl = document.getElementById('urgency-days');
        
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        
        // Update the urgency banner with dynamic days
        if (urgencyDaysEl) {
            urgencyDaysEl.textContent = `${days} days left`;
        }
        
        // If countdown is finished
        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            if (daysEl) daysEl.textContent = '0';
            if (hoursEl) hoursEl.textContent = '0';
            if (minutesEl) minutesEl.textContent = '0';
            if (urgencyDaysEl) urgencyDaysEl.textContent = '0 days left';
        }
    };
    
    // Update immediately then every minute
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 60000);
}

// Initialize countdown on page load
document.addEventListener('DOMContentLoaded', initCountdown);

// Track PPC conversion events
function trackPPCConversion(action, value) {
    // Google Ads conversion tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-XXXXXXXXX/XXXXXXXXX', // Replace with actual conversion ID
            'value': value,
            'currency': 'USD'
        });
    }
    
    // Facebook Pixel tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', action, {
            value: value,
            currency: 'USD',
        });
    }
    
    // Microsoft Advertising UET
    if (typeof uetq !== 'undefined') {
        window.uetq.push('event', action, {
            'revenue_value': value,
            'currency': 'USD'
        });
    }
}

// Enhanced CTA click tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track all CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            trackEvent('CTA', 'Click', buttonText);
            
            // Track specific high-value actions
            if (buttonText.includes('Quote') || buttonText.includes('Tax')) {
                trackPPCConversion('InitiateCheckout', 150000);
            }
        });
    });
    
    // Track scroll depth for engagement
    let scrollDepths = [25, 50, 75, 90];
    let scrolledDepths = [];
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !scrolledDepths.includes(depth)) {
                scrolledDepths.push(depth);
                trackEvent('Engagement', 'Scroll Depth', `${depth}%`);
            }
        });
    });
    
    // Track time on page
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage += 10;
        if (timeOnPage === 30) {
            trackEvent('Engagement', 'Time on Page', '30 seconds');
        } else if (timeOnPage === 60) {
            trackEvent('Engagement', 'Time on Page', '1 minute');
        } else if (timeOnPage === 180) {
            trackEvent('Engagement', 'Time on Page', '3 minutes');
        }
    }, 10000);
});

// Add urgency for Section 179
function checkSection179Urgency() {
    const today = new Date();
    const yearEnd = new Date(2025, 11, 31);  // December 31, 2025
    const daysLeft = Math.ceil((yearEnd - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 100) {
        // Show additional urgency messaging when 100 days or less
        document.body.classList.add('urgent-deadline');
    }
    
    // Store days left for use in other functions
    window.section179DaysLeft = daysLeft;
}

checkSection179Urgency();

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .alert {
        padding: 1rem;
        border-radius: 6px;
        margin-bottom: 1rem;
        animation: slideDown 0.3s ease;
    }
    
    .alert-error {
        background: #FEE;
        color: #C00;
        border: 1px solid #FCC;
    }
    
    .alert-success {
        background: #EFE;
        color: #060;
        border: 1px solid #CFC;
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header.scrolled {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);