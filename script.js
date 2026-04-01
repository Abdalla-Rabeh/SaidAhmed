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

// Cloudinary Configuration
const cloudName = "dsc4t5btg";

// Explicit list of videos provided by the user
const portfolioVideos = [
    { public_id: "مشاريعي/ريلز/Another_step_forward_This_is_my_second_modification_and_I_can_already_feel_the_improvement._Th_adnjti", title: "تطور العمل الإبداعي", desc: "التعديل الثاني وتحسن ملحوظ في جودة المونتاج" },
    { public_id: "12_vid_ex_sfeuoe", title: "مشروع ريلز 12", desc: "مونتاج احترافي بأسلوب عصري" },
    { public_id: "14_vid._ex_v2vgmf", title: "مشروع ريلز 14", desc: "تنسيق لوني وحركي متقدم" },
    { public_id: "17_vid.af_phvr6s", title: "مشروع 17", desc: "مونتاج سينمائي بمؤثرات بصرية" },
    { public_id: "16_vid._af_fi94vs", title: "مشروع 16", desc: "إبداع في الانتقالات البصرية" },
    { public_id: "18_vid._af_nl5mts", title: "مشروع 18", desc: "إخراج فني للفيديو القصير" },
    { public_id: "10_vid_f_folx87", title: "مشروع 10", desc: "لمسات إبداعية في المونتاج" },
    { public_id: "15_vid_f_ex_xzd56z", title: "مشروع 15", desc: "تصحيح ألوان وإخراج احترافي" },
    { public_id: "يوم_العلم_م_2_qnoypr", title: "يوم العلم", desc: "احتفالية يوم العلم بأسلوب مونتاج مميز" },
    { public_id: "Another_step_forward_This_is_my_second_modification_and_I_can_already_feel_the_improvement._Th_nqblng", title: "رحلة الإبداع", desc: "خطوات نحو الاحترافية في تحرير الفيديو" },
    { public_id: "videoediting_viralreels_q9d1j1", title: "Viral Reels", desc: "مونتاج مخصص للانتشار على السوشيال ميديا" },
    { public_id: "يوم_العلم_السعودي_1_kiqc9o", title: "يوم العلم السعودي", desc: "عمل وطني بلمسات سينمائية" },
    { public_id: "V_3_abxoel", title: "مشروع V3", desc: "مونتاج سريع وجذاب" },
    { public_id: "v1_f1_ltbbji", title: "مشروع V1", desc: "دقة عالية في اختيار اللقطات" },
    { public_id: "Toyota_f1_qm5tac", title: "إعلان تويوتا", desc: "مونتاج إعلاني احترافي للسيارات" },
    { public_id: "v2_f_1_ukanyr", title: "مشروع V2", desc: "توازن بين الصوت والصورة" },
    { public_id: "dr_manal_ex_2_dw6mzi", title: "د. منال", desc: "فيديو تعريفي بأسلوب راقي" },
    { public_id: "final_doctor_anas_qcfttj", title: "د. أنس", desc: "إخراج احترافي للمحتوى الطبي" },
    { public_id: "final_QATER_1_lvlor8", title: "مشروع قطر", desc: "مونتاج لفعاليات مميزة" },
    { public_id: "get_xnoi8r", title: "مشروع Get", desc: "مونتاج حركي سريع" },
    { public_id: "my_reel_zain_b6pqxa", title: "ريلز زين", desc: "عمل إبداعي لبراند زين" },
    { public_id: "RANGE_ROVER_1_rnouyn", title: "رينج روفر", desc: "فخامة السيارات بلمسات المونتاج" },
    { public_id: "my_reel_1_upbihv", title: "إبداع شخصي 1", desc: "تجربة بصرية فريدة" },
    { public_id: "final_skoda_bqtt5z", title: "إعلان سكودا", desc: "مونتاج إعلاني متكامل" },
    { public_id: "final_حفل_جامعة_المعرفة_j4mtem", title: "جامعة المعرفة", desc: "تغطية حفل تخرج بأسلوب سينمائي" },
    { public_id: "Luxury_Real_Estate_2_sz7lx0", title: "عقارات فاخرة", desc: "عرض العقارات بأسلوب المونتاج العقاري" },
    { public_id: "final_كهربا_ywpbdo", title: "مشروع كهربا", desc: "عمل إبداعي رياضي" },
    { public_id: "Welcome_back_️_viralreels_videoediting_pjkozs", title: "Welcome Back", desc: "عودة قوية بمحتوى بصري مذهل" },
    { public_id: "كهرا_وايت_1_isy8ua", title: "مشروع وايت 1", desc: "مونتاج دعائي مبتكر" },
    { public_id: "توازن_4_af__1_lglvbr", title: "توازن 4", desc: "سلسلة توازن الإبداعية" },
    { public_id: "كهربا_وايت.aep_f1_sbocnz", title: "مشروع وايت Ae", desc: "مؤثرات بصرية متقدمة After Effects" },
    { public_id: "توازن_1_qdl8bo", title: "توازن 1", desc: "انطلاقة سلسلة توازن" }
];

// Pagination Configuration
let currentPage = 1;
const itemsPerPage = 12; // Showing 8 reels per page for a balanced grid

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

    grid.innerHTML = ''; // Clear existing content

    videos.forEach((video) => {
        const publicId = video.public_id;
        const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;
        const thumbnailUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.jpg`;

        const wrapper = document.createElement('div');
        wrapper.className = 'video-wrapper fade-in-element';
        wrapper.setAttribute('data-id', publicId);

        wrapper.innerHTML = `
            <video 
                preload="metadata" 
                poster="${thumbnailUrl}" 
                loop 
                muted 
                playsinline 
                class="cloudinary-video">
                <source data-src="${videoUrl}" type="video/mp4">
            </video>
            <div class="video-info-overlay">
                <h3>${video.title}</h3>
                <p>${video.desc}</p>
            </div>
            <div class="play-overlay">
                <i class="fas fa-play"></i>
            </div>
        `;

        wrapper.addEventListener('click', () => toggleVideoPlay(wrapper));
        grid.appendChild(wrapper);
        videoInteractionObserver.observe(wrapper);
    });
}

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

// Start sequence
document.addEventListener('DOMContentLoaded', initializePortfolio);

// Testimonials Carousel Logic (Existing)
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

// WhatsApp Form (Existing)
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

// Scroll to Top Funcionality
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