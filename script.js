document.addEventListener("DOMContentLoaded", function () {
    // ==========================================
    // 1. FUNCIONALIDADE DO CARROSSEL
    // ==========================================
    const track = document.getElementById("carousel-track");
    const slides = Array.from(track.children);
    const nextButton = document.getElementById("carousel-next");
    const prevButton = document.getElementById("carousel-prev");
    const dotsNav = document.getElementById("carousel-dots");
    const dots = Array.from(dotsNav.children);

    let currentIndex = 0;

    function updateCarousel(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
        
        currentIndex = index;
    }

    if (nextButton && prevButton) {
        nextButton.addEventListener("click", () => {
            let nextIndex = (currentIndex + 1) % slides.length;
            updateCarousel(nextIndex);
        });

        prevButton.addEventListener("click", () => {
            let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel(prevIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                updateCarousel(index);
            });
        });
    }

    // ==========================================
    // 2. FUNCIONALIDADE DE ALTO CONTRASTE
    // ==========================================
    const btnHighContrast = document.getElementById("btn-high-contrast");
    if (btnHighContrast) {
        btnHighContrast.addEventListener("click", () => {
            document.body.classList.toggle("high-contrast");
            
            if (document.body.classList.contains("high-contrast")) {
                localStorage.setItem("accessibility_contrast", "true");
            } else {
                localStorage.setItem("accessibility_contrast", "false");
            }
        });

        if (localStorage.getItem("accessibility_contrast") === "true") {
            document.body.classList.add("high-contrast");
        }
    }

    // ==========================================
    // 3. FUNCIONALIDADE DE TAMANHO DE FONTE (A-, A, A+)
    // ==========================================
    const btnDecrease = document.getElementById("btn-decrease-text");
    const btnReset = document.getElementById("btn-reset-text");
    const btnIncrease = document.getElementById("btn-increase-text");
    let currentFontSize = 16;

    if (btnIncrease) {
        btnIncrease.addEventListener("click", () => {
            if (currentFontSize < 22) {
                currentFontSize += 2;
                document.documentElement.style.fontSize = currentFontSize + "px";
            }
        });
    }

    if (btnDecrease) {
        btnDecrease.addEventListener("click", () => {
            if (currentFontSize > 12) {
                currentFontSize -= 2;
                document.documentElement.style.fontSize = currentFontSize + "px";
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener("click", () => {
            currentFontSize = 16;
            document.documentElement.style.fontSize = "16px";
        });
    }

    // ==========================================
    // 4. CONTROLES DE VÍDEO
    // ==========================================
    const video = document.getElementById("main-video");
    const btnPlayVideo = document.getElementById("btn-play-video");
    const btnPlayLarge = document.getElementById("btn-play-large");
    const videoSeek = document.getElementById("video-seek");
    const videoTimeDisplay = document.getElementById("video-time-display");
    const btnVideoSpeed = document.getElementById("btn-video-speed");
    const btnToggleCC = document.getElementById("btn-toggle-cc");
    const btnToggleAD = document.getElementById("btn-toggle-ad");

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    if (video) {
        function togglePlayVideo() {
            if (video.paused) {
                video.play();
                if (btnPlayVideo) btnPlayVideo.textContent = "❚❚ Pause";
                if (btnPlayLarge) btnPlayLarge.style.display = "none";
            } else {
                video.pause();
                if (btnPlayVideo) btnPlayVideo.textContent = "▶ Play";
                if (btnPlayLarge) btnPlayLarge.style.display = "flex";
            }
        }

        if (btnPlayVideo) btnPlayVideo.addEventListener("click", togglePlayVideo);
        if (btnPlayLarge) btnPlayLarge.addEventListener("click", togglePlayVideo);
        video.addEventListener("click", togglePlayVideo);

        video.addEventListener("timeupdate", () => {
            if (!isNaN(video.duration)) {
                const progressPercent = (video.currentTime / video.duration) * 100;
                if (videoSeek) videoSeek.value = progressPercent;
                if (videoTimeDisplay) {
                    videoTimeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
                }
            }
        });

        if (videoSeek) {
            videoSeek.addEventListener("input", () => {
                const time = (videoSeek.value / 100) * video.duration;
                video.currentTime = time;
            });
        }

        const speeds = [1.0, 1.25, 1.5, 2.0];
        let speedIndex = 0;
        if (btnVideoSpeed) {
            btnVideoSpeed.addEventListener("click", () => {
                speedIndex = (speedIndex + 1) % speeds.length;
                video.playbackRate = speeds[speedIndex];
                btnVideoSpeed.textContent = speeds[speedIndex] + "x";
            });
        }

        if (btnToggleCC) {
            btnToggleCC.addEventListener("click", () => {
                btnToggleCC.classList.toggle("active");
            });
        }
        if (btnToggleAD) {
            btnToggleAD.addEventListener("click", () => {
                btnToggleAD.classList.toggle("active");
            });
        }
    }

    // ==========================================
    // 5. CONTROLES DE PODCAST (ÁUDIO)
    // ==========================================
    const podcast = document.getElementById("podcast-audio");
    const btnPlayPodcast = document.getElementById("btn-play-podcast");
    const podcastSeek = document.getElementById("podcast-seek");
    const podcastCurrentTime = document.getElementById("podcast-current-time");
    const podcastTotalTime = document.getElementById("podcast-total-time");
    const btnPodcastSpeed = document.getElementById("btn-podcast-speed");

    if (podcast) {
        function togglePlayPodcast() {
            if (podcast.paused) {
                podcast.play();
                if (btnPlayPodcast) btnPlayPodcast.innerHTML = '<div class="play-icon-small" style="border:none; width:12px; height:12px; background:#fff;"></div>';
            } else {
                podcast.pause();
                if (btnPlayPodcast) btnPlayPodcast.innerHTML = '<div class="play-icon-small"></div>';
            }
        }

        if (btnPlayPodcast) btnPlayPodcast.addEventListener("click", togglePlayPodcast);

        podcast.addEventListener("loadedmetadata", () => {
            if (podcastTotalTime) podcastTotalTime.textContent = formatTime(podcast.duration);
        });

        podcast.addEventListener("timeupdate", () => {
            if (!isNaN(podcast.duration)) {
                const progressPercent = (podcast.currentTime / podcast.duration) * 100;
                if (podcastSeek) podcastSeek.value = progressPercent;
                if (podcastCurrentTime) podcastCurrentTime.textContent = formatTime(podcast.currentTime);
            }
        });

        if (podcastSeek) {
            podcastSeek.addEventListener("input", () => {
                const time = (podcastSeek.value / 100) * podcast.duration;
                podcast.currentTime = time;
            });
        }

        const podcastSpeeds = [1.0, 1.25, 1.5, 2.0];
        let podcastSpeedIndex = 0;
        if (btnPodcastSpeed) {
            btnPodcastSpeed.addEventListener("click", () => {
                podcastSpeedIndex = (podcastSpeedIndex + 1) % podcastSpeeds.length;
                podcast.playbackRate = podcastSpeeds[podcastSpeedIndex];
                btnPodcastSpeed.textContent = podcastSpeeds[podcastSpeedIndex] + "x";
            });
        }
    }
});