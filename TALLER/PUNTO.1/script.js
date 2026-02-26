const galeria = document.getElementById('galeria');
const buscador = document.getElementById('buscador');
const boton = document.getElementById('cargarMas');
const filtroAlbum = document.getElementById('filtroAlbum');
const orden = document.getElementById('orden');

const modal = document.getElementById('modal');
const imagenGrande = document.getElementById('imagenGrande');
const tituloModal = document.getElementById('tituloModal');
const cerrar = document.getElementById('cerrar');

let limite = 50;
let fotosTotales = [];
let textoBusqueda = '';
let albumSeleccionado = 'todos';
let tipoOrden = 'asc';

async function cargarFotos() {
    try {
        boton.disabled = true;
        boton.textContent = 'Cargando...';
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limite}`);
        if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
        fotosTotales = await respuesta.json();
        cargarOpcionesAlbum();
        aplicarFiltro();
    } catch (error) {
        galeria.innerHTML = "<p>Error al cargar las fotos.</p>";
    } finally {
        boton.disabled = false;
        boton.textContent = 'Cargar album';
    }
}

function mostrarFotos(fotos) {
    galeria.innerHTML = "";

    fotos.forEach(foto => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${foto.thumbnailUrl}" alt="${foto.title}">
            <h3>${foto.title}</h3>
            <p><strong>ID:</strong> ${foto.id}</p>
            <p><strong>Álbum:</strong> ${foto.albumId}</p>
        `;

        card.addEventListener('click', () => {
            imagenGrande.src = foto.url;
            tituloModal.textContent = `ID ${foto.id} · Álbum ${foto.albumId} · ${foto.title}`;
            modal.style.display = "flex";
        });

        galeria.appendChild(card);
    });
}

function aplicarFiltro() {
    let filtradas = fotosTotales.filter((foto) =>
        foto.title.toLowerCase().includes(textoBusqueda)
    );

    if (albumSeleccionado !== 'todos') {
        filtradas = filtradas.filter((foto) =>
            String(foto.albumId) === albumSeleccionado
        );
    }

    filtradas.sort((a, b) => {
        if (tipoOrden === 'asc') return a.id - b.id;
        return b.id - a.id;
    });

    mostrarFotos(filtradas);
}

function cargarOpcionesAlbum() {
    const albumes = [...new Set(fotosTotales.map((foto) => foto.albumId))].sort((a, b) => a - b);

    const opcionesActuales = new Set(
        Array.from(filtroAlbum.options).map((opcion) => opcion.value)
    );

    albumes.forEach((albumId) => {
        const valor = String(albumId);
        if (!opcionesActuales.has(valor)) {
            const opcion = document.createElement('option');
            opcion.value = valor;
            opcion.textContent = `Álbum ${valor}`;
            filtroAlbum.appendChild(opcion);
        }
    });
}

// Buscador
buscador.addEventListener('input', () => {
    textoBusqueda = buscador.value.toLowerCase();
    aplicarFiltro();
});

filtroAlbum.addEventListener('change', () => {
    albumSeleccionado = filtroAlbum.value;
    aplicarFiltro();
});

orden.addEventListener('change', () => {
    tipoOrden = orden.value;
    aplicarFiltro();
});

// Cargar más
boton.addEventListener('click', () => {
    limite += 50;
    cargarFotos();
});

// Cerrar modal
cerrar.addEventListener('click', () => {
    modal.style.display = "none";
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

cargarFotos();