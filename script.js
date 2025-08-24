// Reset scroll position on page load
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

// Ensure page starts at top when loaded
window.addEventListener('load', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Also reset on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    
    // Smooth scrolling for navigation links
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
            if (entry.isIntersecting && !entry.target.classList.contains('animate-slide-up')) {
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
        // Same texts for both mobile and desktop
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

    // Contact form handling with Google Sheets integration
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const submitText = document.getElementById('submit-text');
            const submitLoader = document.getElementById('submit-loader');
            
            // Show loading state
            submitBtn.disabled = true;
            submitText.textContent = 'Sending...';
            submitLoader.classList.remove('hidden');
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            };
            
            // Send to Google Sheets
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwvzdccT2OdgD9HPQc3M3FVz3jTvJEJJFzPlLDvehieqgS9p9uVoPI6yJB3C9pQsDuP/exec';
            
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitLoader.classList.add('hidden');
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Reset button state
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitLoader.classList.add('hidden');
                
                // Show error message
                showNotification('Failed to send message. Please try again.', 'error');
            });
        });
    }

    // View Work button functionality
    const viewWorkBtn = document.getElementById('view-work-btn');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function() {
            document.querySelector('#projects').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // View All Projects functionality
    const viewAllProjectsBtn = document.getElementById('view-all-projects-btn');
    const additionalProjects = document.getElementById('additional-projects');
    
    if (viewAllProjectsBtn && additionalProjects) {
        viewAllProjectsBtn.addEventListener('click', function() {
            if (additionalProjects.classList.contains('hidden')) {
                // Show additional projects
                additionalProjects.classList.remove('hidden');
                additionalProjects.style.opacity = '0';
                additionalProjects.style.transform = 'translateY(20px)';
                
                // Animate in
                setTimeout(() => {
                    additionalProjects.style.transition = 'all 0.5s ease-out';
                    additionalProjects.style.opacity = '1';
                    additionalProjects.style.transform = 'translateY(0)';
                    
                    // Add event listeners to newly visible project areas
                    setupAdditionalProjectListeners();
                }, 10);
                
                this.textContent = 'Show Less Projects';
            } else {
                // Hide additional projects
                additionalProjects.style.transition = 'all 0.3s ease-in';
                additionalProjects.style.opacity = '0';
                additionalProjects.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    additionalProjects.classList.add('hidden');
                }, 300);
                
                this.textContent = 'View All Projects';
            }
        });
    }

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

// Skills animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-bar');
                if (progressBar) {
                    const targetWidth = progressBar.getAttribute('data-width');
                    progressBar.style.width = '0%';
                    progressBar.style.transition = 'none';
                    
                    setTimeout(() => {
                        progressBar.style.transition = 'width 2s ease-in-out';
                        progressBar.style.width = targetWidth;
                    }, 200);
                }
            }
        });
    }, { threshold: 0.3 });
    
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

createMatrixRain();

// Project data
const projectsData = {
    project1: {
        title: "Website Form Laporan Anomali",
        description: [
            "This Anomaly Report Web Application is built using Google Apps Script as a serverless backend and Google Sheets as the primary storage, with a simple frontend based on HTML, CSS, and Vanilla JavaScript. Its main goal is to simplify the operational anomaly reporting process (morning & afternoon shifts), ensure data format consistency, and provide a recap ready for analysis by both operational and management teams.",
            "Frontend: Structured HTML, minimal CSS for readability, and JavaScript that handles validation, field toggles, and google.script.run communication. The implementation focuses on input speed (autofocus, tab order) and visual feedback to enable operators to work quickly in the field.",
            "Backend (Google Apps Script): The doGet() function renders the page, while the saveData(form) function performs field → header mapping, server-side validation, sheet creation (if it doesn't already exist), row appending, and error logging. The PropertiesService stores the spreadsheetId so the integration is configurable and stateless.",
            "Storage: Google Sheets serves as a lightweight database — easy to manage, supports filters, charts, and CSV export for further analysis.",
            "The application utilizes standard Google Apps permissions: only authorized users can edit sheets (if configured). Sensitive data can be mitigated by avoiding unnecessary personal data input and setting role permissions (Viewer/Editor) according to company policy. Regular backups and sheet rotation (monthly/quarterly) are recommended to meet data retention compliance and maintain performance.",
            "The modular design (UI separated from backend logic) makes adding new fields or categories easy—just add headers and adjust the mapping in the backend. For large data scales, a strategy of rotating sheets per period and exporting to BigQuery or an external analytics system is recommended."
        ],
        images: [
            "assets/Projects/Form_Laporan_Anomali.png",
            "assets/Projects/Form_Laporan_Anomali_Opsi.png",
            "assets/Projects/Form_Laporan_Anomali_Mobile.png",
            "assets/Projects/Form_Laporan_Anomali_Mobile_Opsi.png"
        ],
        techStack: ["Google Apps Script", "JavaScript", "HTML5", "CSS3", "Google Sheets"],
        features: [
            "Dynamic Morning / Evening Form — Fields show or hide based on selected shift to reduce input errors",
            "Client & Server Validation — Required fields validated in the browser and re-checked on the server before saving",
            "Asynchronous Submission (No Reload) — Sends data via google.script.run so users get instant feedback without page refresh",
            "Automatic Rekap Spreadsheet Creation — Script creates a structured Google Sheet with standard headers on first run",
            "Append Row with Timestamp — Every report is recorded as a new row with server-side timestamp and metadata",
            "Configuration Management via PropertiesService — Stores spreadsheetId and settings centrally so deployments require no manual configuration",
            "User-Friendly Feedback — Clear success and error notifications with actionable messages for operators",
            "Error Handling & Logging — Robust logging and descriptive error messages to simplify troubleshooting and maintenance",
            "Optional Automatic Access Provisioning — Option to grant spreadsheet editor access automatically to owners or roles",
            "Analysis-Ready Data Structure — Standardized columns (timestamp, operator, category, location, remarks, status) for easy filtering and pivoting",
            "Operational Scalability — Support for per-period sheet rotation (e.g., monthly) to manage large datasets and maintain performance",
            "Easy Deployment as Web App — Publishable as a Google Apps Script Web App with configurable access (internal/external) for quick rollout"
        ],
    },
    project2: {
        title: "Portfolio Website",
        description: [
            "This portfolio website is a personal brand site built to present projects, skills, and experience in a concise and visually striking way. The design blends a clean layout with cyberpunk-inspired accents to communicate technical fluency and creative taste. The site emphasizes usability, responsiveness, and performance so that visitors and recruiters can quickly evaluate capabilities and navigate to examples of work.",
            "Visitors arrive at a hero section with a typewriter-style headline and short bio, then can scroll or use the navigation to jump to About, Skills, Projects, Experience, and Contact sections. Projects are shown as interactive cards that expand or open modals with details and links (live/demo/code). Skills display animated progress indicators. A contact form enables visitors to compose a message with immediate client-side validation and feedback.",
            "Markup & styling: semantic HTML5 structure with modular CSS; utility-first patterns are used for rapid layout and consistent spacing.",
            "Interactivity: lightweight vanilla JavaScript controls navigation behavior, scroll-triggered animations (intersection observer), typewriter effect, and modal/project interactions.",
            "Assets & fonts: Google Fonts for typographic polish and Font Awesome (or SVG icons) for crisp icons without heavy dependency overhead.",
            "Hosting: the site is a static site ready for GitHub Pages, Netlify, or similar platforms—no backend required for core functionality.",
            "Prioritizes fast load times through minimal JS and lightweight visuals; uses responsive images where applicable. Uses semantic markup and focus states for keyboard navigation; further accessibility auditing and ARIA improvements are scheduled.For very large portfolios or multimedia-heavy content, consider lazy-loading additional assets or moving heavy demos to separate demo pages."
        ],
        images: [
            "assets/Projects/Website_Portofolio.png",
            "assets/Projects/Website_Portofolio_Mobile.png",
        ],
        techStack: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Font Awesome", "Google Fonts", "GitHub Pages"],
        features: [
            "Futuristic / cyberpunk-inspired design — neon gradients, glow effects, and modern typography for strong visual identity",
            "Responsive layout — works smoothly across mobile, tablet, and desktop breakpoints",
            "Smooth micro-interactions — entrance animations, hover effects, and typewriter hero text to increase engagement",
            "Interactive project cards — hover details, view/code buttons, and modal/detail reveal for each project",
            "Animated skill indicators — progress bars or radial meters that animate into view on scroll",
            "Contact form with client-side feedback — validation and success/error notifications for immediate UX",
            "Optional particle/matrix visual accents — lightweight canvas effects for extra polish without blocking content",
            "Performance-minded — lazy content reveal, minimized assets, and static site architecture for fast page loads"
        ],
    },
    project3: {
        title: "Matrix Calculator - Static Web App",
        description: [
            "This project is a static web-based Matrix Calculator implemented with plain HTML, CSS, and JavaScript, enhanced by the math.js library. It’s designed for students, instructors, and engineers who need a quick, reliable tool to compute eigenvalues/eigenvectors and perform several matrix factorizations without installing software or requiring a server.",
            "Users paste or type matrices using a minimal text format (space-separated numbers, newline-separated rows) or choose built-in examples. The UI validates the input, then runs the selected numerical method entirely on the client. Results are presented clearly: formatted matrices, decomposition components (L, U, P, D, etc.), eigenvectors, and verification checks that show the decomposed matrices recomposed back to the original, helping users confirm correctness.",
            "Frontend: index.html provides the page structure and example presets; styles.css implements a clean, responsive design optimized for readability and mobile use.",
            "Computation: script.js contains the MatrixCalculator class that handles parsing, validation, algorithm selection, numerical processing, and result formatting. math.js is used for core linear algebra operations (eigs, matrix multiplication, inversion, etc.). The script also implements several classical decomposition algorithms (Doolittle, Crout, Cholesky) with helpful error/warning messaging and preprocessing to improve numerical behavior.",
            "Deployment: The app is static (HTML/CSS/JS). It can be hosted on GitHub Pages, Netlify, or any static hosting/CDN for instant public access.",
            "The app relies on client-side numeric libraries (math.js). For very large matrices or extremely ill-conditioned systems, browser floating-point limits can affect results — the UI provides warnings and attempts safe preprocessing where possible. Intended for educational, prototyping, and light engineering tasks rather than production-scale linear algebra on huge datasets."
        ],
        images: [
            "assets/Projects/Kalkulator_Statis.png",
            "assets/Projects/Kalkulator_Statis_Fitur_Contoh.png",
            "assets/Projects/Kalkulator_Statis_Fitur.png",
            "assets/Projects/Kalkulator_Statis_Hasil.png"
        ],
        techStack: ["HTML5", "CSS3", "JavaScript (Vanilla) + math.js", "GitHub Pages"],
        features: [
            "Multiple matrix methods — eigenvalues & eigenvectors, diagonalization, LU, Cholesky, Doolittle, and Crout decompositions",
            "Text-to-matrix input — paste or type matrices with space-separated elements and newline-separated rows; example presets included",
            "Client-side validation & preprocessing — checks square/symmetric/positive-definite conditions and applies safe preprocessing (symmetrize / small diagonal adjustments) when necessary",
            "Readable numeric output — nicely formatted matrices, eigenvalues and verification blocks (e.g., P × D × P⁻¹, L × U)",
            "User-friendly UX — responsive layout, monospace matrix output, in-place results with success/error/warning messages",
            "No backend required — fully static, easy to host on GitHub Pages or any static host",
            "Robust numeric handling — uses math.js for core numerical routines and includes fallback/extra checks for numerical stability"
        ],
    },
    project4: {
        title: "Streamlit Matrix Calculator",
        description: [
            "This Streamlit Matrix Calculator is an interactive Python application that simplifies matrix analysis for students and engineers. It provides a friendly web interface for computing eigenvalues/eigenvectors, performing diagonalization, and executing multiple matrix factorizations (LU, Cholesky, Doolittle, Crout) using reliable numerical libraries. The app is intended as an educational and demonstration tool that runs locally or on any Streamlit-compatible host.",
            "Users paste or type a matrix in a plain-text area (space-separated numbers, newline-separated rows). They select the desired method from a dropdown and press a single button to run the calculation. The app displays the original (and if applicable, preprocessed) matrix, the decomposition components (P, L, U, D, P⁻¹, etc.), and composition checks (e.g., L × U or P × D × P⁻¹) so users can verify results immediately. Informative messages appear on input errors or numerical failures.",
            "Frontend / UI (Streamlit): apps.py uses Streamlit widgets (st.text_area, st.selectbox, st.button, st.write) to build the interface and control flow. The app organizes computation branches per selected method and prints results in readable matrices and headers.",
            "Computation (NumPy / SciPy): matrix parsing uses numpy.array conversions; eigen computations and diagonalization use numpy.linalg.eig; LU decomposition uses scipy.linalg.lu; Cholesky uses numpy.linalg.cholesky. Several custom implementations (Doolittle, Crout) are implemented directly in Python for pedagogical clarity.",
            "Preprocessing & checks: functions test for squareness, symmetry, and positive-definiteness. For Cholesky, non-symmetric matrices are symmetrized and non-positive-definite matrices are nudged by adding a small diagonal offset to ensure stability before attempting decomposition.",
            "Uses double-precision NumPy/SciPy routines; accurate for moderate-size matrices typical in coursework and demonstrations. For very large matrices or extremely ill-conditioned problems, browser-less high-performance computing (or server-side arbitrary-precision libraries) is recommended. The app includes preprocessing and warns users when a method is likely to fail."
        ],
        images: [
            "assets/Projects/Kalkulator_Python.png",
            "assets/Projects/Kalkulator_Python_Fitur.png",
            "assets/Projects/Kalkulator_Python_Hasil.png"
        ],
        techStack: ["Python", "Streamlit", "NumPy", "SciPy", "Plain-text matrix I/O"],
        features: [
            "Interactive Streamlit UI — simple input area and controls to pick matrix method and run computations with one click",
            "Multiple decomposition & analysis methods — eigenvalues & eigenvectors, diagonalization, LU (with permutation), Cholesky, Doolittle, and Crout",
            "Client-like (interactive) experience in Python — immediate display of input, processed matrix, factors (L, U, P, D, P⁻¹), and verification blocks (e.g., L × U)",
            "Preprocessing for numerical stability — auto-symmetrize and small-diagonal-adjustment routines for Cholesky and positive-definiteness checks",
            "Robust numeric libraries — uses NumPy for array ops and SciPy for LU decomposition (permutation matrix P included)",
            "User-friendly error handling — informative error or warning messages when decomposition fails or input is invalid (non-square, singular, etc.)",
            "Zero-devops demo — run locally with streamlit run apps.py using the provided requirements.txt"
        ],
    },
    project5: {
        title: "Portfolio Website (Beta)",
        description: [
            "Portfolio Website — Beta is a static personal website built as a practical exercise while learning HTML and CSS. The site demonstrates core front-end fundamentals—semantic HTML structure, responsive layout with Bootstrap, modular CSS for spacing and colors, and small JavaScript enhancements for interactivity and animations. It’s designed as a clean one-page portfolio to present a short bio, sample projects, and a contact form.",
            "Visitors land on a hero (jumbotron) with profile image and headline, scroll to read About details, inspect project cards in the Projects section, and send messages via the Contact form. Visual polish is added with scroll-triggered AOS animations and a GSAP-driven animated subtitle to make the interface feel more dynamic. Successful contact submissions trigger a visible alert and reset the form.",
            "Markup & layout: built with HTML5 and Bootstrap 5 components (responsive navbar, container/rows/cols, and card components for projects).",
            "Styling: a concise style.css controls section spacing, background colors, and footer styles—keeps styles easy to read and modify as you learn.",
            "Interactivity: vanilla JS handles form submit via fetch() to a Google Apps Script endpoint, toggles loading/success states, and initializes AOS. GSAP (with TextPlugin) animates hero text and adds entrance effects for key elements.",
            "Current accessibility and ARIA support can be improved (e.g., focus states, aria-labels, and form validations). Next iterations could add lazy-loaded images, a resume download, project detail modals, or a simple CMS for easier content updates."
        ],
        images: [
            "assets/Projects/Portfolio_Website(Beta).png",
            "assets/Projects/Portfolio_Website(Beta)_Mobile.png"
        ],
        techStack: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript (Vanilla)", "AOS", "GSAP (Text-plugin)"],
        features: [
            "Learning-focused build — created as a hands-on exercise to practice HTML and CSS fundamentals while applying Bootstrap components",
            "Responsive layout — mobile-first navbar and Bootstrap grid ensure the site adapts across screen sizes",
            "Hero / jumbotron section — profile photo, large name headline, and animated subtitle powered by GSAP TextPlugin",
            "Modular sections — distinct About, Projects (card gallery), and Contact areas for clear navigation and content discovery",
            "Scroll & entrance animations — AOS provides animated reveals for cards and text to improve perceived polish",
            "Contact form with Google Apps Script integration — client-side form handling posts messages to a Google Apps Script endpoint and shows success feedback",
            "Simple, maintainable CSS — short, focused stylesheet for section spacing and color accents (practice in structuring styles)",
            "Static-hosting friendly — no backend required (perfect for GitHub Pages / Netlify demos)"
        ],
    },
    project6: {
        title: "Automatic Hand Dryer Simulation",
        description: [
            "Hand Dryer Otomatis is a hands-free hand dryer prototype implemented and verified in Proteus. The project combines an embedded microcontroller program (assembly .a51) with a Proteus schematic to simulate a real-world electromechanical device: the system senses a user’s hands, activates a fan for a controlled interval, shows status indicators, and enforces simple safety timeouts.",
            "When a user places hands within the sensor range, the sensor output is read by the microcontroller. The firmware debounces the input, starts a drying timer, and energizes the motor driver. LEDs (or an LCD) provide immediate feedback. After the timer ends, the system switches off the motor and returns to idle. If a fault or unexpected condition occurs (e.g., continuous sensor trigger beyond a safety limit), the firmware stops the motor and shows an error/status.",
            "Firmware: written in 8051 assembly (.a51 source) targeting a standard 8051-family device; implements I/O polling or interrupt-driven sensing, timer routines for drying duration, and output control for motor driver and indicators.",
            "Schematic & simulation: Proteus schematic models the microcontroller, sensor (IR/PIR), power switch (relay/MOSFET), motor (DC motor model), and status LEDs/LCD. Virtual instruments (oscilloscope, logic analyzer) are used for verification and debugging.",
            "Testing approach: run the Proteus simulation with the assembled HEX loaded into the microcontroller; inspect signal waveforms, validate timing, and iterate on firmware timing/logic.",
            "Current implementation is a simulation/prototype — real hardware introduces power, thermal, EMC, and mechanical considerations. Next steps: prototype on real hardware (devboard + driver), add closed-loop motor speed control, implement temperature monitoring, and include energy-saving modes or user-configurable settings."
        ],
        images: [
            "assets/Projects/Rangkaian_HandDryer.png",
            "assets/Projects/SourceCode_HandDryer.png",
        ],
        techStack: ["Proteus", "8051 (Keil .a51 assembly)", "Virtual instruments", "Basic electromechanical components"],
        features: [
            "Automatic detection & activation — sensor input triggers automatic switch-on of the dryer when hands are detected",
            "Timed drying cycle — firmware manages an adjustable timer to run the fan for a fixed duration after detection",
            "Motor power control — microcontroller drives a simulated driver (relay or MOSFET) to energize the fan; includes simple soft-start or fixed PWM (depending on implementation)",
            "Status indicators — LEDs (or an optional LCD) show operational states: idle, drying, fault",
            "Safety & fault handling — basic interlocks in firmware to avoid runaway operation (e.g., maximum-run timeout, sensor debounce)",
            "Proteus-ready testbench — complete schematic and code allow step-through simulation, waveform inspection, and behavior verification using Proteus virtual instruments",
            "Assembly-level firmware — small, efficient .a51 assembly program suitable for teaching embedded concepts (interrupts/polling, I/O, timers)"
        ],
    },
    project7: {
        title: "Automatic Parking System Simulation",
        description: [
            "The Automatic Parking System project is a Proteus-simulated prototype that demonstrates core embedded control for small parking facilities. Firmware is written in 8051 assembly (.a51) and controls sensing, barrier actuation, occupancy counting, and user-facing indicators. The simulation-based approach enables verification of control logic and timing without immediate hardware.",
            "A detecting sensor (simulated IR/ultrasonic/loop input) signals a vehicle arrival. The controller debounces the signal, checks current occupancy, actuates the barrier to allow passage (open → wait → close), updates the occupancy counter, and displays status (e.g., slot available / full). Exit events decrement the counter. If a fault or unusual condition occurs (e.g., actuator runs beyond safe time), the firmware triggers a safe-fail state and notifies via indicators.",
            "Firmware: 8051 assembly implements a lightweight state machine, input debouncing, timer-driven actuator sequences, and display/update routines for occupancy.",
            "Simulation: Proteus schematic models sensors, actuator drivers (relay/MOSFET or servo), display modules, and provides virtual instruments for step debugging. The .hex produced by Keil is loaded into the MCU model for runtime testing.",
            "Testing & iteration: Virtual oscilloscope and logic analyzer logs help tune debounce windows and timeout values; iterative firmware builds are reloaded into Proteus to validate updates.",
            "This is a simulation-first prototype; physical deployment requires attention to power electronics, safety interlocks, mechanical reliability, and EMC. Next steps: migrate firmware to C or a modern MCU (ARM/AVR/ESP), add secure access (RFID/QR), implement network telemetry/dashboard, or produce a hardware prototype with PCB and real sensors/drive stages."
        ],
        images: [
            "assets/Projects/Rangkaian_ParkirOtomatis.png",
            "assets/Projects/SourceCode_ParkirOtomatis.png",
        ],
        techStack: ["Proteus", "8051 (Keil .a51 assembly)", "Common simulated components"],
        features: [
            "Vehicle detection & event handling — simulated sensors trigger entry/exit events with debounce logic",
            "Gate/barrier control — microcontroller-managed actuator sequences (open → wait → close) with safety interlocks",
            "Occupancy tracking — real-time increment/decrement counter for available parking slots and capacity enforcement",
            "User feedback — status shown via LEDs, 7-segment counters or optional LCD messages (available/full/error)",
            "Access & state machine logic — robust entry/exit sequencing, anti-bounce, and basic access checks",
            "Safety/timeouts — configurable maximum actuator runtime and automatic fault handling to prevent stuck states",
            "Proteus testbench & debugging — virtual instruments for waveform/state inspection, enabling repeatable testing before hardware",
            "Didactic assembly code — compact .a51 firmware illustrating low-level embedded topics: timers, I/O, and finite-state machines"
        ],
    }
};

// Project modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('project-modal');
    const lightboxModal = document.getElementById('image-lightbox');
    const closeModalBtn = document.getElementById('close-modal');
    const closeProjectModalBtn = document.getElementById('close-project-modal');
    const closeLightboxBtn = document.getElementById('close-lightbox');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');

    // Open modal when view button is clicked
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    // Add click event to project cards for opening modal
    document.querySelectorAll('.view-project-area').forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if the click wasn't on a button
            if (!e.target.closest('button') && !e.target.closest('a')) {
                const projectId = this.getAttribute('data-project');
                openProjectModal(projectId);
            }
        });
    });

    // Close modal
    closeModalBtn.addEventListener('click', closeProjectModal);
    closeProjectModalBtn.addEventListener('click', closeProjectModal);
    closeLightboxBtn.addEventListener('click', closeLightbox);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Close lightbox when clicking outside
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!lightboxModal.classList.contains('hidden')) {
                closeLightbox();
            } else if (!modal.classList.contains('hidden')) {
                closeProjectModal();
            }
        }
    });

    function openProjectModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        // Update modal content
        document.getElementById('modal-title').textContent = project.title;
        
        // Update project gallery
        const gallery = document.getElementById('project-gallery').querySelector('.grid');
        gallery.innerHTML = '';
        project.images.forEach((image, index) => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'relative group cursor-pointer';
            imgDiv.innerHTML = `
                <img src="${image}" alt="${project.title} - Image ${index + 1}" 
                     class="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="w-full h-48 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 rounded-lg flex items-center justify-center" style="display: none;">
                    <i class="fas fa-image text-4xl text-cyber-blue"></i>
                </div>
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <i class="fas fa-search-plus text-2xl text-white"></i>
                </div>
            `;
            
            // Add click event for lightbox
            imgDiv.addEventListener('click', function() {
                openLightbox(image, `${project.title} - Image ${index + 1}`);
            });
            
            gallery.appendChild(imgDiv);
        });

        // Update description
        const description = document.getElementById('project-description');
        description.innerHTML = '';
        project.description.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            description.appendChild(p);
        });

        // Update tech stack
        const techStack = document.getElementById('project-tech-stack');
        techStack.innerHTML = '';
        project.techStack.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'px-3 py-1 bg-cyber-blue/20 text-cyber-blue rounded-full text-sm';
            span.textContent = tech;
            techStack.appendChild(span);
        });

        // Update features
        const features = document.getElementById('project-features');
        features.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check text-cyber-blue mr-2"></i>${feature}`;
            features.appendChild(li);
        });

        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Reset scroll position to top
        const modalContent = modal.querySelector('.overflow-y-auto');
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
        
        // Alternative method to ensure scroll reset
        setTimeout(() => {
            if (modalContent) {
                modalContent.scrollTop = 0;
            }
        }, 50);
    }

    function closeProjectModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    function openLightbox(imageSrc, caption) {
        const lightboxModal = document.getElementById('image-lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption;
        lightboxModal.classList.remove('hidden');
    }

    function closeLightbox() {
        const lightboxModal = document.getElementById('image-lightbox');
        lightboxModal.classList.add('hidden');
    }
});

// Function to setup event listeners for additional projects
function setupAdditionalProjectListeners() {
    const additionalProjectAreas = document.querySelectorAll('#additional-projects .view-project-area');
    
    additionalProjectAreas.forEach(card => {
        // Remove existing listeners to avoid duplicates
        card.removeEventListener('click', handleProjectAreaClick);
        // Add new listener
        card.addEventListener('click', handleProjectAreaClick);
    });
}

// Separate function for handling project area clicks
function handleProjectAreaClick(e) {
    // Only trigger if the click wasn't on a button
    if (!e.target.closest('button') && !e.target.closest('a')) {
        const projectId = this.getAttribute('data-project');
        // Get the modal elements directly since we're outside the DOMContentLoaded scope
        const modal = document.getElementById('project-modal');
        if (modal && projectsData[projectId]) {
            openProjectModalExternal(projectId);
        }
    }
}

// External version of openProjectModal that can be called from outside DOMContentLoaded
function openProjectModalExternal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    const modal = document.getElementById('project-modal');
    
    // Update modal content
    document.getElementById('modal-title').textContent = project.title;
    
    // Update project gallery
    const gallery = document.getElementById('project-gallery').querySelector('.grid');
    gallery.innerHTML = '';
    project.images.forEach((image, index) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'relative group cursor-pointer';
        imgDiv.innerHTML = `
            <img src="${image}" alt="${project.title} - Image ${index + 1}" 
                 class="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="w-full h-48 bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 rounded-lg flex items-center justify-center" style="display: none;">
                <i class="fas fa-image text-4xl text-cyber-blue"></i>
            </div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <i class="fas fa-search-plus text-2xl text-white"></i>
            </div>
        `;
        
        // Add click event for lightbox
        imgDiv.addEventListener('click', function() {
            openLightboxExternal(image, `${project.title} - Image ${index + 1}`);
        });
        
        gallery.appendChild(imgDiv);
    });

    // Update description
    const description = document.getElementById('project-description');
    description.innerHTML = '';
    project.description.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        description.appendChild(p);
    });

    // Update tech stack
    const techStack = document.getElementById('project-tech-stack');
    techStack.innerHTML = '';
    project.techStack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'px-3 py-1 bg-cyber-blue/20 text-cyber-blue rounded-full text-sm';
        span.textContent = tech;
        techStack.appendChild(span);
    });

    // Update features
    const features = document.getElementById('project-features');
    features.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check text-cyber-blue mr-2"></i>${feature}`;
        features.appendChild(li);
    });

    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Reset scroll position to top
    const modalContent = modal.querySelector('.overflow-y-auto');
    if (modalContent) {
        modalContent.scrollTop = 0;
    }
    
    // Alternative method to ensure scroll reset
    setTimeout(() => {
        if (modalContent) {
            modalContent.scrollTop = 0;
        }
    }, 50);
}

// External version of openLightbox
function openLightboxExternal(imageSrc, caption) {
    const lightboxModal = document.getElementById('image-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = caption;
    lightboxModal.classList.remove('hidden');
}
