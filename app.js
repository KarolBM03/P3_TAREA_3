// Obtener elementos del DOM
const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const puestoInput = document.getElementById('puesto');
const divEmpleados = document.querySelector('.div-empleados');

let empleados = JSON.parse(localStorage.getItem('empleados')) || [];
let editando = false;
let idEmpleadoEditando = null;

// Renderizar empleados al cargar
document.addEventListener('DOMContentLoaded', renderEmpleados);

// Función para renderizar la lista de empleados
function renderEmpleados() {
    divEmpleados.innerHTML = '';

    empleados.forEach((empleado, index) => {
        const p = document.createElement('p');
        p.innerHTML = `
            ${empleado.nombre} - ${empleado.puesto}
            <button class="btn btn-editar" onclick="editarEmpleado(${index})">Editar</button>
            <button class="btn btn-eliminar" onclick="eliminarEmpleado(${index})">Eliminar</button>
        `;
        divEmpleados.appendChild(p);
    });

    guardarEnLocalStorage();
}

// Función para agregar o actualizar empleado
formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const puesto = puestoInput.value.trim();

    if (!nombre || !puesto) {
        alert('Por favor completa todos los campos.');
        return;
    }

    if (editando) {
        empleados[idEmpleadoEditando] = { nombre, puesto };
        editando = false;
        idEmpleadoEditando = null;
    } else {
        empleados.push({ nombre, puesto });
    }

    formulario.reset();
    renderEmpleados();
});


// Función para guardar empleados en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem('empleados', JSON.stringify(empleados));
}

