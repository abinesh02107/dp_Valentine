// ===========================
// VALENTINE'S WEBSITE - MAIN JAVASCRIPT
// Interactive Features & Animations
// ===========================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // LOADER
    // ===========================
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });
    
    // ===========================
    // FLOATING HEARTS BACKGROUND
    // ===========================
    function createFloatingHearts() {
        const heartsBg = document.getElementById('heartsBg');
        if (!heartsBg) return;
        
        const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝'];
        const numberOfHearts = 15;
        
        for (let i = 0; i < numberOfHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heartsBg.appendChild(heart);
        }
    }
    
    createFloatingHearts();
    
    // ===========================
    // NAVIGATION
    // ===========================
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate menu toggle icon
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ===========================
    // SCROLL REVEAL ANIMATION
    // ===========================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // ===========================
    // COUNTER ANIMATION
    // ===========================
    function animateCounter() {
        const counters = document.querySelectorAll('.counter-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100;
            const duration = 2000; // 2 seconds
            const stepTime = duration / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, stepTime);
        });
    }
    
    // Trigger counter animation when visible
    const counterSection = document.querySelector('.love-counter');
    if (counterSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counterSection);
    }
    
    // ===========================
    // SMOOTH SCROLL
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===========================
    // PARTICLE CURSOR EFFECT
    // ===========================
    let particles = [];
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.life = 100;
            
            this.element = document.createElement('div');
            this.element.style.position = 'fixed';
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
            this.element.style.width = this.size + 'px';
            this.element.style.height = this.size + 'px';
            this.element.style.background = 'radial-gradient(circle, rgba(255, 64, 129, 1) 0%, rgba(255, 64, 129, 0) 70%)';
            this.element.style.borderRadius = '50%';
            this.element.style.pointerEvents = 'none';
            this.element.style.zIndex = '9999';
            this.element.style.transition = 'opacity 0.5s ease';
            
            document.body.appendChild(this.element);
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 2;
            
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
            this.element.style.opacity = this.life / 100;
            
            if (this.life <= 0) {
                this.element.remove();
                return false;
            }
            return true;
        }
    }
    
    let lastParticleTime = 0;
    document.addEventListener('mousemove', function(e) {
        const currentTime = Date.now();
        if (currentTime - lastParticleTime > 50) { // Throttle particle creation
            particles.push(new Particle(e.clientX, e.clientY));
            lastParticleTime = currentTime;
        }
    });
    
    function animateParticles() {
        particles = particles.filter(particle => particle.update());
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // ===========================
    // INTERACTIVE CARD TILT EFFECT
    // ===========================
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ===========================
    // DYNAMIC PAGE TITLE
    // ===========================
    const originalTitle = document.title;
    let titleInterval;
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            let hearts = '❤️💕';
            let index = 0;
            titleInterval = setInterval(() => {
                document.title = hearts[index] + ' Miss you already! ' + hearts[index];
                index = (index + 1) % hearts.length;
            }, 1000);
        } else {
            clearInterval(titleInterval);
            document.title = originalTitle;
        }
    });
    
    // ===========================
    // LAZY LOAD IMAGES
    // ===========================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===========================
    // PREVENT RIGHT CLICK (Optional - to protect images)
    // ===========================
    // Uncomment if you want to disable right-click
    /*
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showNotification('❤️ These memories are precious!');
    });
    */
    
    // ===========================
    // NOTIFICATION SYSTEM
    // ===========================
    function showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '100px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 2rem';
        notification.style.background = 'rgba(255, 64, 129, 0.95)';
        notification.style.color = 'white';
        notification.style.borderRadius = '10px';
        notification.style.boxShadow = '0 4px 20px rgba(255, 64, 129, 0.4)';
        notification.style.zIndex = '10000';
        notification.style.animation = 'slideInRight 0.5s ease';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, duration);
    }
    
    // Add notification animations to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===========================
    // EASTER EGG: Konami Code
    // ===========================
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-8);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
        }
    });
    
    function activateEasterEgg() {
        // Create heart explosion
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * window.innerWidth + 'px';
                heart.style.top = '-50px';
                heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
                heart.style.zIndex = '99999';
                heart.style.animation = 'fall 3s linear';
                
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 3000);
            }, i * 100);
        }
        
        showNotification('💕 You found the secret! I love you more than words can say! 💕', 5000);
        
        // Add fall animation
        const fallStyle = document.createElement('style');
        fallStyle.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(fallStyle);
    }
    
    console.log('%c💕 Made with Love 💕', 'font-size: 24px; color: #ff4081; font-weight: bold; text-shadow: 2px 2px 4px rgba(255, 64, 129, 0.5);');
    console.log('%cHappy Valentine\'s Day! ❤️', 'font-size: 18px; color: #ff1744;');
});
