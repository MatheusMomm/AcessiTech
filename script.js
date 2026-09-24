document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CARROSSEL
       ===================================================== */

    const track =
        document.getElementById("carousel-track");

    const slides =
        track
            ? Array.from(track.children)
            : [];

    const nextButton =
        document.getElementById("carousel-next");

    const prevButton =
        document.getElementById("carousel-prev");

    const dotsNav =
        document.getElementById("carousel-dots");

    const dots =
        dotsNav
            ? Array.from(dotsNav.children)
            : [];

    let currentIndex = 0;


    function updateCarousel(index) {

        if (!track || slides.length === 0) {
            return;
        }


        track.style.transform =
            `translateX(-${index * 100}%)`;


        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === index
            );

        });


        currentIndex = index;

    }


    if (nextButton && prevButton) {

        nextButton.addEventListener(
            "click",
            function () {

                const nextIndex =
                    (currentIndex + 1) %
                    slides.length;

                updateCarousel(nextIndex);

            }
        );


        prevButton.addEventListener(
            "click",
            function () {

                const prevIndex =
                    (currentIndex - 1 + slides.length) %
                    slides.length;

                updateCarousel(prevIndex);

            }
        );


        dots.forEach(function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    updateCarousel(index);

                }
            );

        });

    }


    /* =====================================================
       SISTEMA DE CONTRASTE
       ===================================================== */

    const btnContrastMenu =
        document.getElementById(
            "btn-contrast-menu"
        );

    const contrastMenu =
        document.getElementById(
            "contrast-menu"
        );

    const contrastOptions =
        document.querySelectorAll(
            "[data-contrast]"
        );


    const contrastClasses = [

        "high-contrast",

        "contrast-protanopia",

        "contrast-deuteranopia",

        "contrast-tritanopia",

        "contrast-grayscale",

        "contrast-accessible"

    ];


    /* -----------------------------------------------------
       ABRIR MENU
       ----------------------------------------------------- */

    if (btnContrastMenu && contrastMenu) {

        btnContrastMenu.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    contrastMenu.classList.toggle(
                        "open"
                    );

                btnContrastMenu.setAttribute(
                    "aria-expanded",
                    isOpen.toString()
                );

            }
        );

    }


    /* -----------------------------------------------------
       FECHAR MENU
       ----------------------------------------------------- */

    document.addEventListener(
        "click",
        function (event) {

            if (
                contrastMenu &&
                btnContrastMenu &&
                !contrastMenu.contains(event.target) &&
                !btnContrastMenu.contains(event.target)
            ) {

                contrastMenu.classList.remove(
                    "open"
                );

                btnContrastMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* -----------------------------------------------------
       APLICAR CONTRASTE
       ----------------------------------------------------- */

    function applyContrast(mode) {

        contrastClasses.forEach(
            function (className) {

                document.body.classList.remove(
                    className
                );

            }
        );


        switch (mode) {

            case "high":

                document.body.classList.add(
                    "high-contrast"
                );

                break;


            case "protanopia":

                document.body.classList.add(
                    "contrast-protanopia"
                );

                break;


            case "deuteranopia":

                document.body.classList.add(
                    "contrast-deuteranopia"
                );

                break;


            case "tritanopia":

                document.body.classList.add(
                    "contrast-tritanopia"
                );

                break;


            case "grayscale":

                document.body.classList.add(
                    "contrast-grayscale"
                );

                break;


            case "accessible":

                document.body.classList.add(
                    "contrast-accessible"
                );

                break;


            case "normal":

            default:

                break;

        }


        localStorage.setItem(
            "accessibility_contrast_mode",
            mode
        );

    }


    /* -----------------------------------------------------
       CLIQUE NAS OPÇÕES
       ----------------------------------------------------- */

    contrastOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    const mode =
                        option.dataset.contrast;

                    applyContrast(mode);


                    if (contrastMenu) {

                        contrastMenu.classList.remove(
                            "open"
                        );

                    }


                    if (btnContrastMenu) {

                        btnContrastMenu.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }
            );

        }
    );


    /* -----------------------------------------------------
       RESTAURAR CONTRASTE
       ----------------------------------------------------- */

    const savedContrast =
        localStorage.getItem(
            "accessibility_contrast_mode"
        );


    if (savedContrast) {

        applyContrast(
            savedContrast
        );

    }


    /* =====================================================
       TAMANHO DO TEXTO
       ===================================================== */

    const btnDecrease =
        document.getElementById(
            "btn-decrease-text"
        );

    const btnReset =
        document.getElementById(
            "btn-reset-text"
        );

    const btnIncrease =
        document.getElementById(
            "btn-increase-text"
        );


    let currentFontSize =
        parseInt(
            localStorage.getItem(
                "accessibility_font_size"
            )
        ) || 16;


    function applyFontSize() {

        document.documentElement.style.fontSize =
            currentFontSize + "px";


        localStorage.setItem(
            "accessibility_font_size",
            currentFontSize
        );

    }


    applyFontSize();


    if (btnIncrease) {

        btnIncrease.addEventListener(
            "click",
            function () {

                if (currentFontSize < 24) {

                    currentFontSize += 2;

                    applyFontSize();

                }

            }
        );

    }


    if (btnDecrease) {

        btnDecrease.addEventListener(
            "click",
            function () {

                if (currentFontSize > 12) {

                    currentFontSize -= 2;

                    applyFontSize();

                }

            }
        );

    }


    if (btnReset) {

        btnReset.addEventListener(
            "click",
            function () {

                currentFontSize = 16;

                applyFontSize();

            }
        );

    }


    /* =====================================================
       FOCO VISÍVEL / REDUÇÃO DE MOVIMENTO
       ===================================================== */

    const accessibilityOptions =
        document.querySelectorAll(
            "[data-accessibility]"
        );


    accessibilityOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    const mode =
                        option.dataset.accessibility;


                    if (mode === "focus") {

                        document.body.classList.toggle(
                            "accessibility-focus"
                        );


                        const enabled =
                            document.body.classList.contains(
                                "accessibility-focus"
                            );


                        localStorage.setItem(
                            "accessibility_focus",
                            enabled
                        );

                    }


                    if (mode === "motion") {

                        document.body.classList.toggle(
                            "reduce-motion"
                        );


                        const enabled =
                            document.body.classList.contains(
                                "reduce-motion"
                            );


                        localStorage.setItem(
                            "accessibility_motion",
                            enabled
                        );

                    }


                    if (contrastMenu) {

                        contrastMenu.classList.remove(
                            "open"
                        );

                    }

                }
            );

        }
    );


    /* -----------------------------------------------------
       RESTAURAR FOCO
       ----------------------------------------------------- */

    if (
        localStorage.getItem(
            "accessibility_focus"
        ) === "true"
    ) {

        document.body.classList.add(
            "accessibility-focus"
        );

    }


    /* -----------------------------------------------------
       RESTAURAR MOVIMENTO
       ----------------------------------------------------- */

    if (
        localStorage.getItem(
            "accessibility_motion"
        ) === "true"
    ) {

        document.body.classList.add(
            "reduce-motion"
        );

    }


    /* =====================================================
       VÍDEO
       ===================================================== */

    const video =
        document.getElementById(
            "main-video"
        );

    const btnPlayVideo =
        document.getElementById(
            "btn-play-video"
        );

    const btnPlayLarge =
        document.getElementById(
            "btn-play-large"
        );

    const videoSeek =
        document.getElementById(
            "video-seek"
        );

    const videoTimeDisplay =
        document.getElementById(
            "video-time-display"
        );

    const btnVideoSpeed =
        document.getElementById(
            "btn-video-speed"
        );

    const btnToggleCC =
        document.getElementById(
            "btn-toggle-cc"
        );

    const btnToggleAD =
        document.getElementById(
            "btn-toggle-ad"
        );


    function formatTime(seconds) {

        if (
            !seconds ||
            isNaN(seconds)
        ) {

            return "00:00";

        }


        const mins =
            Math.floor(
                seconds / 60
            );


        const secs =
            Math.floor(
                seconds % 60
            );


        return (
            mins
                .toString()
                .padStart(2, "0")
            +
            ":"
            +
            secs
                .toString()
                .padStart(2, "0")
        );

    }


    if (video) {


        function togglePlayVideo() {

            if (video.paused) {

                video.play();

                if (btnPlayVideo) {

                    btnPlayVideo.textContent =
                        "❚❚ Pause";

                }


                if (btnPlayLarge) {

                    btnPlayLarge.style.display =
                        "none";

                }

            } else {

                video.pause();

                if (btnPlayVideo) {

                    btnPlayVideo.textContent =
                        "▶ Play";

                }


                if (btnPlayLarge) {

                    btnPlayLarge.style.display =
                        "flex";

                }

            }

        }


        if (btnPlayVideo) {

            btnPlayVideo.addEventListener(
                "click",
                togglePlayVideo
            );

        }


        if (btnPlayLarge) {

            btnPlayLarge.addEventListener(
                "click",
                togglePlayVideo
            );

        }


        video.addEventListener(
            "click",
            togglePlayVideo
        );


        video.addEventListener(
            "timeupdate",
            function () {

                if (
                    !isNaN(video.duration)
                ) {

                    const progress =
                        (video.currentTime /
                            video.duration) * 100;


                    if (videoSeek) {

                        videoSeek.value =
                            progress;

                    }


                    if (videoTimeDisplay) {

                        videoTimeDisplay.textContent =
                            `${formatTime(
                                video.currentTime
                            )} / ${formatTime(
                                video.duration
                            )}`;

                    }

                }

            }
        );


        if (videoSeek) {

            videoSeek.addEventListener(
                "input",
                function () {

                    if (
                        !isNaN(video.duration)
                    ) {

                        video.currentTime =
                            (videoSeek.value / 100) *
                            video.duration;

                    }

                }
            );

        }


        const speeds =
            [1, 1.25, 1.5, 2];


        let speedIndex = 0;


        if (btnVideoSpeed) {

            btnVideoSpeed.addEventListener(
                "click",
                function () {

                    speedIndex =
                        (speedIndex + 1) %
                        speeds.length;


                    video.playbackRate =
                        speeds[speedIndex];


                    btnVideoSpeed.textContent =
                        speeds[speedIndex] + "x";

                }
            );

        }


        if (btnToggleCC) {

            btnToggleCC.addEventListener(
                "click",
                function () {

                    btnToggleCC.classList.toggle(
                        "active"
                    );

                }
            );

        }


        if (btnToggleAD) {

            btnToggleAD.addEventListener(
                "click",
                function () {

                    btnToggleAD.classList.toggle(
                        "active"
                    );

                }
            );

        }

    }


    /* =====================================================
       PODCAST
       ===================================================== */

    const podcast =
        document.getElementById(
            "podcast-audio"
        );

    const btnPlayPodcast =
        document.getElementById(
            "btn-play-podcast"
        );

    const podcastSeek =
        document.getElementById(
            "podcast-seek"
        );

    const podcastCurrentTime =
        document.getElementById(
            "podcast-current-time"
        );

    const podcastTotalTime =
        document.getElementById(
            "podcast-total-time"
        );

    const btnPodcastSpeed =
        document.getElementById(
            "btn-podcast-speed"
        );


    if (podcast) {


        function togglePlayPodcast() {

            if (podcast.paused) {

                podcast.play();


                if (btnPlayPodcast) {

                    btnPlayPodcast.innerHTML =
                        '<span aria-hidden="true">❚❚</span>';

                    btnPlayPodcast.setAttribute(
                        "aria-label",
                        "Pausar podcast"
                    );

                }

            } else {

                podcast.pause();


                if (btnPlayPodcast) {

                    btnPlayPodcast.innerHTML =
                        '<div class="play-icon-small"></div>';

                    btnPlayPodcast.setAttribute(
                        "aria-label",
                        "Tocar podcast"
                    );

                }

            }

        }


        if (btnPlayPodcast) {

            btnPlayPodcast.addEventListener(
                "click",
                togglePlayPodcast
            );

        }


        podcast.addEventListener(
            "loadedmetadata",
            function () {

                if (podcastTotalTime) {

                    podcastTotalTime.textContent =
                        formatTime(
                            podcast.duration
                        );

                }

            }
        );


        podcast.addEventListener(
            "timeupdate",
            function () {

                if (
                    !isNaN(
                        podcast.duration
                    )
                ) {

                    const progress =
                        (podcast.currentTime /
                            podcast.duration) * 100;


                    if (podcastSeek) {

                        podcastSeek.value =
                            progress;

                    }


                    if (podcastCurrentTime) {

                        podcastCurrentTime.textContent =
                            formatTime(
                                podcast.currentTime
                            );

                    }

                }

            }
        );


        if (podcastSeek) {

            podcastSeek.addEventListener(
                "input",
                function () {

                    if (
                        !isNaN(
                            podcast.duration
                        )
                    ) {

                        podcast.currentTime =
                            (podcastSeek.value / 100) *
                            podcast.duration;

                    }

                }
            );

        }


        const podcastSpeeds =
            [1, 1.25, 1.5, 2];


        let podcastSpeedIndex = 0;


        if (btnPodcastSpeed) {

            btnPodcastSpeed.addEventListener(
                "click",
                function () {

                    podcastSpeedIndex =
                        (podcastSpeedIndex + 1) %
                        podcastSpeeds.length;


                    podcast.playbackRate =
                        podcastSpeeds[
                            podcastSpeedIndex
                        ];


                    btnPodcastSpeed.textContent =
                        podcastSpeeds[
                            podcastSpeedIndex
                        ] + "x";

                }
            );

        }

    }


    /* =====================================================
       TECLADO
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (contrastMenu) {

                    contrastMenu.classList.remove(
                        "open"
                    );

                }


                if (btnContrastMenu) {

                    btnContrastMenu.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


});