// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Navbar Background
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/Show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Creative Hero Parallax Effect
const hero = document.querySelector('.creative-canvas');
const bgText = document.querySelector('.hero-bg-text');
const visualContent = document.querySelector('.hero-visual-content');
const floatingTags = document.querySelectorAll('.floating-tag');

if (hero) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        // Background Text (Very Slow)
        if (bgText) {
            bgText.style.transform = `translate(calc(-50% + ${x * 10}px), calc(-50% + ${y * 10}px))`;
        }

        // Visual Content (Medium)
        if (visualContent) {
            visualContent.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        }

        // Floating Tags (Fast & Dynamic)
        floatingTags.forEach((tag, index) => {
            const depth = (index + 1) * 15;
            tag.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        });
    });
}

// Typing Effect for Subtitle
const typingSubtitle = document.getElementById('typingSubtitle');
if (typingSubtitle) {
    const text = typingSubtitle.textContent;
    typingSubtitle.textContent = '';
    typingSubtitle.classList.add('typing-cursor');

    let i = 0;
    function type() {
        if (i < text.length) {
            typingSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        } else {
            typingSubtitle.classList.remove('typing-cursor');
        }
    }

    // Start typing after a small delay
    setTimeout(type, 1000);
}

// Stats Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    let count = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const updateCount = () => {
        count += increment;
        if (count < target) {
            element.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    };

    updateCount();
}


// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Check if it's a counter
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-element, .stat-number').forEach(el => {
    observer.observe(el);
});

// Portfolio Filter Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});

// Testimonials Carousel
const track = document.querySelector('.testimonials-track');
const dotsContainer = document.querySelector('.carousel-dots');
const slides = track ? track.querySelectorAll('.testimonial-card') : [];
let currentIndex = 0;

if (track && slides.length > 0) {
    // Generate Dots dynamically
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
        currentIndex = index;
        const isRTL = document.documentElement.dir === 'rtl';
        const moveX = isRTL ? (index * 100) : (index * -100);
        
        track.style.transform = `translateX(${moveX}%)`;
        
        // Update dots state
        dots.forEach(d => d.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');

        // Add active-slide class for smoothness
        slides.forEach((s, idx) => {
            if (idx === index) s.classList.add('active-slide');
            else s.classList.remove('active-slide');
        });
    }

    // Initialize first slide
    goToSlide(0);

    // Auto-scroll every 8 seconds
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }, 8000);
}

// WhatsApp Form Handler
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('clientName').value;
        const service = document.getElementById('serviceType').value;
        const message = document.getElementById('clientMessage').value;

        let whatsappMessage = `مرحباً، أنا ${name}\n\n`;
        whatsappMessage += `نوع الخدمة المطلوبة: ${service}\n\n`;
        whatsappMessage += `تفاصيل المشروع:\n${message}\n\n`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const phoneNumber = '201158746769';
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    });
}