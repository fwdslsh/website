// Main entry point for site scripts
// This keeps the HTML clean and avoids nested script tag issues

import { applySpeedHighlight } from './speed-highlight-wrapper.js';

const runSiteScripts = () => {
    // Smooth scrolling for anchor links
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

    // Tool-specific page logic
    initializeToolPageFeatures();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runSiteScripts);
} else {
    runSiteScripts();
}

// Initialize tool-specific page features
function initializeToolPageFeatures() {
    // Set active state for tool navigation
    setActiveToolNavigation();
    
    // Initialize any tab functionality
    initializeTabs();
}

// Set active state based on current page
function setActiveToolNavigation() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.tool-nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === fileName || 
            (fileName === '' && linkHref === 'index.html') ||
            (fileName === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize tab functionality
function initializeTabs() {
    document.querySelectorAll('[data-tab]').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabGroup = this.dataset.tabGroup || 'default';
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs in group
            document.querySelectorAll(`[data-tab-group="${tabGroup}"]`).forEach(t => {
                t.classList.remove('active');
            });
            
            // Hide all content in group
            document.querySelectorAll(`[data-tab-content-group="${tabGroup}"]`).forEach(content => {
                content.classList.remove('active');
            });
            
            // Activate clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Global utility functions exposed to window
window.fwdslsh = {
    // Show a tab (used by inline handlers)
    showTab: function(tabName, groupName = 'default') {
        const tab = document.querySelector(`[data-tab="${tabName}"][data-tab-group="${groupName}"]`);
        if (tab) {
            tab.click();
        }
    },
    
    // Smooth scroll to element
    scrollTo: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};
