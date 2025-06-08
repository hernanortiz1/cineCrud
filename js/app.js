import Peliculas from "./classCine.js";

//FUNCIONES
const abrirModal = () => {
  modalPelicula.show();
  creandoPelicula = true;
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
  formularioPelicula.reset();
  const inputs = formularioPelicula.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });
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
          <button class="btn btn-info"  onclick="verPelicula('${pelicula.id}')">Ver</button>
          </td>
      </tr>
  `;
};
//FIN READ

//DELETE
window.eliminarPelicula = (id) => {
  Swal.fire({
    title: "Estas por eliminar un contacto",
    text: "si decides eliminar, no puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#57cc99",
    cancelButtonColor: "#d00000",
    confirmButtonText: "Borrar",
    cancelButtonText: "Salir",
  }).then((result) => {
    if (result.isConfirmed) {
      const posicionPeliculaBuscada = pelicula.findIndex(
        (pelicula) => pelicula.id === id
      );
      pelicula.splice(posicionPeliculaBuscada, 1);

      guardarLocalStorage();
      //actualizar tabla
      tablaPeliculas.children[posicionPeliculaBuscada].remove();
      const filasRestantes = tablaPeliculas.children;
      for (let i = 0; i < filasRestantes.length; i++) {
        const celdaIndice = filasRestantes[i].querySelector("th");
        if (celdaIndice) {
          celdaIndice.textContent = i + 1; // Actualiza el texto con el nuevo índice
        }
      }
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
  if (validaciones()) {
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
    limpiarFormulario();

    //cerrar el modal
    modalPelicula.hide();
    // actualizar tabla
    const filaEditada = tablaPeliculas.children[posicionPelicula];
    if (filaEditada) {
      filaEditada.children[1].textContent = pelicula[posicionPelicula].nombre;
      filaEditada.children[2].textContent = pelicula[posicionPelicula].genero;
      filaEditada.children[3].textContent = pelicula[posicionPelicula].formato;
      filaEditada.children[4].textContent = pelicula[posicionPelicula].duracion;
    }

    Swal.fire({
      title: "Pelicula modificada",
      text: `La pelicula ${pelicula[posicionPelicula].nombre} fue modificada correctamente`,
      icon: "success",
    });
  }
};
//FIN UPDATE

//VER PELICULA
window.verPelicula = (id) => {
  console.log(window.location);
  window.location.href = "./pages/detallePelicula.html?cod=" + id;
};
//FIN VER CONTACTO

// funciones de validacion
function validarCantidadCaracteres(input, min, max) {
  if (input.value.trim().length >= min && input.value.trim().length <= max) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function validarDuracion(input) {
  const duracion = parseInt(input.value.trim());
  if (!isNaN(duracion) && duracion >= 10 && duracion <= 500) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function validarImagen() {
  const regExp = /^https?:\/\/.*\.(jpg|jpeg|png)$/i;
  if (regExp.test(inputImagen.value.trim())) {
    inputImagen.classList.add("is-valid");
    inputImagen.classList.remove("is-invalid");
    return true;
  } else {
    inputImagen.classList.add("is-invalid");
    inputImagen.classList.remove("is-valid");
    return false;
  }
}

function validaciones() {
  let datosValidos = true;
  if (!validarCantidadCaracteres(inputNombre, 2, 50)) {
    datosValidos = false;
  }

  if (!validarCantidadCaracteres(inputGenero, 2, 50)) {
    datosValidos = false;
  }

  if (!validarCantidadCaracteres(inputFormato, 2, 30)) {
    datosValidos = false;
  }

  if (!validarDuracion(inputDuracion)) {
    datosValidos = false;
  }

  if (!validarImagen()) {
    datosValidos = false;
  }

  if (!validarCantidadCaracteres(inputNombre, 10, 250)) {
    datosValidos = false;
  }

  return datosValidos;
}

//VARIABLES
const modalPelicula = new bootstrap.Modal(
  document.getElementById("modalPelicula")
);
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
