// Element Selection
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-menu li');
const loadingBackground = document.querySelector('.loading-background');
const backgroundSlider = document.querySelector('.background-slider');
const slides = document.querySelectorAll('.background-slide');
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-menu a');
const logoLink = document.querySelector('.logo-link');
const subLogo = document.querySelector('.sub-logo');

let currentSlide = 0;
const totalSlides = slides.length;

// Background slide transition function
const changeSlide = () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add('active');
};

// Start background slide transition
setInterval(changeSlide, 4000);

// Page load and loading background handling
window.onload = () => {
    setTimeout(() => {
        loadingBackground.classList.add('fade-out');
        backgroundSlider.classList.add('show');
    }, 3000);

    setTimeout(() => {
        loadingBackground.remove();
    }, 4000);
};

// Menu animation handling
const toggleMenuAnimation = (action) => {
    if (action === 'add') {
        navMenu.classList.add('active');
        navItems.forEach((item, index) => {
            item.style.animation = `slideIn 0.3s ease-out forwards ${0.2 * index}s`;
        });
    } else {
        navItems.forEach((item, index) => {
            item.style.animation = `slideOut 0.3s ease-in forwards ${0.2 * index}s`;
        });
        setTimeout(() => {
            navMenu.classList.remove('active');
        }, 300 + 0.2 * (navItems.length - 1) * 1000);
    }
};

// Menu toggle button click event
menuToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.contains('active');
    toggleMenuAnimation(isActive ? 'remove' : 'add');
});

// Show or hide sub-logo based on window width
const handleResize = () => {
    if (window.innerWidth > 800) {
        subLogo.style.display = 'flex';
        navMenu.classList.remove('active');
        navItems.forEach(item => {
            item.style.animation = 'none';
        });
    } else {
        subLogo.style.display = 'none';
        if (navMenu.classList.contains('active')) {
            toggleMenuAnimation('add');
        }
    }
};

// Initialize on page load and window resize
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// Display sections and handle navigation
document.addEventListener('DOMContentLoaded', () => {
    const showSection = (sectionId) => {
        sections.forEach(section => {
            section.classList.toggle('visible', section.id === sectionId);
            section.classList.toggle('hidden', section.id !== sectionId);
        });
    };

    // Show 'home' section by default
    showSection('home');

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            showSection(target);
        });
    });

    // Return to home section on logo click
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('home');
    });
});
