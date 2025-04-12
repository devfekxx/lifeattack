// Cyberpunk Grid Effect
function createCyberGrid() {
    const grid = document.querySelector('.cyber-grid');
    const gridSize = 50;
    
    for (let i = 0; i < gridSize; i++) {
        const line = document.createElement('div');
        line.className = 'grid-line';
        line.style.setProperty('--delay', `${Math.random() * 2}s`);
        grid.appendChild(line);
    }
}

// Glitch Effect
function createGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;

    setInterval(() => {
        glitchText.style.textShadow = `
            ${Math.random() * 10}px ${Math.random() * 10}px ${Math.random() * 10}px rgba(0,255,157,0.7),
            ${Math.random() * -10}px ${Math.random() * -10}px ${Math.random() * 10}px rgba(255,0,255,0.7)
        `;
        
        setTimeout(() => {
            glitchText.style.textShadow = 'var(--neon-glow)';
        }, 100);
    }, 3000);
}

// Cyber Lines Animation
function createCyberLines() {
    const cyberLines = document.querySelector('.cyber-lines');
    if (!cyberLines) return;

    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'cyber-line';
        line.style.setProperty('--delay', `${Math.random() * 5}s`);
        line.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        cyberLines.appendChild(line);
    }
}

// Smooth Scrolling für Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Transparenz beim Scrollen
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
});

// Animation für Skill Cards beim Scrollen
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// iMessage Animation
document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelectorAll('.message');
    
    messages.forEach((message, index) => {
        message.style.opacity = '0';
        message.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            message.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            message.style.opacity = '1';
            message.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });
});

// Initialize Effects
document.addEventListener('DOMContentLoaded', () => {
    createCyberGrid();
    createGlitchEffect();
    createCyberLines();
});

// DOM-Elemente laden
document.addEventListener('DOMContentLoaded', () => {
    // Persönliche Informationen einfügen
    document.getElementById('hero-name').textContent = config.personalInfo.name;
    document.getElementById('hero-title').textContent = config.personalInfo.title;
    document.getElementById('hero-subtitle').textContent = config.personalInfo.subtitle;

    // Über mich Nachrichten einfügen
    const aboutMessages = document.getElementById('about-messages');
    config.personalInfo.about.forEach((message, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${index % 2 === 0 ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        aboutMessages.appendChild(messageDiv);
    });

    // Projekte einfügen
    const projectsContainer = document.getElementById('projects-container');
    config.projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });

    // Social Links einfügen
    const socialLinks = document.getElementById('social-links');
    config.contact.social.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.className = 'social-link';
        link.target = '_blank';
        link.innerHTML = `<i class="fab fa-${social.platform}"></i>`;
        socialLinks.appendChild(link);
    });

    // Modal Event Listener
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Projektkarte erstellen
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <img src="${project.images[0]}" alt="${project.title}" class="project-image">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.shortDescription}</p>
            <div class="project-tags">
                ${project.technologies.slice(0, 3).map(tech => 
                    `<span class="project-tag">${tech}</span>`
                ).join('')}
            </div>
        </div>
    `;

    card.addEventListener('click', () => showProjectModal(project));
    return card;
}

// Projekt Modal anzeigen
function showProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const carousel = document.getElementById('project-carousel');
    const carouselDots = document.getElementById('carousel-dots');
    const projectDescription = document.getElementById('modal-description');
    const technologies = document.getElementById('modal-technologies');
    const githubLink = document.getElementById('github-link');
    const liveLink = document.getElementById('live-link');

    // Modal Titel setzen
    modalTitle.textContent = project.title;

    // Carousel Bilder einfügen
    carousel.innerHTML = '';
    carouselDots.innerHTML = '';
    project.images.forEach((image, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.innerHTML = `<img src="${image}" alt="${project.title}">`;
        carousel.appendChild(carouselItem);

        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => showCarouselSlide(index));
        carouselDots.appendChild(dot);
    });

    // Projekt Details einfügen
    projectDescription.textContent = project.detailedDescription;

    // Technologien einfügen
    technologies.innerHTML = project.technologies.map(tech =>
        `<span class="technology-tag">${tech}</span>`
    ).join('');

    // Links einfügen
    if (project.github) {
        githubLink.href = project.github;
        githubLink.style.display = 'inline-block';
    } else {
        githubLink.style.display = 'none';
    }

    if (project.demo) {
        liveLink.href = project.demo;
        liveLink.style.display = 'inline-block';
    } else {
        liveLink.style.display = 'none';
    }

    // Modal anzeigen
    modal.style.display = 'block';
    currentSlide = 0;
    updateCarousel();
}

// Carousel Funktionalität
let currentSlide = 0;

function showCarouselSlide(index) {
    const carousel = document.getElementById('project-carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    
    currentSlide = index;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function updateCarousel() {
    const carousel = document.getElementById('project-carousel');
    const dots = document.querySelectorAll('.carousel-dot');
    
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Carousel Navigation
document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
    const totalSlides = document.querySelectorAll('.carousel-item').length;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

document.querySelector('.carousel-btn.next').addEventListener('click', () => {
    const totalSlides = document.querySelectorAll('.carousel-item').length;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}); 