const cuotas = document.querySelector("#fees");
const montoFinal = document.querySelector("#finalAmount");
const cuotaFinal = document.querySelector("#finalFees");
const intereses = document.querySelector("#interests");
const totalADevolver = document.querySelector("#totalAmount");
const destino = document.querySelector("#destino");
const montoViaje = document.querySelector("#montoViaje");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");


const formulario = document.querySelector("#form");
const tasa = 0.06;

const getRamdomId = () => {
    return Math.floor(Math.random() * Date.now()).toString(16)
};

const createTask = (taskId, taskNombre, taskApellido, taskViaje, taskCuotas) => {
    return {
        id: taskId,
        nombre: taskNombre,
        apellido: taskApellido,
        viaje: taskViaje,
        cuota: taskCuotas
    }
};

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const precioViaje = (indicarDestino(destino));
    const numeroCuotas = cuotas.value;

    obtenerCuotasPrestamo(precioViaje,numeroCuotas);
    const datos = createTask(getRamdomId(),nombre.value,apellido.value,precioViaje,numeroCuotas);
    console.log(datos);
    guardarStorage('datosviaje', JSON.stringify(datos));
});

const obtenerCuotasPrestamo = (monto, cuota) => {
    const cuotaPrestamo = tasa*monto / (1- (1 + tasa)** - cuota);
    obtenerTotal(cuotaPrestamo,cuota);
};

const obtenerTotal = (cuotaPrestamo, cuota) => {
    if (cuota <= 0) {
        const montoTotalViaje = (indicarDestino(destino));
        const prestamo ={
            monto: montoTotalViaje,
            cuotas: 0,
            intereses: 0,
            totalPrestamo: montoTotalViaje
    };
    pintarPrestamo(prestamo);
    } else {
        const total = Math.ceil(cuotaPrestamo) * cuota;
        const montoTotalViaje = (indicarDestino(destino));
        const prestamo ={
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
            cantidad = 0;
    }
    montoViaje.textContent = `$ ${precio}`;
    return precio
};


document.getElementById('boton1').addEventListener('click', function(event) {
    event.preventDefault(); 
    indicarDestino(destino);
});


const guardarStorage = (clave,valor) => {
    localStorage.setItem(clave, valor);
};

const getTaskStorage = () => {
    const taskStorage = JSON.parce(localStorage.getItem('datosviaje'));
    return taskStorage;
};

const getTask = () => {
    createTask = getTaskStorage();
};

document.addEventListener('DOMContentLoaded', getTask);

//guardar todo el array
/* guardarStorage('datosviaje', JSON.stringify(prestamo)) */