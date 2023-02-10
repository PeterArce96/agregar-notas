// VARIABLES
const formulario = document.querySelector('#formulario');
const listaNotas = document.querySelector('#lista-notas');
let notas = [];//almacen de los notas


// EVENTLISTENERES
eventListeners();

function eventListeners() {
    // cuando el usuario agrega un nuevo notas
    formulario.addEventListener('submit', agregarNota);

    // cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        notas = JSON.parse(localStorage.getItem('notas')) || [];
        console.log(notas);
        crearHTML();
    });
}


// FUNCIONES

// Agregar notas
function agregarNota(e) {
    e.preventDefault();
    // textarea donde escribe el usuario
    const nota = document.querySelector('#nota').value;

    // validacion
    if(nota === ''){
        mostrarError('Un mensaje no puede ir vacío');

        return; //evita que se ejecuten más líneas de código
    }
    
    const notaObj = {
        id: Date.now(),
        nota,
        // nota: nota,
    }

    // añadir al arreglo de notas
    notas = [...notas, notaObj];
    
    // Una vez agregado creamos el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertarlo en el contenido
    const contenido = document.querySelector('#notas');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 10000);
}

// Muestra un listado de los notas
function crearHTML() {
    limpiarHTML();
    if (notas.length > 0) {
        notas.forEach( nota => {
            // Agregar un boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-nota');
            btnEliminar.innerText = '❌';

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarNota(nota.id);
            }
            
            // Crear el html
            const li = document.createElement('li');

            // añadir el texto
            li.innerText = nota.nota;

            // Asignar el botón
            li.appendChild(btnEliminar);

            // insertarlo en el html
            listaNotas.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agrega los tweets actuales a localStorage
function sincronizarStorage() {
    localStorage.setItem('notas',JSON.stringify(notas));
}

// Eliminar un tweet
function borrarNota(id) {
    // traer todos los demás, excepto el que se está borrando
    notas = notas.filter( nota => nota.id !== id);
    crearHTML();
}

// limpiar el HTML
function limpiarHTML() {
    while(listaNotas.firstChild){
        listaNotas.removeChild(listaNotas.firstChild);
    }
}