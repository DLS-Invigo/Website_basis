// ===== MOBILE MENU FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');

    // Toggle mobile menu
    function toggleMobileMenu() {
        burgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Open mobile menu
    if (burgerMenu) {
        burgerMenu.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu
    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            toggleMobileMenu();
        }
    });

    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.primary-nav a, .mobile-menu-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ===== KIT CAROUSEL FUNCTIONALITY =====
    const kitImages = document.querySelector('.kit-images');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (kitImages && prevBtn && nextBtn) {
        let currentIndex = 0;
        const images = kitImages.querySelectorAll('img');
        const totalImages = images.length;

        function updateCarousel() {
            const offset = -currentIndex * 100;
            kitImages.style.transform = `translateX(${offset}%)`;
        }

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        });

        // Auto-play carousel (optional)
        let autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        }, 5000);

        // Pause auto-play on hover
        const carousel = document.querySelector('.kit-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });

            carousel.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalImages;
                    updateCarousel();
                }, 5000);
            });
        }

        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        kitImages.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        kitImages.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left
                currentIndex = (currentIndex + 1) % totalImages;
                updateCarousel();
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
                updateCarousel();
            }
        }
    }

    // ===== MODAL FUNCTIONALITY =====
    const modal = document.getElementById('kitModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    if (modal && modalImage && kitImages) {
        const images = Array.from(kitImages.querySelectorAll('img'));
        let currentModalIndex = 0;

        // Open modal when clicking on kit image
        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentModalIndex = index;
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Close modal when clicking outside image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Modal navigation
        if (modalPrev) {
            modalPrev.addEventListener('click', () => {
                currentModalIndex = (currentModalIndex - 1 + images.length) % images.length;
                modalImage.src = images[currentModalIndex].src;
                modalImage.alt = images[currentModalIndex].alt;
            });
        }

        if (modalNext) {
            modalNext.addEventListener('click', () => {
                currentModalIndex = (currentModalIndex + 1) % images.length;
                modalImage.src = images[currentModalIndex].src;
                modalImage.alt = images[currentModalIndex].alt;
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                currentModalIndex = (currentModalIndex - 1 + images.length) % images.length;
                modalImage.src = images[currentModalIndex].src;
                modalImage.alt = images[currentModalIndex].alt;
            } else if (e.key === 'ArrowRight') {
                currentModalIndex = (currentModalIndex + 1) % images.length;
                modalImage.src = images[currentModalIndex].src;
                modalImage.alt = images[currentModalIndex].alt;
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
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

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections for fade-in animation
    document.querySelectorAll('.about-card, .news-card, section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== FACEBOOK SDK INITIALIZATION =====
    // Ensure Facebook posts are properly loaded
    if (typeof FB !== 'undefined') {
        FB.XFBML.parse();
    }

    // Re-parse Facebook embeds after page load
    window.addEventListener('load', () => {
        if (typeof FB !== 'undefined') {
            setTimeout(() => {
                FB.XFBML.parse();
            }, 1000);
        }
    });
});

// ===== RESIZE HANDLER FOR RESPONSIVE ADJUSTMENTS =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to larger screen
        const mobileMenu = document.querySelector('.mobile-menu');
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            document.querySelector('.burger-menu').classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Re-parse Facebook embeds on resize
        if (typeof FB !== 'undefined') {
            FB.XFBML.parse();
        }
    }, 250);
});
