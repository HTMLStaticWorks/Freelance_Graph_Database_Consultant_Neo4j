/* 
==================================================
   GRAPH INTELLIGENCE - MAIN JAVASCRIPT
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initThemeToggle();
    initRtlToggle();
    initNavbarScroll();
    initCounters();
    initRevealOnScroll();
    initBackToTop();
});

// Hero Animation: Connected Nodes
function initHeroAnimation() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;
    const connectionDistance = 150;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#10b981';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.update();
            p.draw();

            for (let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(16, 185, 129, ${1 - distance / connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Theme Toggle (Dark/Light)
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        document.documentElement.setAttribute('data-bs-theme', isLight ? 'light' : 'dark');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Update icon
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.className = isLight ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.documentElement.setAttribute('data-bs-theme', 'light');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'bi bi-moon-fill';
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
}


// RTL Toggle
function initRtlToggle() {
    const rtlBtn = document.getElementById('rtl-toggle');
    if (!rtlBtn) return;

    rtlBtn.addEventListener('click', () => {
        const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
        document.documentElement.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
        localStorage.setItem('rtl', isRtl ? 'ltr' : 'rtl');
    });

    // Load saved RTL
    if (localStorage.getItem('rtl') === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-custom');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}


// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                const suffix = entry.target.getAttribute('data-suffix') || '';
                const decimals = parseInt(entry.target.getAttribute('data-decimals')) || 0;
                const duration = 1500;
                let startTime = null;

                const animate = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = timestamp - startTime;
                    const percentage = Math.min(progress / duration, 1);
                    const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
                    const current = ease * target;
                    entry.target.innerText = current.toFixed(decimals) + suffix;
                    if (percentage < 1) requestAnimationFrame(animate);
                    else entry.target.innerText = target.toFixed(decimals) + suffix;
                };
                requestAnimationFrame(animate);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    counters.forEach(counter => observer.observe(counter));
}

// Reveal on Scroll Animation
function initRevealOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// Back to Top functionality
function initBackToTop() {
    let btn = document.getElementById('back-to-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        btn.className = 'back-to-top';
        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
