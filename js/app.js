import Peliculas from "./classCine.js";

//FUNCIONES
const abrirModal = () => {
  modalPelicula.show();
  creandoContacto = true;
};

//CREATE
const crearPelicula = () => {
  if (validaciones()) {
    const peliculaNueva = new Peliculas(
      inputNombre.value,
      inputGenero.value,
      inputFormato.value,
      inputDuracion.value,
      inputImagen.value,
      inputDescripcion.value
    );

    pelicula.push(peliculaNueva);
    console.log(pelicula);
    guardarLocalStorage();

    dibujarFila(peliculaNueva, pelicula.length);

    limpiarFormulario();
    Swal.fire({
      title: "Pelicula creada",
      text: `La pelicula ${peliculaNueva.nombre} fue creada correctamente`,
      icon: "success",
    });
  }
};

const limpiarFormulario = () => {
  formularioPelicula.reset(); //limpia campos del formulario luego de apretar enviar
};

const guardarLocalStorage = () => {
  localStorage.setItem("peliculaKey", JSON.stringify(pelicula));
};
//FIN CREATE

//VARIABLES
const btnAgregar = document.getElementById("btnAgregar");
const formularioPelicula = document.querySelector("form"); //traigo el formulario del boton
const inputNombre = document.querySelector("#nombre");
const inputGenero = document.querySelector("#genero");
const inputFormato = document.querySelector("#formato");
const inputDuracion = document.querySelector("#duracion");
const inputImagen = document.querySelector("#imagen");
const inputDescripcion = document.querySelector("#descripcion");
const tablaPeliculas = document.querySelector("tbody");

let idPelilulaEditar = null; //se guarda el id cuando hace clic en editar
let creandoPelicula = true; // cuando carga es V y cuando edita es F

const pelicula = JSON.parse(localStorage.getItem("peliculaKey")) || [];

//MANEJADORES
btnAgregar.addEventListener("click", () => {
  creandoPelicula = true;
  limpiarFormulario();
  abrirModal();
});

formularioPelicula.addEventListener("submit", (e) => {
  e.preventDefault();
  if (creandoPelicula) {
    crearPelicula();
  } else {
    editarPelicula();
  }
});

//resto de la logica
cargarDatosTabla();
