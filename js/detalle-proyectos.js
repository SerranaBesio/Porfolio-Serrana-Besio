// =========================================================
// GENERAR HTML DEL DETALLE DE PROYECTO
// =========================================================

function generarHTMLDetalle(proyectoId) {
    const proyecto       = proyectos.find(p => p.id == proyectoId);
    const proyectoIndex  = proyectos.findIndex(p => p.id == proyectoId);
    const anterior       = proyectos[proyectoIndex - 1];
    const siguiente      = proyectos[proyectoIndex + 1];

    const imagenPrincipal = proyecto.imagen
        ?? proyecto.imagenes?.[0]
        ?? '';

        const galeria = proyecto.imagenes ?? [];


    const galeriaHTML = galeria.length ? `
        <div class="project-gallery">
            <span class="gallery-label">Imágenes del proyecto</span>
            <div class="gallery-grid">
                ${galeria.map((item, i) => {
                    const src   = typeof item === 'string' ? item : item.src;
                    const clase = typeof item === 'string' ? '' : (item.clase ?? '');
                    return `
                        <div class="gallery-item ${clase}">
                            <img src="${src}" alt="${proyecto.nombre} — imagen ${i + 1}" loading="lazy">
                        </div>`;
                }).join('')}
            </div>
        </div>` : '';

    // Metadata derecha
    const metaItems = [
        proyecto.categoria && `
            <div class="meta-item">
                <span class="meta-label">Categoría</span>
                <span class="meta-valor">${proyecto.categoria}</span>
            </div>`,
        proyecto.enlaceDemo && `
            <div class="meta-item">
                <span class="meta-label">Sitio web</span>
                <a href="${proyecto.enlaceDemo}" target="_blank" rel="noopener noreferrer" class="list-item-link">
                    Ver proyecto <span class="arrow">→</span>
                </a>
            </div>`,
        proyecto.enlaceBehance && `
            <div class="meta-item">
                <span class="meta-label">Behance</span>
                <a href="${proyecto.enlaceBehance}" target="_blank" rel="noopener noreferrer" class="list-item-link">
                    Ver en Behance <span class="arrow">→</span>
                </a>
            </div>`,
    ].filter(Boolean).join('');

    // Navegación entre proyectos
    const navAnterior = anterior
        ? `<a href="#" onclick="mostrarDetalleProyecto(${anterior.id}); return false;" class="nav-link prev">${anterior.nombre}</a>`
        : '<div></div>';

    const navSiguiente = siguiente
        ? `<a href="#" onclick="mostrarDetalleProyecto(${siguiente.id}); return false;" class="nav-link next">${siguiente.nombre}</a>`
        : '<div></div>';

    return `
        <div class="project-detail">

            <div class="project-hero-full">
                <div class="project-hero-image-full">
                    <img src="${imagenPrincipal}" alt="${proyecto.nombre}">
                </div>
                <div class="project-hero-overlay-full">
                    <div class="project-hero-content-full">
                        <h1 class="project-title-overlay-full">${proyecto.nombre}</h1>
                    </div>
                </div>
            </div>

            <div class="project-content-wrapper">
                <div class="project-container">
                    <div class="project-two-columns">
                        <div class="project-col-left">
                            <div class="project-description">
                                <span class="gallery-label">Descripción del proyecto</span>
                                <p>${proyecto.descripcionCorta ?? proyecto.descripcion}</p>
                            </div>
                        </div>
                        <div class="project-col-right">
                            <div class="project-right-list">${metaItems}</div>
                        </div>
                    </div>
                    ${galeriaHTML}
                </div>
            </div>

            <div class="project-navigation">
                <div class="project-container">
                    <div class="project-nav-links">
                        ${navAnterior}
                        <a href="#" onclick="volverAProyectos(); return false;" class="nav-link back">Volver</a>
                        ${navSiguiente}
                    </div>
                </div>
            </div>

        </div>`;
}
