console.log(window.location)

const parametroURL = new URLSearchParams(window.location.search)
const id = parametroURL.get("cod");

const pelicula = JSON.parse(localStorage.getItem("peliculaKey"))

const peliculaBuscada = pelicula.find((pelicula)=> pelicula.id === id)

const card = document.querySelector(".card")

card.innerHTML= `
  <div class="row g-0">
           
                <img
                  src="${peliculaBuscada.imagen}"
                  class="img-fluid rounded-start imagenDetallePelicula"
                  alt="${peliculaBuscada.nombre}"
                />
                <div class="card-body">
                  <h2 class="card-title">
                    Nombre: ${peliculaBuscada.nombre}
                  </h2>
                  <ul class="fs-4">
                    <li><b>Gereno:</b> ${peliculaBuscada.genero}</li>
                    <li><b>Formato:</b> ${peliculaBuscada.formato}</li>
                    <li><b>Duración:</b> ${peliculaBuscada.duracion} min</li>
                    <li><b>Descripción:</b> ${peliculaBuscada.descripcion}</li>
                  </ul>
                </div>
    </div>`