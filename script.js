document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Header Scroll Effect --- */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* --- 2. Intersection Observer for Fade-In Animations --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating if it only needs to happen once
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));


    /* --- 3. Internationalization (i18n) Logic --- */
    const langSelect = document.getElementById('lang-select');
    
    // Function to apply translation
    function setLanguage(lang) {
        const dict = window.translations[lang];
        if (!dict) return;
        
        // Find all elements containing data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        // Set document language attribute for accessibility
        document.documentElement.lang = lang;
        
        // Persist the choice
        localStorage.setItem('preferredLang', lang);
    }

    // Load preferred language or default to ES
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    langSelect.value = savedLang;
    setLanguage(savedLang);

    // Listen to changes
    langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    /* --- 4. Video Carousel Scroll Logic --- */
    const carouselSection = document.getElementById('video-carousel');
    if (carouselSection) {
        const videos = document.querySelectorAll('.carousel-video');
        const cards = document.querySelectorAll('.carousel-card');
        
        window.addEventListener('scroll', () => {
            const rect = carouselSection.getBoundingClientRect();
            let scrolled = -rect.top;
            let sectionHeight = window.innerHeight;
            
            if (scrolled < 0) {
                activateSlide(0);
                return;
            }
            
            let totalScrollable = carouselSection.offsetHeight - sectionHeight;
            if (scrolled >= totalScrollable) {
                activateSlide(3);
                return;
            }
            
            let progress = scrolled / totalScrollable;
            let slideIndex = Math.floor(progress * 4);
            if (slideIndex > 3) slideIndex = 3;
            if (slideIndex < 0) slideIndex = 0;
            
            activateSlide(slideIndex);
        });
        
        function activateSlide(index) {
            videos.forEach((vid, i) => {
                if (i === index) vid.classList.add('active');
                else vid.classList.remove('active');
            });
            
            cards.forEach((card, i) => {
                if (i === index) card.classList.add('active');
                else card.classList.remove('active');
            });
        }
    }

});
