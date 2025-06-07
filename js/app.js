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

//READ,
const cargarDatosTabla = () => {
  if (pelicula.length != 0) {
  }

  pelicula.map((pelicula, indice) => {
    dibujarFila(pelicula, indice + 1);
  });
};

const dibujarFila = (pelicula, indice) => {
  tablaPeliculas.innerHTML += `
   <tr>
        <th scope="row">${indice}</th>
        <td>${pelicula.nombre}</td>
        <td>${pelicula.genero}</td>
        <td>${pelicula.formato}</td>
        <td>${pelicula.duracion}</td>
        <td>
          <button class="btn btn-warning" onclick="prepararPelicula('${pelicula.id}')">Editar</button>
            <button class="btn btn-danger" onclick="eliminarPelicula('${pelicula.id}')">Borrar</button>
          <button class="btn btn-info">Ver</button>
          </td>
      </tr>
  `;
};
//FIN READ

//DELETE
window.eliminarPelicula = (id) => {
  console.log("borrar");
  console.log(id);

  const posicionPeliculaBuscada = pelicula.findIndex(
    (pelicula) => pelicula.id === id
  ); 

  Swal.fire({
    title: "¿Eliminar pelicula?",
    text: "No podra recuperar los datos",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      pelicula.splice(posicionPeliculaBuscada, 1); 

      guardarLocalStorage(); 
      //actualizar tabla
      console.log(tablaPeliculas.children[posicionPeliculaBuscada].remove());

      Swal.fire({
        title: "Eliminada",
        text: "La pelicula fue eliminada",
        icon: "success",
      });
    }
  });
};
//FIN DELETE

// UPDATE
window.prepararPelicula = (id) => {
  const peliculaBuscada = pelicula.find((pelicula) => pelicula.id === id); //devuelve un objeto si cumple con la condicion, si hay vario devuelve el primero

  //cargar datos en input de modal
  inputNombre.value = peliculaBuscada.nombre;
  inputGenero.value = peliculaBuscada.genero;
  inputFormato.value = peliculaBuscada.formato;
  inputDuracion.value = peliculaBuscada.duracion;
  inputImagen.value = peliculaBuscada.imagen;
  inputDescripcion.value = peliculaBuscada.descripcion;

  abrirModal();

  idPelilulaEditar = id;
  creandoPelicula = false;
};

const editarPelicula = () => {

  const posicionPelicula = pelicula.findIndex(
    (pelicula) => pelicula.id === idPelilulaEditar
  );
  pelicula[posicionPelicula].nombre = inputNombre.value;
  pelicula[posicionPelicula].genero = inputGenero.value;
  pelicula[posicionPelicula].formato = inputFormato.value;
  pelicula[posicionPelicula].duracion = inputDuracion.value;
  pelicula[posicionPelicula].imagen = inputImagen.value;
  pelicula[posicionPelicula].descripcion = inputDescripcion.value;

  // actualizar localstorage
  guardarLocalStorage();

Swal.fire({
  title: "Cambios guardados con éxito",
  icon: "success",
  draggable: true
});

  //limpiar formulario y limpiar el modal

  // actualizar tabla

  //agregar mensaje para usuario
};

//FIN UPDATE

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
