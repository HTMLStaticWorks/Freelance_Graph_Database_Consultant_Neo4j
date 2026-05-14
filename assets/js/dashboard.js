/* 
==================================================
   GRAPH INTELLIGENCE - DASHBOARD JAVASCRIPT
==================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initSectionSwitching();
    initThemeToggle();
    initRtlToggle();
});

function initSidebar() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('sidebar-close');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }
}

function initSectionSwitching() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
    const sections = document.querySelectorAll('.dashboard-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');

            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show target section
            sections.forEach(section => {
                if (section.id === targetSection) {
                    section.classList.remove('d-none');
                } else {
                    section.classList.add('d-none');
                }
            });

            // Close sidebar on mobile
            if (window.innerWidth < 992) {
                document.querySelector('.sidebar').classList.remove('active');
            }
        });
    });
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
            icon.className = isLight ? 'bi bi-moon-fill fs-5' : 'bi bi-sun-fill fs-5';
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.documentElement.setAttribute('data-bs-theme', 'light');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'bi bi-moon-fill fs-5';
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
