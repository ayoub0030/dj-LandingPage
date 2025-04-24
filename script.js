// DJ Morocco Landing Page Script

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Music Player
    setupMusicPlayer();
    
    // Header Scroll Effect
    setupHeaderScroll();
    
    // Mobile Menu Toggle
    setupMobileMenu();
    
    // Language Selector
    setupLanguageSelector();
    
    // Animation on Scroll
    setupScrollAnimations();
    
    // Form Submission
    setupContactForm();
});

// Header Scroll Effect
function setupHeaderScroll() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('nav ul');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navList.classList.remove('active');
        });
    });
}

// Music Player Functionality
function setupMusicPlayer() {
    // Track list
    const tracks = [
        {
            name: "Moroccan Sunset",
            artist: "DJ Morocco",
            path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            cover: "https://source.unsplash.com/random/200x200/?morocco,music"
        },
        {
            name: "Atlas Mountains",
            artist: "DJ Morocco",
            path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            cover: "https://source.unsplash.com/random/200x200/?desert,music"
        },
        {
            name: "Medina Nights",
            artist: "DJ Morocco",
            path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            cover: "https://source.unsplash.com/random/200x200/?club,music"
        }
    ];
    
    // Player elements
    const trackArt = document.querySelector('.track-art');
    const trackName = document.querySelector('.track-name');
    const trackArtist = document.querySelector('.track-artist');
    const playPauseBtn = document.querySelector('.playpause-track');
    const nextBtn = document.querySelector('.next-track');
    const prevBtn = document.querySelector('.prev-track');
    const seekSlider = document.querySelector('.seek-slider');
    const volumeSlider = document.querySelector('.volume-slider');
    const currentTimeEl = document.querySelector('.current-time');
    const totalDurationEl = document.querySelector('.total-duration');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    // Audio element
    let audio = new Audio();
    let trackIndex = 0;
    let isPlaying = false;
    let updateTimer;
    
    // Load initial track
    loadTrack(trackIndex);
    
    // Load track function
    function loadTrack(index) {
        clearInterval(updateTimer);
        resetValues();
        
        audio.src = tracks[index].path;
        audio.load();
        
        if (trackArt) trackArt.style.backgroundImage = `url('${tracks[index].cover}')`;
        if (trackName) trackName.textContent = tracks[index].name;
        if (trackArtist) trackArtist.textContent = tracks[index].artist;
        
        // Update active playlist item
        playlistItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        updateTimer = setInterval(seekUpdate, 1000);
        audio.addEventListener('ended', nextTrack);
    }
    
    // Reset values
    function resetValues() {
        if (currentTimeEl) currentTimeEl.textContent = '00:00';
        if (totalDurationEl) totalDurationEl.textContent = '00:00';
        if (seekSlider) seekSlider.value = 0;
    }
    
    // Play/Pause function
    function playPauseTrack() {
        if (!isPlaying) {
            playTrack();
        } else {
            pauseTrack();
        }
    }
    
    // Play track
    function playTrack() {
        audio.play();
        isPlaying = true;
        
        // Replace play icon with pause icon
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            document.querySelector('.music-player').classList.add('playing');
        }
    }
    
    // Pause track
    function pauseTrack() {
        audio.pause();
        isPlaying = false;
        
        // Replace pause icon with play icon
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            document.querySelector('.music-player').classList.remove('playing');
        }
    }
    
    // Next track
    function nextTrack() {
        if (trackIndex < tracks.length - 1) {
            trackIndex++;
        } else {
            trackIndex = 0;
        }
        
        loadTrack(trackIndex);
        playTrack();
    }
    
    // Previous track
    function prevTrack() {
        if (trackIndex > 0) {
            trackIndex--;
        } else {
            trackIndex = tracks.length - 1;
        }
        
        loadTrack(trackIndex);
        playTrack();
    }
    
    // Seek update
    function seekUpdate() {
        let seekPosition = 0;
        
        if (!isNaN(audio.duration)) {
            seekPosition = audio.currentTime * (100 / audio.duration);
            if (seekSlider) seekSlider.value = seekPosition;
            
            let currentMinutes = Math.floor(audio.currentTime / 60);
            let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(audio.duration / 60);
            let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
            
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
            if (currentTimeEl) currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
            if (totalDurationEl) totalDurationEl.textContent = durationMinutes + ":" + durationSeconds;
        }
    }
    
    // Event listeners
    if (playPauseBtn) playPauseBtn.addEventListener('click', playPauseTrack);
    if (nextBtn) nextBtn.addEventListener('click', nextTrack);
    if (prevBtn) prevBtn.addEventListener('click', prevTrack);
    
    if (seekSlider) {
        seekSlider.addEventListener('change', () => {
            audio.currentTime = audio.duration * (seekSlider.value / 100);
        });
    }
    
    if (volumeSlider) {
        volumeSlider.addEventListener('change', () => {
            audio.volume = volumeSlider.value / 100;
        });
    }
    
    // Playlist item click
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            trackIndex = index;
            loadTrack(trackIndex);
            playTrack();
        });
    });
}

// Language Selector
function setupLanguageSelector() {
    const langButtons = document.querySelectorAll('.language-selector button');
    
    // Language translations
    const translations = {
        en: {
            heroTitle: "FEEL THE BEAT OF MOROCCO",
            heroSubtitle: "Where traditional Moroccan rhythms meet modern electronic beats",
            navHome: "Home",
            navAbout: "About",
            navEvents: "Events",
            navMusic: "Music",
            navGallery: "Gallery",
            navContact: "Contact",
            // Add more translations as needed
        },
        fr: {
            heroTitle: "RESSENTEZ LE RYTHME DU MAROC",
            heroSubtitle: "Où les rythmes traditionnels marocains rencontrent les beats électroniques modernes",
            navHome: "Accueil",
            navAbout: "À Propos",
            navEvents: "Événements",
            navMusic: "Musique",
            navGallery: "Galerie",
            navContact: "Contact",
            // Add more translations as needed
        },
        ar: {
            heroTitle: "اشعر بإيقاع المغرب",
            heroSubtitle: "حيث تلتقي الإيقاعات المغربية التقليدية مع الإيقاعات الإلكترونية الحديثة",
            navHome: "الرئيسية",
            navAbout: "من نحن",
            navEvents: "الفعاليات",
            navMusic: "الموسيقى",
            navGallery: "المعرض",
            navContact: "اتصل بنا",
            // Add more translations as needed
        }
    };
    
    // Set up language change
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            changeLanguage(lang);
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Change language function
    function changeLanguage(lang) {
        // Update hero text
        document.querySelector('.hero h1').textContent = translations[lang].heroTitle;
        document.querySelector('.hero p').textContent = translations[lang].heroSubtitle;
        
        // Update navigation
        const navItems = document.querySelectorAll('nav ul li a');
        navItems[0].textContent = translations[lang].navHome;
        navItems[1].textContent = translations[lang].navAbout;
        navItems[2].textContent = translations[lang].navEvents;
        navItems[3].textContent = translations[lang].navMusic;
        navItems[4].textContent = translations[lang].navGallery;
        navItems[5].textContent = translations[lang].navContact;
        
        // Set text direction for Arabic
        if (lang === 'ar') {
            document.body.style.direction = 'rtl';
            document.querySelectorAll('.text-content').forEach(el => {
                el.style.textAlign = 'right';
            });
        } else {
            document.body.style.direction = 'ltr';
            document.querySelectorAll('.text-content').forEach(el => {
                el.style.textAlign = 'left';
            });
        }
        
        // Update other elements as needed
        // ...
    }
}

// Animation on Scroll
function setupScrollAnimations() {
    // Detect elements in viewport
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                section.classList.add('active');
            }
        });
    });
    
    // Animate hero section on load
    setTimeout(() => {
        document.querySelector('.hero').classList.add('active');
    }, 500);
}

// Contact Form Submission
function setupContactForm() {
    const form = document.getElementById('booking-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                const formContainer = this.parentNode;
                formContainer.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your booking request has been received. We will get back to you shortly.</p>
                    </div>
                `;
            }, 1500);
        });
    }
}
