// Typing Effect
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const words = ['Software Developer', 'Gamer', 'Tech Enthusiast', 'Anime Lover'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    
    typedTextSpan.textContent = currentChar;
    
    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeEffect, 1200);
    }
}

// Iniciar efecto de typing cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling para los links de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active link highlighting mientras se hace scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Inicializar Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6c5ce7'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6c5ce7',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Animación para las skill items
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const skill = item.getAttribute('data-skill');
        showNotification(`Aprendiendo ${skill}`);
    });
});

// Función para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient-1);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        animation: slideIn 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Añadir estilos para las notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Formulario de contacto
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aquí puedes agregar la lógica para enviar el formulario
    // Por ahora solo mostraremos un mensaje de éxito
    
    showNotification('¡Mensaje enviado con éxito!');
    contactForm.reset();
});

// Intersection Observer para animaciones al hacer scroll
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

// Aplicar observer a todas las secciones y elementos
document.querySelectorAll('section, .skill-item, .project-card, .info-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Efecto de parallax en el home
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const homeImage = document.querySelector('.profile-gif');
    
    if (homeImage) {
        homeImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Preloader (opcional)
window.addEventListener('load', () => {
    // Ocultar preloader si existe
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    // Animación de entrada
    document.body.style.animation = 'fadeIn 1s ease';
});

// Detectar cambios en la conexión
window.addEventListener('online', () => {
    showNotification('¡Conexión restablecida!');
});

window.addEventListener('offline', () => {
    showNotification('Sin conexión a internet');
});

// Función para copiar al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('¡Copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// Agregar evento de copia a los contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const url = item.getAttribute('href');
        if (url && !url.startsWith('#')) {
            e.preventDefault();
            copyToClipboard(url);
        }
    });
});