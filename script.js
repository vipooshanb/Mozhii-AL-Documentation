/* ═══════════════════════════════════════════════════════════════════
   Mozhii AL — Product Documentation
   JavaScript: Sidebar Navigation, Mobile Menu, Scroll Spy
   ═══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    /* ─── ELEMENTS ──────────────────────────────────────────────── */
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const links = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.doc-section');

    /* ─── MOBILE SIDEBAR TOGGLE ─────────────────────────────────── */
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    /* Close sidebar when a link is clicked (mobile) */
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });

    /* ─── SCROLL SPY ────────────────────────────────────────────── */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    links.forEach(l => {
                        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
                    });
                }
            });
        },
        {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        }
    );

    sections.forEach(s => observer.observe(s));

    /* ─── HANDLE RESIZE ─────────────────────────────────────────── */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 1024) {
                closeSidebar();
            }
        }, 150);
    });

    /* ─── SMOOTH SCROLL FIX FOR HEADER OFFSET ───────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('top-header').offsetHeight;
                const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});
