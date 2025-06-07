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
