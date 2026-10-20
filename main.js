/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
    mostrarComidas(comidas);       //Llamar a la función para mostrar las comidas
    actualizarFiltros()
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');

function mostrarComidas(lista){
    container.innerHTML=""
  lista.forEach( comida => {
    container.innerHTML += 
  `
    <article class= "card">
       <p class= "categoria"><span class= "cat"> ${comida.categoria} </span></p>
      <h2 class= "comida">${comida.nombre}</h2>
      <p class= "provincia">${comida.provincia}</p>
      <ul>
       ${comida.ingredientes.map( ingrediente=> `<li>${ingrediente}</li>`).join('')}
      </ul>
    </article>
  ` 
  })
}

const formComidaNueva = document.getElementById('agregarComida')

const agregarIngredienteBtn = document.getElementById("agregarIngrediente")
const ingredientesContainer = document.querySelector(".contenedor-ingredientes")

agregarIngredienteBtn.addEventListener("click", (e) =>{
  ingredientesContainer.innerHTML += `<input type="text" class="ingrediente" placeholder="Ingrediente" required>`
})

formComidaNueva.addEventListener("submit", (event) => {

  event.preventDefault()

  let listaIngredientes = []
  const ingredientesInputs = document.querySelectorAll(".ingrediente")
  
  ingredientesInputs.forEach( input => {
    listaIngredientes.push(input.value.trim())
  })

  let nuevaComida = {
    nombre: event.target.nombre.value,
    categoria: event.target.categoria.value,
    provincia: event.target.provincia.value,
    ingredientes: listaIngredientes
  }

  comidas.push(nuevaComida)

  mostrarComidas(comidas)

ingredientesContainer.innerHTML = `<input type="text" class="ingrediente" placeholder="Ingrediente" required>`

  actualizarFiltros()

  event.target.reset()

})

const buscador = document.getElementById("buscador")
const filtroCategoria = document.getElementById("filtroCategoria")
const filtroProvincia = document.getElementById("filtroProvincia") 

function filtrar(){
  const comidasFiltradas = comidas.filter( comida => {
    return comida.categoria.includes(filtroCategoria.value)
      && comida.provincia.includes(filtroProvincia.value)
  })
  mostrarComidas(comidasFiltradas)
}

function buscar(){
  const texto = buscador.value.toLowerCase()

  const comidasFiltradas = comidas.filter ( comida =>{
    return comida.nombre.toLowerCase().includes(texto)
      || comida.provincia.toLowerCase().includes(texto)
      || comida.categoria.toLowerCase().includes(texto)
  })
  mostrarComidas(comidasFiltradas)
}

filtroCategoria.addEventListener("change", filtrar)
filtroProvincia.addEventListener("change", filtrar)
buscador.addEventListener("input", buscar)

function actualizarFiltros(){
  
filtroCategoria.innerHTML =  `<option value="">Todas las categorias</option>`
filtroProvincia.innerHTML =  `<option value="">Todas las provincias</option>`

filtroProvincia.innerHTML = `<option value="${provincia}">${provincia}</option>`

  let categorias = []
  let provincias = []

  comidas.forEach(comida => {
    
    if( !categorias.includes(comida.categoria) ) {
    categorias.push(comida.categoria)
    }
    if( !provincias.includes(comida.provincia) ) {
      provincias.push(comida.provincia)
    }
  })

  categorias.forEach(categoria =>{
    filtroCategoria.innerHTML +=  `<option value="${categoria}">${categoria}</option>`
  })
  provincias.forEach(provincia => {
    filtroProvincia.innerHTML += `<option value="${provincia}">${provincia}</option>`
  })
}
