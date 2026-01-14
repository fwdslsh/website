document.addEventListener('DOMContentLoaded', () => {
    // Animation Observers
    setupAnimations();
    
    // Smooth scrolling for anchor links
    setupSmoothScroll();
    
    // Active link highlighting
    highlightActiveLinks();
});

function setupAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle different animation targets
                if (entry.target.classList.contains('performance-number') || 
                    entry.target.classList.contains('stat-number')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
                
                if (entry.target.classList.contains('progress-line')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.5s ease-out forwards';
                    }, index * 300);
                }
                
                if (entry.target.classList.contains('workflow-step')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.5s ease-out forwards';
                    }, index * 200);
                }

                // Generic fade-in
                if (entry.target.dataset.animate === 'fade-in') {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to observe
    const animatedElements = document.querySelectorAll(
        '.performance-number, .stat-number, .progress-line, .workflow-step, [data-animate="fade-in"]'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function highlightActiveLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.unify-nav-links a');
    
    navLinks.forEach(link => {
        // Exact match or sub-path match for tools
        if (link.getAttribute('href') === currentPath || 
            (currentPath.length > 1 && link.getAttribute('href').startsWith(currentPath))) {
            link.classList.add('active');
        }
    });
}
