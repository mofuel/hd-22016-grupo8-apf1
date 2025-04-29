/**
 * ProActa Abogados - Main JavaScript
 * main.js
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Navbar scroll behavior
    const navbar = document.getElementById('mainNav');
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        backToTopButton.classList.add('show');
      } else {
        navbar.classList.remove('navbar-scrolled');
        backToTopButton.classList.remove('show');
      }
    });
    
    // Smooth scrolling for navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
          
          // Close mobile menu when link is clicked
          const navbarCollapse = document.getElementById('navbarResponsive');
          if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          }
        }
      });
    });
    
    // Active nav link based on scroll position
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize Bootstrap carousel animation
    const carouselCaptions = document.querySelectorAll('.carousel-caption > *');
    
    function animateCarouselCaption() {
      const activeCarouselItem = document.querySelector('.carousel-item.active');
      if (activeCarouselItem) {
        const captions = activeCarouselItem.querySelectorAll('.carousel-caption > *');
        captions.forEach(caption => {
          // Reset animation
          caption.style.animation = 'none';
          caption.offsetHeight; // Trigger reflow
          
          // Add animation classes
          if (caption.classList.contains('animate__animated')) {
            const animationClass = Array.from(caption.classList)
              .find(className => className.startsWith('animate__') && className !== 'animate__animated');
            
            if (animationClass) {
              caption.style.animation = '';
              caption.classList.remove(animationClass);
              setTimeout(() => {
                caption.classList.add(animationClass);
              }, 50);
            }
          }
        });
      }
    }
    
    // Run animation when carousel slides
    const heroCarousel = document.getElementById('carouselExampleIndicators');
    if (heroCarousel) {
      heroCarousel.addEventListener('slid.bs.carousel', animateCarouselCaption);
      // Initial animation on page load
      animateCarouselCaption();
    }
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple client-side validation
        let valid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            valid = false;
            field.classList.add('is-invalid');
          } else {
            field.classList.remove('is-invalid');
          }
        });
        
        const emailField = contactForm.querySelector('#email');
        if (emailField && emailField.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailField.value.trim())) {
            valid = false;
            emailField.classList.add('is-invalid');
          }
        }
        
        if (valid) {
          // Simulate form submission success
          const formElements = contactForm.elements;
          for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = true;
          }
          
          // Reset form after "submission"
          setTimeout(() => {
            // Show success message (in real implementation)
            alert('¡Gracias por contactarnos! Le responderemos a la brevedad.');
            
            // Reset form
            contactForm.reset();
            for (let i = 0; i < formElements.length; i++) {
              formElements[i].disabled = false;
              formElements[i].classList.remove('is-invalid');
            }
          }, 1000);
        }
      });
      
      // Real-time validation on input
      const inputs = contactForm.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('input', function() {
          if (this.hasAttribute('required') && !this.value.trim()) {
            this.classList.add('is-invalid');
          } else {
            this.classList.remove('is-invalid');
          }
          
          if (this.id === 'email' && this.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value.trim())) {
              this.classList.add('is-invalid');
            } else {
              this.classList.remove('is-invalid');
            }
          }
        });
      });
    }
    
    // Service card hover animation enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
    
    // Add AOS-like scroll animations to elements
    function revealOnScroll() {
      const elements = document.querySelectorAll('.benefit-card, .service-card, .section-header, .testimonial-card, .cta-content, .contact-form-container');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('fadeIn');
        }
      });
    }
    
    // Add CSS for fadeIn animation to the head
    const style = document.createElement('style');
    style.textContent = `
      .benefit-card, .service-card, .section-header, .testimonial-card, .cta-content, .contact-form-container {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .fadeIn {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on page load
  });