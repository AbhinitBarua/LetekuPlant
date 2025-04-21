// DOM Elements
const navbar = document.getElementById('navbar');
const scrollDown = document.querySelector('.scroll-down');
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const links = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('.section');
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-item');
const benefitsTrack = document.querySelector('.benefits-track');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');

// Variables
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.benefit-slide').length;

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Reveal animations on scroll
    revealOnScroll();
});

// Mobile navigation
burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');
    
    // Animate Links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Scroll down button functionality
scrollDown.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

// Close mobile menu when clicking a link
links.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            links.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Reveal animations on scroll
function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('reveal-active');
        }
    });
}

// Benefits slider functionality
function moveSlider() {
    benefitsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    moveSlider();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    moveSlider();
});

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const parallaxSections = document.querySelectorAll('.parallax-bg');
    
    parallaxSections.forEach(section => {
        const speed = 0.5;
        const yPos = -(window.scrollY * speed);
        section.style.backgroundPosition = `center ${yPos}px`;
    });
});

// Gallery image popup functionality
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Create modal
        const modal = document.createElement('div');
        modal.classList.add('gallery-modal');
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        
        // Clone the image
        const image = item.querySelector('img').cloneNode();
        image.classList.add('modal-image');
        
        // Add caption
        const caption = document.createElement('div');
        caption.classList.add('modal-caption');
        caption.textContent = item.querySelector('.gallery-caption').textContent;
        
        // Close button
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('modal-close');
        closeBtn.innerHTML = '&times;';
        
        // Append elements
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(image);
        modalContent.appendChild(caption);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Prevent scrolling on body
        document.body.style.overflow = 'hidden';
        
        // Animation
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close modal functionality
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        function closeModal() {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            document.body.style.overflow = '';
            
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
});

// Add modal styles dynamically
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .gallery-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-content {
        max-width: 90%;
        max-height: 90%;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .modal-image {
        max-width: 100%;
        max-height: 80vh;
        display: block;
        border-radius: 5px;
    }
    
    .modal-caption {
        color: white;
        padding: 15px 0;
        text-align: center;
        font-size: 1.1rem;
    }
    
    .modal-close {
        position: absolute;
        top: -40px;
        right: -40px;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .modal-close:hover {
        color: #ff9800;
    }
    
    @media screen and (max-width: 768px) {
        .modal-close {
            top: -40px;
            right: 0;
        }
    }
`;
document.head.appendChild(modalStyles);

// Newsletter form submission (prevent default)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (emailInput && emailInput.value) {
            // Success message
            const successMsg = document.createElement('div');
            successMsg.classList.add('newsletter-success');
            successMsg.textContent = 'Thank you for subscribing!';
            successMsg.style.color = '#4CAF50';
            successMsg.style.marginTop = '10px';
            successMsg.style.fontWeight = '500';
            
            // Remove any existing message
            const existingMsg = newsletterForm.querySelector('.newsletter-success');
            if (existingMsg) {
                newsletterForm.removeChild(existingMsg);
            }
            
            newsletterForm.appendChild(successMsg);
            emailInput.value = '';
            
            // Remove message after 3 seconds
            setTimeout(() => {
                if (successMsg.parentNode === newsletterForm) {
                    newsletterForm.removeChild(successMsg);
                }
            }, 3000);
        }
    });
}

// Interactive header parallax effect
const parallaxHeader = document.querySelector('.parallax-header');
if (parallaxHeader) {
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        if (scrollValue < window.innerHeight) {
            const translateY = scrollValue * 0.5;
            parallaxHeader.style.backgroundPositionY = `-${translateY}px`;
        }
    });
}

// Add active class to current section in navigation
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    links.forEach(link => {
        link.classList.remove('active');
        const href = link.querySelector('a').getAttribute('href').substring(1);
        
        if (href === current) {
            link.classList.add('active');
        }
    });
});

// Add active class style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-links li.active a {
        color: #FF9800;
    }
    
    .nav-links li.active a::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// Add typing animation to the header
const headerTitle = document.querySelector('.header-content h1');
if (headerTitle) {
    const text = headerTitle.textContent;
    headerTitle.textContent = '';
    
    setTimeout(() => {
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                headerTitle.textContent += text[i];
            }, i * 100);
        }
    }, 500);
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check for elements in viewport on load
    revealOnScroll();
    
    // Add fade-in animation to header content
    const headerContent = document.querySelector('.header-content');
    if (headerContent) {
        headerContent.style.opacity = '0';
        headerContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            headerContent.style.transition = 'opacity 1s ease, transform 1s ease';
            headerContent.style.opacity = '1';
            headerContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add animation for scroll down button
    if (scrollDown) {
        scrollDown.style.opacity = '0';
        
        setTimeout(() => {
            scrollDown.style.transition = 'opacity 1s ease';
            scrollDown.style.opacity = '1';
        }, 1500);
    }
    
    // Add fade-in animation to navbar
    if (navbar) {
        navbar.style.opacity = '0';
        
        setTimeout(() => {
            navbar.style.transition = 'opacity 1s ease';
            navbar.style.opacity = '1';
        }, 800);
    }
});
