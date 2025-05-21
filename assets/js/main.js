/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const formData = new FormData(this);

    // Send email using Formspree or your preferred service
    fetch('https://formspree.io/f/mblowogr', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            alert('Oops! Something went wrong.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Show menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}
document.querySelector('.contact__form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Add form validation logic
function validateForm(formData) {
    const errors = {};

    if (!isValidName(formData.name)) {
        errors.name = 'Name must be at least 3 characters long.';
    }

    if (!isValidEmail(formData.email)) {
        errors.email = 'Invalid email format.';
    }

    if (!isValidPassword(formData.password)) {
        errors.password = 'Password must be at least 8 characters with 1 number.';
    }

    return errors;
}

function isValidName(name) {
    return name && name.trim().length >= 3;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}
});

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
// Hide menu (you’ll need a close button in your HTML with id="nav-close")
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}


/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('show-menu');
}));

/*==================== ACCORDION SKILLS ====================*/

/*==================== QUALIFICATION TABS ====================*/
// Qualification tab switch
const tabs = document.querySelectorAll('.qualification__tab');
const panels = document.querySelectorAll('.qualification__panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.add('hidden'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.remove('hidden');
    tab.setAttribute('aria-selected', 'true');
  });
});


/*==================== SERVICES MODAL ====================*/


/*==================== PORTFOLIO SWIPER  ====================*/
// Portfolio Swiper
// Initialize Swiper for Portfolio Section
// Simplified Swiper initialization for Portfolio Section
document.addEventListener('DOMContentLoaded', function() {
  // Initialize custom pagination with bullets
  const createCustomPagination = function() {
    const paginationEl = document.querySelector('.portfolio__pagination');
    const slides = document.querySelectorAll('.swiper-slide');

    // Create bullets based on number of slides
    for (let i = 0; i < slides.length; i++) {
      const bullet = document.createElement('span');
      bullet.classList.add('swiper-pagination-bullet');
      if (i === 0) bullet.classList.add('swiper-pagination-bullet-active');
      bullet.addEventListener('click', function() {
        portfolioSwiper.slideTo(i);
      });
      paginationEl.appendChild(bullet);
    }
  };

  // Initialize arrow navigation
  const initArrows = function() {
    const prevArrow = document.querySelector('.portfolio__arrow--prev');
    const nextArrow = document.querySelector('.portfolio__arrow--next');

    prevArrow.addEventListener('click', function() {
      portfolioSwiper.slidePrev();
    });

    nextArrow.addEventListener('click', function() {
      portfolioSwiper.slideNext();
    });
  };

  // Initialize Swiper
  const portfolioSwiper = new Swiper('.portfolio__swiper', {
    // Core settings
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 700,
    grabCursor: true,
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    // Add keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Add autoplay with decent delay and pause on hover
    autoplay: {
      delay: 6000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },

    // Handling slide change for custom pagination
    on: {
      init: function() {
        createCustomPagination();
        initArrows();
      },
      slideChange: function() {
        const bullets = document.querySelectorAll('.portfolio__pagination .swiper-pagination-bullet');
        bullets.forEach((bullet, index) => {
          if (index === this.realIndex) {
            bullet.classList.add('swiper-pagination-bullet-active');
          } else {
            bullet.classList.remove('swiper-pagination-bullet-active');
          }
        });
      }
    },
  });
});

/*==================== DARK/LIGHT THEME TOGGLE ====================*/
const themeButton = document.getElementById('theme-button');
const darkClass = 'dark-theme';
const iconClass = 'uil-sun';          // when in dark mode, show sun to switch back

// Restore previously selected theme (if any)
const savedTheme = localStorage.getItem('selected-theme');
const savedIcon  = localStorage.getItem('selected-icon');

if (savedTheme) {
  document.body.classList[savedTheme === 'dark' ? 'add' : 'remove'](darkClass);
  themeButton.classList[savedIcon === 'uil-moon' ? 'add' : 'remove'](iconClass);
}

// Helper to get current values
const getCurrentTheme = () => document.body.classList.contains(darkClass) ? 'dark' : 'light';
const getCurrentIcon  = () => themeButton.classList.contains(iconClass) ? 'uil-moon' : 'uil-sun';

// Toggle on click
themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkClass);
  themeButton.classList.toggle(iconClass);

  // Persist choices
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon',  getCurrentIcon());
});
