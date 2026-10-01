// Main entry point for site scripts
// This keeps the HTML clean and avoids nested script tag issues

import { applySpeedHighlight } from './speed-highlight-wrapper.js';

const runSiteScripts = () => {
    // Add scroll effect to navigation
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(10, 14, 10, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 14, 10, 0.9)';
            }
        }
    });

    // Terminal typing animation for code elements
    const terminalLines = document.querySelectorAll('.terminal-line, .code-line');
    if (terminalLines.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.5s ease-out forwards';
                }
            });
        });

        terminalLines.forEach((line, index) => {
            line.style.animationDelay = `${index * 0.2}s`;
            observer.observe(line);
        });
    }

    // Generic fade-in animation for elements on scroll
    const animateElements = document.querySelectorAll('.feature-card, .install-card, .quick-link, .integration-card, .scenario-card');
    if (animateElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                        entry.target.style.opacity = '1';
                    }, index * 100);
                }
            });
        }, observerOptions);

        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Apply syntax highlighting
    applySpeedHighlight();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runSiteScripts);
} else {
    runSiteScripts();
}
