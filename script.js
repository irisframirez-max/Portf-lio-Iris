// ========================================
// MENU MOBILE
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

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

// ========================================
// FORM SUBMISSION
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obter valores do formulário
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const mentoria = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;

        // Validar campos
        if (!name || !email || !mentoria || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Criar mensagem para WhatsApp ou Email
        const whatsappNumber = '5511967570501';
        const whatsappMessage = `Olá Iris! Meu nome é ${name}. Estou interessado(a) em: ${mentoria}. Mensagem: ${message}. Contato: ${email}`;
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // Abrir WhatsApp
        window.open(whatsappLink, '_blank');

        // Limpar formulário
        this.reset();

        // Mostrar mensagem de sucesso
        alert('Obrigado! Você será redirecionado para o WhatsApp. Se preferir, também pode enviar um email para iris.f.ramirez@gmail.com');
    });
}

// ========================================
// ANIMAÇÃO DE SCROLL
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.mentoria-card, .case-card, .metodologia-step, .expertise-column').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// NAVBAR STICKY EFFECT
// ========================================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ========================================
// ATIVAR LINK ATIVO NA NAVEGAÇÃO
// ========================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// CONTADOR DE NÚMEROS (ANIMADO)
// ========================================

const animateCounters = () => {
    const counters = document.querySelectorAll('.highlight-card h3');
    const speed = 200;

    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        const increment = target / speed;

        const updateCount = () => {
            const count = parseInt(counter.innerText);

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
};

// Executar animação quando a seção About entra em vista
const aboutSection = document.querySelector('.about');
let hasAnimated = false;

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// ========================================
// EFEITO PARALLAX
// ========================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ========================================
// TOOLTIP HOVER
// ========================================

document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function () {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = '#2c3e50';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '0.85rem';
        tooltip.style.zIndex = '1000';
        tooltip.style.whiteSpace = 'nowrap';
        document.body.appendChild(tooltip);

        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';

        this.addEventListener('mouseleave', () => {
            tooltip.remove();
        });
    });
});

// ========================================
// DARK MODE TOGGLE (OPCIONAL)
// ========================================

const darkModeToggle = document.querySelector('.dark-mode-toggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Verificar preferência salva
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// ========================================
// VALIDAÇÃO DE EMAIL
// ========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// CONSOLE LOG PARA DEBUG
// ========================================

console.log('%cPortfólio Iris Fornaciari', 'color: #3498db; font-size: 20px; font-weight: bold;');
console.log('%cMentora Estratégica | Pesquisa de Comportamento | Estratégia Orientada por Dados', 'color: #2c3e50; font-size: 14px;');
console.log('%cTransformando curiosidade em método e dados em visão.', 'color: #7f8c8d; font-size: 12px; font-style: italic;');
