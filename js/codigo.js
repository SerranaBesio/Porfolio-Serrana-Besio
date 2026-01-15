// =========================================================
// NAVEGACIÓN Y UTILIDADES PRINCIPALES 
// =========================================================

// --- Scroll suave con offset del header ---
function scrollASeccionConOffset(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 80;
    const offsetPosition = section.offsetTop - headerHeight - 20;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}

// --- Navegación general ---
function navegarAInicio() {
    const detalle = document.getElementById('proyecto-detalle');
    if (detalle) detalle.remove();

    ['hero', 'proyectos', 'sobre-mi', 'proceso'].forEach(id => {
        const seccion = document.getElementById(id);
        if (seccion) seccion.style.display = id === 'hero' ? 'flex' : 'block';
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function volverAProyectos() {
    navegarAInicio();
    setTimeout(() => scrollASeccionConOffset('proyectos'), 100);
}

// --- Configurar navegación del header ---
function configurarNavegacionHeader() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', e => {
            e.preventDefault();
            navegarAInicio();
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const id = link.getAttribute('href').replace('#', '');
            if (document.getElementById('proyecto-detalle')) {
                navegarAInicio();
                setTimeout(() => scrollASeccionConOffset(id), 100);
            } else {
                scrollASeccionConOffset(id);
            }
        });
    });

    const heroBtn = document.querySelector('.hero-btn a');
    if (heroBtn) {
        heroBtn.addEventListener('click', e => {
            e.preventDefault();
            const id = heroBtn.getAttribute('href').replace('#', '');
            scrollASeccionConOffset(id);
        });
    }
}

// --- Header scroll behavior ---
function manejarScrollHeader() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });
}

// --- Acordeón de proceso ---
function inicializarAcordeonProceso() {
    document.querySelectorAll('.proceso-item').forEach(item => {
        const boton = item.querySelector('.proceso-boton');
        const contenido = item.querySelector('.proceso-contenido');
        if (!boton || !contenido) return;

        boton.setAttribute('aria-expanded', 'false');
        contenido.setAttribute('aria-hidden', 'true');

        boton.addEventListener('click', () => {
            const activo = item.classList.toggle('activo');
            boton.setAttribute('aria-expanded', activo);
            contenido.setAttribute('aria-hidden', !activo);
        });
    });
}

// =========================================================
// FORMULARIO DE CONTACTO + MODAL DE ÉXITO
// =========================================================

function inicializarFormularioContacto() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('.submit-btn');
    const errorMsg = form.querySelector('.form-error');
    const modal = document.getElementById('formModal');
    const modalClose = document.getElementById('modalClose');

    // Focus visual
    form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (!input.value.trim()) input.parentElement.classList.remove('focused');
        });
    });

    // Validación básica de email
    const emailInput = form.querySelector('#email');
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
            emailInput.style.borderColor = valid || !emailInput.value ? '' : '#dc3545';
        });
    }



    // Modal de éxito
    if (modal && modalClose) {
        const cerrarModal = () => {
            modal.classList.remove('visible');
            form.reset();
        };

        modalClose.addEventListener('click', cerrarModal);
        modal.addEventListener('click', e => e.target === modal && cerrarModal());
        document.addEventListener('keydown', e => e.key === 'Escape' && modal.classList.contains('visible') && cerrarModal());
    }
}

function mostrarModalExito() {
    const modal = document.getElementById('formModal');
    if (!modal) return;
    modal.classList.add('visible');
    setTimeout(() => modal.classList.remove('visible'), 4000);
}

// =========================================================
// MENÚ MÓVIL
// =========================================================

function inicializarMenuMovil() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
}

// =========================================================
// INICIALIZACIÓN GLOBAL
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    configurarNavegacionHeader();
    manejarScrollHeader();
    inicializarAcordeonProceso();
    inicializarFormularioContacto();
    inicializarMenuMovil();
});
