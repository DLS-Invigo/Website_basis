// Menu Toggle Functionality
document.addEventListener(‘DOMContentLoaded’, function() {
const menuToggle = document.querySelector(’.menu-toggle’);
const mobileMenuToggle = document.querySelector(’.mobile-menu-toggle’);
const dropdownMenu = document.querySelector(’.dropdown-menu’);
const closeMenu = document.querySelector(’.close-menu’);
const body = document.body;

```
// Function to open menu
function openMenu() {
    dropdownMenu.classList.add('active');
    body.style.overflow = 'hidden';
}

// Function to close menu
function closeMenuFunc() {
    dropdownMenu.classList.remove('active');
    body.style.overflow = 'auto';
}

// Event listeners
if (menuToggle) {
    menuToggle.addEventListener('click', openMenu);
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMenu);
}

if (closeMenu) {
    closeMenu.addEventListener('click', closeMenuFunc);
}

// Close menu when clicking outside
if (dropdownMenu) {
    dropdownMenu.addEventListener('click', function(e) {
        if (e.target === dropdownMenu) {
            closeMenuFunc();
        }
    });
}

// Close menu on escape key
if (dropdownMenu) {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dropdownMenu.classList.contains('active')) {
            closeMenuFunc();
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            closeMenuFunc();
        }
    });
});

// Add active class to current page nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a, .dropdown-links a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
        link.style.color = 'var(--primary-orange)';
    }
});

// Fade in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .section-header').forEach(el => {
    observer.observe(el);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});
```

});
