const cuotas = document.querySelector("#fees");
const montoFinal = document.querySelector("#finalAmount");
const cuotaFinal = document.querySelector("#finalFees");
const intereses = document.querySelector("#interests");
const totalADevolver = document.querySelector("#totalAmount");
const destino = document.querySelector("#destino");
const montoViaje = document.querySelector("#montoViaje");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");
const container = document.getElementById('task-list');
const formulario = document.querySelector("#form");
const tasa = 0.05;

const getRamdomId = () => {
    return Math.floor(Math.random() * Date.now()).toString(16);
};

const createTask = (taskId, taskNombre, taskApellido, taskEmail, taskViaje, taskCuotas) => {
    return {
        id: taskId,
        nombre: taskNombre,
        apellido: taskApellido,
        email: taskEmail,
        viaje: taskViaje,
        cuota: taskCuotas
    };
};

const addTask = (datos) => {
    const div = document.createElement("div");
    div.classList.add('task');
    div.id = `task-${datos.id}`;
    div.innerHTML = `
        <div class="card mb-3 p-1 m-2">
            <div class="d-flex flex-column card-body p-1">
                <strong class="bg-secondary">Nombre: ${datos.nombre}</strong> 
                <strong>Apellido: ${datos.apellido}</strong>
                <strong class="bg-secondary">E-mail: ${datos.email}</strong>
                <strong>Viaje: ${datos.viaje}</strong>
                <strong class="bg-secondary">Cuotas: ${datos.cuota}</strong>
                <button class="btn btn-danger m-2" id="${datos.id}" name="delete">Delete</button>
            </div>
        </div>
    `;
    container.appendChild(div);
    saveTaskStorage(datos);
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const precioViaje = indicarDestino(destino);
    const numeroCuotas = cuotas.value;
    obtenerCuotasPrestamo(precioViaje, numeroCuotas);
    const datos = createTask(getRamdomId(), nombre.value, apellido.value, email.value, precioViaje, numeroCuotas);
    addTask(datos);
});

const obtenerCuotasPrestamo = (monto, cuota) => {
    const cuotaPrestamo = tasa * monto / (1 - (1 + tasa) ** -cuota);
    obtenerTotal(cuotaPrestamo, cuota);
};

const obtenerTotal = (cuotaPrestamo, cuota) => {
    if (cuota <= 0) {
        const montoTotalViaje = indicarDestino(destino);
        const prestamo = {
            monto: montoTotalViaje,
            cuotas: 0,
            intereses: 0,
            totalPrestamo: montoTotalViaje
        };
        pintarPrestamo(prestamo);
    } else {
        const total = Math.ceil(cuotaPrestamo) * cuota;
        const montoTotalViaje = indicarDestino(destino);
        const prestamo = {
            monto: montoTotalViaje,
            cuotas: cuotas.value,
            intereses: total - montoTotalViaje,
            totalPrestamo: total
        };
        pintarPrestamo(prestamo);
    }
};

const pintarPrestamo = (prestamo) => {
    montoFinal.textContent = `$ ${prestamo.monto}`;
    cuotaFinal.textContent = `${prestamo.cuotas}`;
    intereses.textContent = `$ ${prestamo.intereses}`;
    totalADevolver.textContent = `$ ${prestamo.totalPrestamo}`;
};

const indicarDestino = (destino) => {
    let precio = 0;
    switch (destino.value) {
        case "Andeluna":
            precio = 50000;
            break;
        case "Azul":
            precio = 25000;
            break;
        case "Catena Zapata":
            precio = 35000;
            break;
        case "Todas":
            precio = 100000;
            break;
        default:
            precio = 0;
    }
    montoViaje.textContent = `$ ${precio}`;
    return precio;
};

const saveTaskStorage = (datos) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(datos);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
};

const deleteTask = (id) => {
    // Elimina del localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Elimina del DOM
    const taskElement = document.getElementById(`task-${id}`);
    if (taskElement) {
        taskElement.remove();
    }
};

// Listeners
document.addEventListener('DOMContentLoaded', loadTasks);

container.addEventListener('click', (e) => {
    if (e.target.name === 'delete') {
        deleteTask(e.target.id);
    }
});