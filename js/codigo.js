// =========================================================
// UTILIDADES
// =========================================================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
});

window.addEventListener('load', () => {
    loader.classList.add('loaded');        // dispara la animación de entrada
    setTimeout(() => loader.classList.add('hidden-loader'), 1400); // lo oculta
  });


console.log(document.querySelector('header').innerHTML)



function scrollASeccion(id) {
    const section = document.getElementById(id);
    if (!section) return;
    const headerH = document.querySelector('header')?.offsetHeight ?? 80;
    window.scrollTo({ top: section.offsetTop - headerH - 20, behavior: 'smooth' });
}

// =========================================================
// NAVEGACIÓN
// =========================================================

function navegarAInicio() {
    document.getElementById('proyecto-detalle')?.remove();

    ['proyectos', 'sobre-mi'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'block';
    });

    const hero = document.querySelector('.hero');
    if (hero) hero.style.display = 'flex';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function volverAProyectos() {
    navegarAInicio();
    setTimeout(() => scrollASeccion('proyectos'), 100);
}

function configurarNavegacionHeader() {
    document.querySelector('.logo')?.addEventListener('click', e => {
        e.preventDefault();
        navegarAInicio();
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const id = link.getAttribute('href').replace('#', '');
            if (document.getElementById('proyecto-detalle')) {
                navegarAInicio();
                setTimeout(() => scrollASeccion(id), 100);
            } else {
                scrollASeccion(id);
            }
        });
    });
}

// =========================================================
// HEADER SCROLL
// =========================================================

function manejarScrollHeader() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 100);
    }, { passive: true });
}

// =========================================================
// FORMULARIO DE CONTACTO
// =========================================================

function inicializarFormularioContacto() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('.submit-btn');
    const errorMsg  = form.querySelector('.form-error');
    const modal     = document.getElementById('formModal');
    const modalClose = document.getElementById('modalClose');

    // Validación visual del email
    const emailInput = form.querySelector('#email');
    emailInput?.addEventListener('blur', () => {
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
        emailInput.style.borderColor = valid || !emailInput.value ? '' : '#dc3545';
    });

    // Envío
    form.addEventListener('submit', async e => {
        e.preventDefault();
        errorMsg?.classList.remove('visible');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new FormData(form)
            });

            if (res.ok) {
                modal?.classList.add('visible');
                form.reset();
                if (emailInput) emailInput.style.borderColor = '';
            } else {
                errorMsg?.classList.add('visible');
            }
        } catch {
            errorMsg?.classList.add('visible');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar';
        }
    });

    // Modal
    if (modal && modalClose) {
        const cerrar = () => modal.classList.remove('visible');
        modalClose.addEventListener('click', cerrar);
        modal.addEventListener('click', e => e.target === modal && cerrar());
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && modal.classList.contains('visible')) cerrar();
        });
    }
}

// =========================================================
// MENÚ MÓVIL
// =========================================================

function inicializarMenuMovil() {
    const toggle   = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        const open = toggle.classList.toggle('active');
        navLinks.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', open);
        
        // Bloquea el scroll cuando el menú está abierto
        document.body.style.overflow = open ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            toggle.setAttribute('aria-expanded', false);
            document.body.style.overflow = '';  // ← restaura el scroll
        });
    });
}


// =========================================================
// INIT
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    configurarNavegacionHeader();
    manejarScrollHeader();
    inicializarFormularioContacto();
    inicializarMenuMovil();
});










