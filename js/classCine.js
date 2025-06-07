export default class Peliculas {
  #id;
  #nombre;
  #genero;
  #formato;
  #duracion;
  #imagen; //almacena link de imagen
  #descripcion;

  constructor(nombre, genero, formato, duracion, imagen, descripcion) {
    this.#id = crypto.randomUUID(); //obj de JS para generar id de usuario unicos, no hacer flata NEW
    this.#nombre = nombre;
    this.#genero = genero;
    this.#formato = formato;
    this.#duracion = duracion;
    this.#imagen = imagen;
    this.#descripcion = descripcion;
  }

  // Getters
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

  // Setters con nombres descriptivos
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
  //metodo para stringify, sirver para ver propiedades privadas
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
