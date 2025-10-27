// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
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

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Add scroll animation to info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.1}s`;
        
        // Add error handling for images
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMWExYTFhIi8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzE2MS4zNDQgMTAwIDEzMCAxMzEuMzQ0IDEzMCAxNzBWMjMwQzEzMCAyNjguNjU2IDE2MS4zNDQgMzAwIDIwMCAzMDBDMjM4LjY1NiAzMDAgMjcwIDI2OC42NTYgMjcwIDIzMFYxNzBDMjcwIDEzMS4zNDQgMjM4LjY1NiAxMDAgMjAwIDEwMFoiIGZpbGw9IiNENEFGMzciLz4KPHN2Zz4K';
            this.alt = 'Image de parure de lit';
        });
    });
});

// Add parallax effect to header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add click tracking for WhatsApp buttons
document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('WhatsApp button clicked');
    });
});

// Add hover effect for social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add dynamic text animation for hero headline
document.addEventListener('DOMContentLoaded', () => {
    const headline = document.querySelector('.hero-headline');
    if (headline) {
        const text = headline.textContent;
        headline.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${index * 0.05}s`;
            span.style.display = 'inline-block';
            span.style.animation = 'fadeInUp 0.6s ease-out forwards';
            span.style.opacity = '0';
            headline.appendChild(span);
        });
    }
});

// Mobile menu toggle functionality
const addMobileMenuToggle = () => {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileToggle && mainNav) {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        document.body.appendChild(overlay);
        
        const toggleMenu = (isOpen) => {
            if (isOpen) {
                mainNav.classList.add('mobile-open');
                mobileToggle.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                mainNav.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        };
        
        // Toggle menu on hamburger click
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mainNav.classList.contains('mobile-open');
            toggleMenu(!isOpen);
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
            toggleMenu(false);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !mainNav.contains(e.target)) {
                toggleMenu(false);
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('mobile-open')) {
                toggleMenu(false);
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mainNav.classList.contains('mobile-open')) {
                toggleMenu(false);
            }
        });
    }
};

// Google Sheets Integration
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec';

// Form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (orderForm) {
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = orderForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            
            try {
                // Collect form data
                const formData = new FormData(orderForm);
                const orderData = {
                    timestamp: new Date().toLocaleString('fr-FR'),
                    fullName: formData.get('fullName'),
                    whatsapp: formData.get('whatsapp'),
                    address: formData.get('address'),
                    model: formData.get('model'),
                    color: formData.get('color'),
                    quantity: formData.get('quantity'),
                    comments: formData.get('comments') || 'Aucun commentaire'
                };
                
                // Send to Google Sheets (you'll need to set up the Google Apps Script)
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                });
                
                // Show success message
                orderForm.style.display = 'none';
                thankYouMessage.style.display = 'block';
                
                // Scroll to thank you message
                thankYouMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    orderForm.reset();
                    orderForm.style.display = 'block';
                    thankYouMessage.style.display = 'none';
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }, 5000);
                
            } catch (error) {
                console.error('Error submitting form:', error);
                
                // Show error message
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur - Réessayer';
                submitButton.style.background = 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)';
                }, 3000);
                
                // Fallback: redirect to WhatsApp with order details
                const whatsappMessage = `Bonjour! Je souhaite commander:\n\n` +
                    `Nom: ${orderData.fullName}\n` +
                    `WhatsApp: ${orderData.whatsapp}\n` +
                    `Adresse: ${orderData.address}\n` +
                    `Modèle: ${orderData.model}\n` +
                    `Couleur: ${orderData.color}\n` +
                    `Quantité: ${orderData.quantity}\n` +
                    `Commentaires: ${orderData.comments}`;
                
                const whatsappUrl = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${encodeURIComponent(whatsappMessage)}`;
                
                setTimeout(() => {
                    if (confirm('Erreur de connexion. Voulez-vous envoyer votre commande via WhatsApp?')) {
                        window.open(whatsappUrl, '_blank');
                    }
                }, 1000);
            }
        });
    }
    
    // Form validation enhancements
    const inputs = orderForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
});

// Field validation function
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Validate based on field type
    switch (field.name) {
        case 'fullName':
            if (value.length < 2) {
                showFieldError(field, 'Le nom doit contenir au moins 2 caractères');
            }
            break;
            
        case 'whatsapp':
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Numéro de téléphone invalide');
            }
            break;
            
        case 'address':
            if (value.length < 10) {
                showFieldError(field, 'Adresse trop courte');
            }
            break;
            
        case 'quantity':
            if (value < 1 || value > 10) {
                showFieldError(field, 'Quantité entre 1 et 10');
            }
            break;
    }
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.25rem';
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Add error styling to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 10px rgba(220, 53, 69, 0.3) !important;
    }
`;
document.head.appendChild(style);

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addMobileMenuToggle();
    
    // Add smooth reveal animation to CTA section
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        ctaSection.style.opacity = '0';
        ctaSection.style.transform = 'translateY(30px)';
        ctaSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(ctaSection);
    }
    
    // Add smooth reveal animation to order form section
    const orderFormSection = document.querySelector('.order-form-section');
    if (orderFormSection) {
        orderFormSection.style.opacity = '0';
        orderFormSection.style.transform = 'translateY(30px)';
        orderFormSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(orderFormSection);
    }
});
