// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-cyber-dark/95');
            navbar.classList.remove('bg-cyber-dark/80');
        } else {
            navbar.classList.add('bg-cyber-dark/80');
            navbar.classList.remove('bg-cyber-dark/95');
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Typewriter effect
    const typewriterText = document.querySelector('.typewriter');
    if (typewriterText) {
        const texts = [
            'WebDev and Robotics Enthusiast',
            'JavaScript & Python Specialist',
            'Undergraduate Student of Electrical Engineering',
            'Problem Solver & Innovation Driver'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        function type() {
            const fullText = texts[textIndex];
            
            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typewriterText.textContent = currentText;
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === fullText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next text
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    }

    // Particle effect for hero section
    createParticles();

    // Contact form handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (you can replace this with actual form submission)
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Project buttons functionality
    setupProjectButtons();

    // Skills animation
    animateSkills();
});

// Particle system for hero section
function createParticles() {
    const heroSection = document.querySelector('#home');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-cyber-blue rounded-full opacity-30 animate-float';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heroSection.appendChild(particle);
    }
}

// Project buttons setup
function setupProjectButtons() {
    const projectCards = document.querySelectorAll('.card-hover');
    
    projectCards.forEach(card => {
        const viewBtn = card.querySelector('button:first-of-type');
        const codeBtn = card.querySelector('button:last-of-type');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', function() {
                showNotification('Project demo will be available soon!', 'info');
            });
        }
        
        if (codeBtn) {
            codeBtn.addEventListener('click', function() {
                showNotification('GitHub repository will be available soon!', 'info');
            });
        }
    });
}

// Skills animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.bg-gradient-to-r');
                if (progressBar) {
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.transition = 'width 2s ease-in-out';
                        progressBar.style.width = progressBar.getAttribute('data-width') || progressBar.style.width;
                    }, 200);
                }
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(skill => {
        skillObserver.observe(skill);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-cyber-blue', 'text-cyber-dark');
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Cursor trail effect
let mouseX = 0;
let mouseY = 0;
let trailElements = [];

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function createCursorTrail() {
    if (trailElements.length > 20) {
        const oldElement = trailElements.shift();
        if (oldElement && oldElement.parentNode) {
            oldElement.parentNode.removeChild(oldElement);
        }
    }
    
    const trail = document.createElement('div');
    trail.className = 'fixed w-2 h-2 bg-cyber-blue rounded-full pointer-events-none z-40 opacity-60';
    trail.style.left = mouseX + 'px';
    trail.style.top = mouseY + 'px';
    trail.style.transform = 'translate(-50%, -50%)';
    trail.style.transition = 'opacity 0.5s ease-out';
    
    document.body.appendChild(trail);
    trailElements.push(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
    }, 100);
}

// Create cursor trail effect on desktop
if (window.innerWidth > 768) {
    setInterval(createCursorTrail, 50);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroElements = document.querySelectorAll('#home .animate-float');
    
    heroElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Loading animation
window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'fixed inset-0 bg-cyber-dark z-50 flex items-center justify-center';
    loadingScreen.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div class="text-cyber-blue text-xl font-cyber">Loading...</div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 1000);
});

// Matrix rain effect (optional, can be enabled for extra futuristic feel)
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'fixed inset-0 pointer-events-none z-0 opacity-10';
    matrixContainer.innerHTML = `
        <canvas id="matrix-canvas" class="w-full h-full"></canvas>
    `;
    document.body.appendChild(matrixContainer);
    
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d2ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Uncomment the line below to enable matrix rain effect
// createMatrixRain();

