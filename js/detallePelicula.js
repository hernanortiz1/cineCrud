console.log(window.location)

const parametroURL = new URLSearchParams(window.location.search)
const id = parametroURL.get("cod");

const pelicula = JSON.parse(localStorage.getItem("peliculaKey"))

const peliculaBuscada = pelicula.find((pelicula)=> pelicula.id === id)

const card = document.querySelector(".card")

card.innerHTML= `
  <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="${peliculaBuscada.imagen}"
                  class="img-fluid rounded-start"
                  alt="${peliculaBuscada.nombre}"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    Nombre: ${peliculaBuscada.nombre}
                  </h5>
                  <ul>
                    <li><b>Gereno:</b> ${peliculaBuscada.genero}</li>
                    <li><b>Formato:</b> ${peliculaBuscada.formato}</li>
                    <li><b>Duración:</b> ${peliculaBuscada.duracion} min</li>
                    <li><b>Descripción:</b> ${peliculaBuscada.descripcion}</li>
                  </ul>
                </div>
              </div>
            </div>`