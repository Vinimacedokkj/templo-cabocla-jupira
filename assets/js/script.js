// Carrossel de Imagens
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(n) {
    if (totalSlides === 0) return;
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = (n + totalSlides) % totalSlides;
    
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

// Mantém nome para uso no HTML (onclick="currentSlide(1)")
function currentSlide(n) {
    showSlide(n - 1);
}

// Auto-play do carrossel
function autoPlay() {
    changeSlide(1);
}

// Iniciar auto-play a cada 5 segundos (somente se houver slides)
let slideInterval = null;
const carousel = document.querySelector('.carousel-container');
if (totalSlides > 0) {
    slideInterval = setInterval(autoPlay, 5000);
}

// Pausar auto-play quando hover (somente se carrossel existir)
if (carousel && slideInterval) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(autoPlay, 5000);
    });
}

// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fechar todos os itens
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Abrir o item clicado se não estiver ativo
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Formulário de Contato
const contatoForm = document.getElementById('contatoForm');

contatoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = new FormData(contatoForm);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!data.nome || !data.email || !data.assunto || !data.mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Simular envio (aqui você integraria com um backend real)
    console.log('Dados do formulário:', data);
    
    // Mostrar mensagem de sucesso
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Limpar formulário
    contatoForm.reset();
});

// Scroll suave para links internos
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

// Efeito de scroll no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(1, 105, 1, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--verde-principal), var(--azul-principal))';
        header.style.backdropFilter = 'none';
    }
});

// Animação de entrada dos elementos
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

// Observar elementos para animação
document.querySelectorAll('.gira-card, .evento-card, .faq-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Validação de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validação de telefone brasileiro
function validatePhone(phone) {
    const re = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return re.test(phone);
}

// Máscara para telefone
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
        if (value.length >= 10) {
            value = value.slice(0, 10) + '-' + value.slice(10, 14);
        }
        e.target.value = value;
    });
}

// Loading inicial
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar carrossel
    if (slides.length > 0 && indicators.length > 0) {
        slides[0].classList.add('active');
        indicators[0].classList.add('active');
    }
    
    // Adicionar classe de loading removida
    document.body.classList.add('loaded');

    // Tabs de Mídia (Fotos/Vídeos)
    const mediaTabs = document.querySelectorAll('.media-tab');
    const panels = {
        fotos: document.getElementById('painel-fotos'),
        videos: document.getElementById('painel-videos')
    };
    if (mediaTabs.length > 0) {
        mediaTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                mediaTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const tabName = tab.getAttribute('data-tab');
                Object.values(panels).forEach(p => p && p.classList.remove('active'));
                if (panels[tabName]) panels[tabName].classList.add('active');
            });
        });
    }

    // Lightbox de mídia
    const lightbox = document.getElementById('lightbox');
    const lightboxBody = lightbox ? lightbox.querySelector('.lightbox-body') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxBackdrop = lightbox ? lightbox.querySelector('.lightbox-backdrop') : null;

    function openLightbox(contentNode) {
        if (!lightbox || !lightboxBody) return;
        lightboxBody.innerHTML = '';
        lightboxBody.appendChild(contentNode);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox || !lightboxBody) return;
        lightbox.classList.remove('active');
        lightboxBody.innerHTML = '';
        document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Delegação de clique para abrir mídia
    document.body.addEventListener('click', (e) => {
        const card = e.target.closest('.media-card');
        if (!card) return;
        const type = card.getAttribute('data-type');
        const src = card.getAttribute('data-src');
        if (!type || !src) return;
        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            img.alt = card.getAttribute('aria-label') || 'Imagem';
            openLightbox(img);
        } else if (type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            iframe.setAttribute('allowfullscreen', 'true');
            openLightbox(iframe);
        }
    });
});

// Função para mostrar/ocultar seções baseado no scroll
function handleScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < windowHeight - sectionVisible) {
            section.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);

// Função para destacar link ativo no menu
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Função para voltar ao topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Adicionar botão de voltar ao topo
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(45deg, var(--verde-principal), var(--azul-principal));
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', scrollToTop);

// Mostrar/ocultar botão baseado no scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});
