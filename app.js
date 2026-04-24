const API_URL = "https://proyecto-full-stack-backend-21151.onrender.com";

let pagina = 1;
const limite = 6;
let totalSeries = 0;
let seriesActuales = [];

const listaSeries = document.getElementById("listaSeries");
const formulario = document.getElementById("formularioSerie");
const contador = document.getElementById("contador");
const paginaActual = document.getElementById("paginaActual");

const serieId = document.getElementById("serieId");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const genero = document.getElementById("genero");
const temporadas = document.getElementById("temporadas");
const imagen = document.getElementById("imagen");

const busqueda = document.getElementById("busqueda");
const orden = document.getElementById("orden");
const direccion = document.getElementById("direccion");

document.getElementById("btnBuscar").addEventListener("click", () => {
  pagina = 1;
  cargarSeries();
});

document.getElementById("btnAnterior").addEventListener("click", () => {
  if (pagina > 1) {
    pagina--;
    cargarSeries();
  }
});

document.getElementById("btnSiguiente").addEventListener("click", () => {
  if (pagina * limite < totalSeries) {
    pagina++;
    cargarSeries();
  }
});

document.getElementById("btnCancelar").addEventListener("click", limpiarFormulario);
document.getElementById("btnCSV").addEventListener("click", exportarCSV);

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const datosSerie = {
    nombre: nombre.value.trim(),
    descripcion: descripcion.value.trim(),
    genero: genero.value.trim(),
    temporadas: Number(temporadas.value),
    imagen: imagen.value.trim()
  };

  if (serieId.value) {
    await editarSerie(serieId.value, datosSerie);
  } else {
    await crearSerie(datosSerie);
  }

  limpiarFormulario();
  cargarSeries();
});

async function cargarSeries() {
  listaSeries.innerHTML = "<p>Cargando series...</p>";

  const parametros = new URLSearchParams({
    page: pagina,
    limit: limite,
    q: busqueda.value.trim(),
    sort: orden.value,
    order: direccion.value
  });

  try {
    const respuesta = await fetch(`${API_URL}/series?${parametros.toString()}`);
    const resultado = await respuesta.json();

    seriesActuales = resultado.data;
    totalSeries = resultado.total;

    mostrarSeries(seriesActuales);
    contador.textContent = `${totalSeries} series en total`;
    paginaActual.textContent = `Página ${pagina}`;
  } catch (error) {
    listaSeries.innerHTML = "<p>No se pudo conectar con la API.</p>";
  }
}

function mostrarSeries(series) {
  listaSeries.innerHTML = "";

  if (series.length === 0) {
    listaSeries.innerHTML = "<p>No hay series para mostrar.</p>";
    return;
  }

  series.forEach((serie) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <img src="${serie.imagen}" alt="${serie.nombre}">
      <div class="card-contenido">
        <h3>${serie.nombre}</h3>
        <p class="meta">${serie.genero} · ${serie.temporadas} temporadas</p>
        <p>${serie.descripcion}</p>
        <div class="card-botones">
          <button onclick="prepararEdicion(${serie.id})">Editar</button>
          <button class="eliminar" onclick="eliminarSerie(${serie.id})">Eliminar</button>
        </div>
      </div>
    `;

    listaSeries.appendChild(card);
  });
}

async function crearSerie(datosSerie) {
  await fetch(`${API_URL}/series`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datosSerie)
  });
}

async function editarSerie(id, datosSerie) {
  await fetch(`${API_URL}/series/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datosSerie)
  });
}

async function eliminarSerie(id) {
  const confirmar = confirm("¿Seguro que deseas eliminar esta serie?");

  if (!confirmar) {
    return;
  }

  await fetch(`${API_URL}/series/${id}`, {
    method: "DELETE"
  });

  cargarSeries();
}

async function prepararEdicion(id) {
  const respuesta = await fetch(`${API_URL}/series/${id}`);
  const serie = await respuesta.json();

  serieId.value = serie.id;
  nombre.value = serie.nombre;
  descripcion.value = serie.descripcion;
  genero.value = serie.genero;
  temporadas.value = serie.temporadas;
  imagen.value = serie.imagen;

  document.getElementById("tituloFormulario").textContent = "Editar serie";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function limpiarFormulario() {
  formulario.reset();
  serieId.value = "";
  document.getElementById("tituloFormulario").textContent = "Agregar serie";
}

function exportarCSV() {
  if (seriesActuales.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }

  const encabezados = ["id", "nombre", "descripcion", "genero", "temporadas", "imagen"];

  const filas = seriesActuales.map((serie) => {
    return encabezados.map((campo) => {
      const valor = String(serie[campo]).replaceAll('"', '""');
      return `"${valor}"`;
    }).join(",");
  });

  const contenido = [encabezados.join(","), ...filas].join("\n");
  const archivo = new Blob([contenido], { type: "text/csv;charset=utf-8;" });

  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(archivo);
  enlace.download = "series.csv";
  enlace.click();
}

cargarSeries();
