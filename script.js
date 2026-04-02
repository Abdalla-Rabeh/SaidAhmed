// Preloader Handler
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('loaded');
            // Allow interaction after fade
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    }, 1500); // Give users a moment to see the brand animation
});

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

// Configuration is now in videos-config.js
// Pagination Configuration
let currentPage = 1;
const itemsPerPage = 8;
let currentModalVideo = null; // Track current video for sharing

/**
 * Initialize Gallery with hardcoded videos and pagination logic
 */
function initializePortfolio() {
    const isPortfolioPage = document.body.classList.contains('portfolio-page');

    if (isPortfolioPage) {
        displayPage(1); // Handle full pagination for gallery page
    } else {
        // Home page: Only show the first 8 videos as Featured/Highlights
        const highlightedVideos = portfolioVideos.slice(0, 8);
        renderVideos(highlightedVideos);

        // Ensure pagination is hidden on home
        const paginationContainer = document.getElementById('portfolio-pagination');
        if (paginationContainer) paginationContainer.style.display = 'none';
    }
}

/**
 * Displays a specific page of videos (Portfolio Page Only)
 * @param {number} page 
 */
function displayPage(page) {
    currentPage = page;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedVideos = portfolioVideos.slice(startIndex, endIndex);

    renderVideos(pagedVideos);
    renderPaginationControls();

    // Smooth scroll to portfolio top if not first load
    const portfolioGrid = document.getElementById('cloudinary-portfolio-grid');
    if (portfolioGrid && (page > 1 || window.scrollY > portfolioGrid.offsetTop + 100)) {
        portfolioGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Render video elements into the grid
 * @param {Array} videos 
 */
function renderVideos(videos) {
    const grid = document.getElementById('cloudinary-portfolio-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Add skeletons
    for (let i = 0; i < videos.length; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'video-skeleton';
        skeleton.innerHTML = `
            <div class="skeleton-video"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-sub"></div>
        `;
        grid.appendChild(skeleton);
    }

    setTimeout(() => {
        grid.innerHTML = ''; // Start real render
        videos.forEach((video) => {
            const publicId = video.public_id;
            const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;
            const thumbnailUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.jpg`;

            const wrapper = document.createElement('div');
            wrapper.className = 'video-wrapper fade-in-element';
            wrapper.setAttribute('data-id', publicId);

            wrapper.innerHTML = `
                <div class="video-container" dir="ltr">
                    <video 
                        preload="metadata" 
                        poster="${thumbnailUrl}" 
                        loop 
                        muted 
                        playsinline 
                        class="cloudinary-video">
                        <source data-src="${videoUrl}" type="video/mp4">
                    </video>
                </div>
                <div class="video-interaction">
                     <div class="video-info-overlay">
                        <h3>${video.title}</h3>
                        <p>${video.desc}</p>
                    </div>
                    <div class="play-indicator">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;

            wrapper.addEventListener('click', () => openVideoModal(video));
            grid.appendChild(wrapper);
            videoInteractionObserver.observe(wrapper);
        });
    }, 800); // Small delay to show skeletons professionally
}

/**
 * Open Video Modal with metadata
 */
function openVideoModal(videoData) {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    if (!modal || !modalVideo) return;

    // Pause all background videos
    document.querySelectorAll('.video-wrapper.playing video').forEach(v => v.pause());
    document.querySelectorAll('.video-wrapper.playing').forEach(w => w.classList.remove('playing'));

    const publicId = videoData.public_id;
    const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;

    // Set content
    modalVideo.querySelector('source').src = videoUrl;
    modalVideo.load();
    modalTitle.innerText = videoData.title;
    modalDesc.innerText = videoData.desc;

    currentModalVideo = videoData; // Set for sharing

    // Show modal
    modal.classList.add('active');
    document.body.classList.add('modal-open');

    // Attempt to play with sound
    modalVideo.muted = false;
    modalVideo.play().catch(err => console.log("Modal play blocked:", err));
}

/**
 * Close Video Modal
 */
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');

    if (!modal || !modalVideo) return;

    modal.classList.remove('active');
    document.body.classList.remove('modal-open');

    // Stop video and clear src to prevent background loading
    modalVideo.pause();
    modalVideo.querySelector('source').src = '';
    currentModalVideo = null;
}

/**
 * Custom Toast Notifications
 */
function showSuccessToast(message) {
    let toast = document.querySelector('.toast-success');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-success';
        toast.innerHTML = '<i class="fas fa-check-circle"></i> <span class="toast-msg"></span>';
        document.body.appendChild(toast);
    }

    toast.querySelector('.toast-msg').innerText = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

/**
 * Viral Sharing Functions
 */
function copyVideoLink() {
    if (!currentModalVideo) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?v=${currentModalVideo.public_id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        showSuccessToast("تم نسخ رابط الفيديو بنجاح! 🎉");
    });
}

function shareOnWhatsApp() {
    if (!currentModalVideo) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?v=${currentModalVideo.public_id}`;
    const text = `شوف المونتاج ده لشغل سعيد أحمد: ${currentModalVideo.title}\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

/**
 * Social Proof System
 */
const socialProofData = [
    { title: "إنجاز جديد 🎬", text: "سعيد أحمد أكمل مشروع مونتاج ريلز لبراند عالمي!" },
    { title: "انتشار واسع 🔥", text: "مشروع 'رينج روفر' تخطى حاجز الـ 100 ألف مشاهدة." },
    { title: "ثقة العملاء ⭐", text: "تقييم 5 نجوم من عميل في المملكة العربية السعودية." },
    { title: "عمل وطني 🇸🇦", text: "فيديو يوم العلم السعودي يحظى بإعجاب الآلاف." }
];

function initSocialProof() {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'social-proof-toast';
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-rocket"></i>
        </div>
        <div class="toast-content">
            <strong id="toastTitle" class="toast-title">إنجاز جديد</strong>
            <span id="toastText" class="toast-msg">سعيد حمل مشروعاً جديداً!</span>
        </div>
        <div class="toast-progress-bar"></div>
    `;
    document.body.appendChild(toast);

    let index = 0;
    setInterval(() => {
        const item = socialProofData[index];
        document.getElementById('toastTitle').innerText = item.title;
        document.getElementById('toastText').innerText = item.text;

        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 6000);

        index = (index + 1) % socialProofData.length;
    }, 25000); // Popup every 25 seconds
}

/**
 * Deep Linking Support
 * Handles opening a specific video if the 'v' parameter is in the URL
 */
function handleDeeplinking() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('v');

    if (videoId) {
        const video = portfolioVideos.find(v => v.public_id === videoId);
        if (video) {
            // Small delay to ensure everything is ready
            setTimeout(() => {
                openVideoModal(video);
            }, 500);
        }
    }
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVideoModal();
    }
});

/**
 * Renders the numeric pagination controls
 */
function renderPaginationControls() {
    const paginationContainer = document.getElementById('portfolio-pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(portfolioVideos.length / itemsPerPage);
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) return;

    // Previous Button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn nav-btn';
    prevBtn.innerHTML = '<i class="fas fa-chevron-right"></i> السابق';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => displayPage(currentPage - 1);
    paginationContainer.appendChild(prevBtn);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.innerText = i;
        pageBtn.onclick = () => displayPage(i);
        paginationContainer.appendChild(pageBtn);
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn nav-btn';
    nextBtn.innerHTML = 'التالي <i class="fas fa-chevron-left"></i>';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => displayPage(currentPage + 1);
    paginationContainer.appendChild(nextBtn);
}

/**
 * Intersection Observer for Autoplay and Lazy Loading
 */
const videoInteractionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const wrapper = entry.target;
        const video = wrapper.querySelector('video');
        const source = video.querySelector('source');

        if (entry.isIntersecting) {
            wrapper.classList.add('visible');

            if (!source.src) {
                source.src = source.dataset.src;
                video.load();
            }

            if (entry.intersectionRatio >= 0.6) {
                playVideo(wrapper);
            }
        } else {
            pauseVideo(wrapper);
        }
    });
}, {
    threshold: [0, 0.2, 0.6, 1.0],
    rootMargin: '0px 0px -10% 0px'
});

/**
 * Play a specific video and pause others
 */
function playVideo(wrapper) {
    const video = wrapper.querySelector('video');

    document.querySelectorAll('.video-wrapper.playing').forEach(otherWrapper => {
        if (otherWrapper !== wrapper) {
            pauseVideo(otherWrapper);
        }
    });

    if (video.paused) {
        video.play().then(() => {
            wrapper.classList.add('playing');
        }).catch(err => console.log("Autoplay blocked:", err));
    }
}

/**
 * Pause a specific video
 */
function pauseVideo(wrapper) {
    const video = wrapper.querySelector('video');
    video.pause();
    wrapper.classList.remove('playing');
}

/**
 * Manual Toggle Play/Pause
 */
function toggleVideoPlay(wrapper) {
    const video = wrapper.querySelector('video');
    if (video.paused) {
        playVideo(wrapper);
        video.muted = false;
    } else {
        pauseVideo(wrapper);
    }
}

// Global State
let isMuted = true;
let reelModeActive = true;

/**
 * Global Sound Control
 */
function toggleGlobalMute() {
    isMuted = !isMuted;
    const muteBtn = document.getElementById('globalMute');

    if (muteBtn) {
        muteBtn.classList.toggle('muted', isMuted);
        const icon = muteBtn.querySelector('i');
        icon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    }

    // Apply to all active videos
    document.querySelectorAll('video').forEach(video => {
        video.muted = isMuted;
    });

    showSuccessToast(isMuted ? "تم كتم الصوت" : "تم تشغيل الصوت");
}

/**
 * Reel Mode (TikTok-style) Logic
 */
function enterReelMode() {
    const overlay = document.getElementById('reelModeOverlay');
    const container = document.getElementById('reelContainer');
    if (!overlay || !container) return;

    // Clear and Render Reels
    container.innerHTML = '';
    portfolioVideos.forEach((video, index) => {
        const publicId = video.public_id;
        const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;

        const reelItem = document.createElement('div');
        reelItem.className = 'reel-item';
        reelItem.innerHTML = `
            <video class="reel-video" loop playsinline muted="${isMuted}">
                <source data-src="${videoUrl}" type="video/mp4">
            </video>
            <div class="reel-meta">
                <h3>${video.title}</h3>
                <p>${video.desc}</p>
            </div>
            <div class="reel-sidebar">
                <div class="sidebar-action" onclick="shareOnWhatsApp()">
                    <i class="fab fa-whatsapp"></i>
                    <span>مشاركة</span>
                </div>
                <div class="sidebar-action like-btn" onclick="toggleReelLike(this)">
                    <i class="fas fa-heart"></i>
                    <span class="like-count">إعجاب</span>
                </div>
            </div>
        `;
        container.appendChild(reelItem);
    });

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    reelModeActive = true;

    // Show Sound Toggle only in Reel Mode
    const muteBtn = document.getElementById('globalMute');
    if (muteBtn) muteBtn.classList.add('active');

    // Initial setup for first video
    setTimeout(() => {
        const firstVideo = container.querySelector('video');
        if (firstVideo) {
            const src = firstVideo.querySelector('source').dataset.src;
            firstVideo.querySelector('source').src = src;
            firstVideo.load();
            firstVideo.muted = isMuted;
            firstVideo.play();
        }
    }, 300);

    // Handle scroll to play/pause (snap interaction)
    container.onscroll = () => {
        const items = container.querySelectorAll('.reel-item');
        items.forEach(item => {
            const video = item.querySelector('video');
            const rect = item.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                if (video.paused) {
                    if (!video.querySelector('source').src) {
                        video.querySelector('source').src = video.querySelector('source').dataset.src;
                        video.load();
                    }
                    video.muted = isMuted;
                    video.play();
                }
            } else {
                video.pause();
            }
        });
    };
}

function exitReelMode() {
    const overlay = document.getElementById('reelModeOverlay');
    if (!overlay) return;

    // Stop all reel videos
    overlay.querySelectorAll('video').forEach(v => v.pause());

    const muteBtn = document.getElementById('globalMute');
    if (muteBtn) muteBtn.classList.remove('active');

    overlay.classList.remove('active');
    document.body.style.overflow = '';
    reelModeActive = false;
}

/**
 * Enhanced Like Functionality
 */
function toggleReelLike(el) {
    el.classList.toggle('liked');
    const icon = el.querySelector('i');
    const span = el.querySelector('span');

    if (el.classList.contains('liked')) {
        icon.className = 'fas fa-heart';
        icon.style.color = '#ff4757';
        icon.style.transform = 'scale(1.3)';
        span.innerText = "تم الإعجاب";
        showSuccessToast("شكراً لمتابعتك! ❤️");
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 300);
    } else {
        icon.className = 'fas fa-heart';
        icon.style.color = '';
        span.innerText = "إعجاب";
    }
}

/**
 * SEO: Inject Dynamic VideoObject Schema
 */
function injectVideoSchema() {
    const schemaArray = portfolioVideos.map(video => ({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": video.title,
        "description": video.desc,
        "thumbnailUrl": `https://res.cloudinary.com/${cloudName}/video/upload/${video.public_id}.jpg`,
        "uploadDate": "2024-01-01T08:00:00+08:00",
        "contentUrl": `https://res.cloudinary.com/${cloudName}/video/upload/${video.public_id}.mp4`
    }));

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaArray);
    document.head.appendChild(script);
}

// Start sequence
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
    initSocialProof();
    handleDeeplinking(); // Check for shared video links
    injectVideoSchema(); // SEO boost
});

// Update the DOM to correctly close modal with sound state
const originalCloseModal = closeVideoModal;
closeVideoModal = function () {
    if (typeof originalCloseModal === 'function') originalCloseModal();
};

// Testimonials Carousel Logic (Restored)
const track = document.querySelector('.testimonials-track');
const dotsContainer = document.querySelector('.carousel-dots');
const slides = track ? track.querySelectorAll('.testimonial-card') : [];
let currentIndex = 0;

if (track && slides.length > 0) {
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
        dots.forEach(d => d.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
        slides.forEach((s, idx) => {
            if (idx === index) s.classList.add('active-slide');
            else s.classList.remove('active-slide');
        });
    }

    goToSlide(0);
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }, 8000);
}

// WhatsApp Form (Restored)
const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('clientName').value;
        const service = document.getElementById('serviceType').value;
        const message = document.getElementById('clientMessage').value;
        let whatsappMessage = `مرحباً، أنا ${name}\n\nنوع الخدمة المطلوبة: ${service}\n\nتفاصيل المشروع:\n${message}\n\n`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const phoneNumber = '201158746769';
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    });
}

// Scroll to Top Funcionality (Restored)
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
