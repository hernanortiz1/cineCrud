export default class Peliculas {
  #id;
  #nombre;
  #genero;
  #formato;
  #duracion;
  #imagen; 
  #descripcion;

  constructor(nombre, genero, formato, duracion, imagen, descripcion) {
    this.#id = crypto.randomUUID();
    this.#nombre = nombre;
    this.#genero = genero;
    this.#formato = formato;
    this.#duracion = duracion;
    this.#imagen = imagen;
    this.#descripcion = descripcion;
  }

  get id() {
    return this.#id;
  }

  get nombre() {
    return this.#nombre;
  }

  get genero() {
    return this.#genero;
  }

  get formato() {
    return this.#formato;
  }

  get duracion() {
    return this.#duracion;
  }

  get imagen() {
    return this.#imagen;
  }

  get descripcion() {
    return this.#descripcion;
  }

  set nombre(nuevoNombre) {
    this.#nombre = nuevoNombre;
  }

  set genero(nuevoGenero) {
    this.#genero = nuevoGenero;
  }

  set formato(nuevoFormato) {
    this.#formato = nuevoFormato;
  }

  set duracion(nuevaDuracion) {
    this.#duracion = nuevaDuracion;
  }

  set imagen(nuevaImagen) {
    this.#imagen = nuevaImagen;
  }

  set descripcion(nuevaDescripcion) {
    this.#descripcion = nuevaDescripcion;
  }
  
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      genero: this.genero,
      formato: this.formato,
      duracion: this.duracion,
      imagen: this.imagen,
      descripcion: this.descripcion,
    };
  }
}
