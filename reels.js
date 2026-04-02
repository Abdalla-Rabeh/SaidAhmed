let isMuted = false;
let likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '[]');

/**
 * Shuffle utility for 'Trending' feel
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function initReels() {
    const container = document.getElementById('reelsContainer');
    if (!container) return;

    // Filter and Shuffle videos for a Trending feel
    const videos = shuffle([...portfolioVideos]); 

    videos.forEach((video) => {
        const reelItem = document.createElement('div');
        reelItem.className = 'reel-item';
        reelItem.id = `reel-${video.public_id}`;
        
        const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${video.public_id}.mp4`;
        const posterUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${video.public_id}.jpg`;
        const isLiked = likedVideos.includes(video.public_id);

        reelItem.innerHTML = `
            <img src="${posterUrl}" class="reel-ambient-bg">
            <div class="video-container">
                <video 
                    class="reel-video" 
                    loop 
                    playsinline 
                    preload="metadata"
                    poster="${posterUrl}"
                    muted="${isMuted}">
                    <source data-src="${videoUrl}" type="video/mp4">
                </video>
                <div class="reel-play-indicator">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            
            <div class="reel-meta">
                <h3>${video.title}</h3>
                <p>${video.desc}</p>
            </div>

            <div class="reel-sidebar">
                <div class="sidebar-action like-btn ${isLiked ? 'liked' : ''}" onclick="toggleReelLike(this, '${video.public_id}')">
                    <i class="fas fa-heart"></i>
                    <span>${isLiked ? 'تم الإعجاب' : 'إعجاب'}</span>
                </div>
                <div class="sidebar-action share-btn" onclick="shareReel('${video.public_id}', '${video.title}')">
                    <i class="fab fa-whatsapp"></i>
                    <span>مشاركة</span>
                </div>
                <div class="sidebar-action order-btn" onclick="orderVideo('${video.title}')">
                    <i class="fas fa-magic"></i>
                    <span>اطلب مثله</span>
                </div>
            </div>
        `;

        // Add Play/Pause Click Logic
        const videoEl = reelItem.querySelector('video');
        const indicator = reelItem.querySelector('.reel-play-indicator');
        const icon = indicator.querySelector('i');

        videoEl.addEventListener('click', () => {
            if (videoEl.paused) {
                videoEl.play();
                icon.className = 'fas fa-play';
            } else {
                videoEl.pause();
                icon.className = 'fas fa-pause';
            }
            
            // Flash indicator
            indicator.classList.remove('show');
            void indicator.offsetWidth; // trigger reflow
            indicator.classList.add('show');
            
            setTimeout(() => {
                indicator.classList.remove('show');
            }, 800);
        });

        container.appendChild(reelItem);
    });

    setupObserver();
    handleReelDeeplinking();
    setupMuteControl();
    setupNavigationArrow();
}

/**
 * Navigation Arrows: Scroll to next/prev reel
 */
function setupNavigationArrow() {
    const navContainer = document.createElement('div');
    navContainer.className = 'reels-nav-controls';
    
    // Up Arrow
    const prevBtn = document.createElement('button');
    prevBtn.className = 'reel-nav-btn reel-prev-arrow';
    prevBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    prevBtn.onclick = () => {
        const container = document.getElementById('reelsContainer');
        container.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    };

    // Down Arrow
    const nextBtn = document.createElement('button');
    nextBtn.className = 'reel-nav-btn reel-next-arrow';
    nextBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    nextBtn.onclick = () => {
        const container = document.getElementById('reelsContainer');
        container.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    };

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);
    document.body.appendChild(navContainer);
}

/**
 * Intersection Observer for Auto-play/Pause
 */
function setupObserver() {
    const options = {
        threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            const source = video.querySelector('source');

            if (entry.isIntersecting) {
                // Lazy load source if not set
                if (!source.src) {
                    source.src = source.getAttribute('data-src');
                    video.load();
                }
                
                video.muted = isMuted;
                video.play().catch(e => console.log("Play blocked", e));
                
                // Update URL for sharing current view (Optional but professional)
                const videoId = entry.target.id.replace('reel-', '');
                history.replaceState(null, '', `?v=${videoId}`);
            } else {
                video.pause();
            }
        });
    }, options);

    document.querySelectorAll('.reel-item').forEach(item => observer.observe(item));
}

/**
 * Handle Mute Toggle
 */
function setupMuteControl() {
    const muteBtn = document.getElementById('reelsMute');
    if (!muteBtn) return;

    // Set initial icon
    const icon = muteBtn.querySelector('i');
    icon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';

    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        icon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
        
        // Apply to all videos
        document.querySelectorAll('video').forEach(v => {
            v.muted = isMuted;
        });
    });
}

/**
 * Share Implementation (WhatsApp) - FIXED
 */
function shareReel(publicId, title) {
    const shareUrl = `${window.location.origin}${window.location.pathname}?v=${publicId}`;
    const text = `شوف المونتاج الإحترافي ده لشغل سعيد أحمد: ${title}\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

/**
 * Order Video Implementation
 */
function orderVideo(title) {
    const text = `أهلاً سعيد، أريد مشروع مونتاج احترافي مشابه لـ: ${title}`;
    window.open(`https://wa.me/201158746769?text=${encodeURIComponent(text)}`, '_blank');
}

/**
 * Like Interaction with Persistence
 */
function toggleReelLike(el, publicId) {
    el.classList.toggle('liked');
    const isLikedNow = el.classList.contains('liked');
    const span = el.querySelector('span');
    span.innerText = isLikedNow ? "تم الإعجاب" : "إعجاب";

    if (isLikedNow) {
        if (!likedVideos.includes(publicId)) likedVideos.push(publicId);
    } else {
        likedVideos = likedVideos.filter(id => id !== publicId);
    }
    
    // Save to LocalStorage
    localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
}

/**
 * Deep Linking Support
 */
function handleReelDeeplinking() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('v');
    
    if (videoId) {
        const target = document.getElementById(`reel-${videoId}`);
        if (target) {
            target.scrollIntoView();
        }
    }
}

// Start
document.addEventListener('DOMContentLoaded', initReels);
