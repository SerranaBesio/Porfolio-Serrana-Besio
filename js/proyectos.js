// ---------------------------------------------------------
// BASE DE DATOS DE PROYECTOS
// ---------------------------------------------------------
const proyectos = [
    {
        id: 1,
        nombre: "Blau",
        categoria: "Diseño Web",
        enlaceDemo: "https://ecommerceblau.netlify.app/",
        imagen: "imagenes/blau1.jpg",
        descripcionCorta: "Blau es un e-commerce responsivo para una marca de accesorios, diseñado para ofrecer una experiencia de compra clara, intuitiva y visualmente atractiva. <br><br>Se desarrolló una identidad visual y una interfaz limpia que prioriza el producto, con una navegación fluida y una estructura coherente con los valores de simplicidad y elegancia.",
        imagenes: ["imagenes/blau-mockup.png", "imagenes/blau-mockup-cel.png"],
    },

    {
        id: 2,
        nombre: "Juceca",
        categoria: "Diseño editorial",
        imagen: "imagenes/juceca.png",
        descripcionCorta: `Proyecto basado en la obra de Juceca que desarrolla el concepto “Historias para no creer”, inspirado en el carácter absurdo y humorístico de sus relatos.<br><br>

La propuesta combina ilustraciones vibrantes y composiciones exageradas para reinterpretar su universo desde un lenguaje visual contemporáneo, irónico y dinámico.`,        
        imagenes: ["imagenes/juceca.png", "imagenes/juceca2.png", "imagenes/marcalibro.png", "imagenes/juceca4.png"],
    },

    {
        id: 3,
        nombre: "Ruben Rada",
        categoria: "Identidad visual",
        enlaceDemo: "https://landingrubenrada.netlify.app/",
        enlaceBehance: "https://www.behance.net/gallery/249030747/Ruben-Rada-Diseno-de-Vinilo",
        imagen: "imagenes/rada-remera.png",
       descripcionCorta: `Proyecto desarrollado junto a Matilde Braga.<br><br>

Diseño de tapa y contratapa de vinilo para Rubén Rada, acompañado por piezas promocionales y un sitio web que amplía la propuesta visual y sonora.<br><br>

El concepto “Origen” se construye a partir de su universo musical, tomando el candombe como raíz rítmica y la identidad como su expresión, tanto individual como colectiva.<br><br>`
,
        imagenes: ["imagenes/rada1.png", "imagenes/rada2.png"],
    },

    
    {
        id: 4,
        nombre: "Wasabi",
        categoria: "Identidad visual",
        enlaceBehance:"https://www.behance.net/gallery/248902027/Wasabi-Apertura-de-sistema",
        imagen: "imagenes/wasabi-hero.png",
        descripcionCorta: `Proyecto de desarrollo y ampliación del sistema identitario de Wasabi.<br><br>

A partir del análisis de su identidad, historia y públicos, se definieron nuevos lineamientos comunicacionales para actualizar el sistema de marca.

Se desarrolló una identidad con aplicaciones clave que incluyen un mural institucional como pieza central dentro del espacio.`,
        imagenes: ["imagenes/wasabi-canguro.png", "imagenes/wasabi-stickers.png", "imagenes/wasabi-vaso.png",  "imagenes/wasabi-gorro.png"],
},

{
    id: 5,
    nombre: "Milton Glaser",
    categoria: "Diseño Editorial",
    imagen: "imagenes/glaser-mockup.png",
    descripcionCorta: `Diseño editorial del artículo “10 cosas que aprendí” de Milton Glaser.<br><br>

Se desarrolló un folleto que integra una síntesis conceptual de su pensamiento junto a imágenes representativas de su obra. La propuesta trabaja la composición tipográfica, la jerarquía visual y la relación entre texto e imagen, retomando su estética vibrante y su uso característico del color.

El resultado es una pieza clara y dinámica, pensada para una lectura ágil y una experiencia visual coherente con su universo como diseñador.`,
    imagenes: ["imagenes/glaser-1.png", "imagenes/glaser-2.png"],

},
{
    id: 6,
    nombre: "Ambar",
    categoria: "Diseño web",
    enlaceDemo: "https://ambardecoracion.netlify.app/",
    imagen: "imagenes/ambar-hero.jpg",
    descripcionCorta: `Diseño y desarrollo del sitio web Ámbar, una tienda especializada en decoración de interiores.<br><br>

A partir de un layout base, se desarrolló una propuesta responsiva centrada en la experiencia de usuario y la coherencia visual, buscando reflejar la calidez y sofisticación de la marca.

Se priorizó una interfaz limpia y elegante, con una paleta cromática cálida y una tipografía clara, construyendo una navegación simple y una experiencia visual equilibrada.`,
    imagenes: ["imagenes/ambar-pc.png", "imagenes/ambar-cel.png"],
}
];


// FUNCIÓN PRINCIPAL: GENERAR PROYECTOS EN LA GRID
function generarProyectos() {
    const grid = document.getElementById('proyectos-grid');
    if (!grid) return;

    grid.innerHTML = '';

    proyectos.slice(0, 6).forEach((proyecto, i) => {
        grid.insertAdjacentHTML('beforeend', `
            <div class="proyecto-card fade-in"
                 style="animation-delay: ${0.3 + i * 0.1}s"
                 data-proyecto-id="${proyecto.id}">
                <div class="proyecto-imagen-container">
                    <img src="${proyecto.imagen}" alt="${proyecto.nombre}" class="proyecto-imagen" loading="lazy">
                    <div class="proyecto-overlay">
                        <span class="proyecto-overlay-nombre">${proyecto.nombre}</span>
                    </div>
                </div>
            </div>
        `);
    });

    grid.querySelectorAll('.proyecto-card').forEach(card => {
        card.addEventListener('click', () => mostrarDetalleProyecto(card.dataset.proyectoId));
    });
}

// ---------------------------------------------------------
// MOSTRAR DETALLE DEL PROYECTO SELECCIONADO 
// ---------------------------------------------------------
function mostrarDetalleProyecto(proyectoId) {
    // Ocultar secciones principales (hero, proyectos, sobre-mi)
    
    // Por ID
    const seccionesPorId = ['proyectos', 'sobre-mi',];
    seccionesPorId.forEach(id => {
        const seccion = document.getElementById(id);
        if (seccion) seccion.style.display = 'none';
    });
    
    // Por clase (hero)
    const hero = document.querySelector('.hero');
    if (hero) hero.style.display = 'none';


    // Eliminar detalle anterior si existe
    const detalleExistente = document.getElementById('proyecto-detalle');
    if (detalleExistente) detalleExistente.remove();

    // Crear nueva sección de detalle
    const detalleSection = document.createElement('section');
    detalleSection.id = 'proyecto-detalle';
    detalleSection.innerHTML = generarHTMLDetalle(proyectoId);

    // Insertar antes del contacto
    const contactoSection = document.getElementById('contacto');
    if (contactoSection) {
        document.body.insertBefore(detalleSection, contactoSection);
    } else {
        document.body.appendChild(detalleSection);
    }

    // Forzar header con fondo activo
    const header = document.querySelector('header');
    if (header) header.classList.add('scrolled');

    // Scroll hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------------------------------------------------------
// INICIALIZAR GRID DE PROYECTOS AL CARGAR EL DOM
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', generarProyectos);
