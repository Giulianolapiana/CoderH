// EJEMPLO DESAFÍO ENTREGABLE

const contenedor =  document.getElementById('contenedor');
contenedor.remove();

const calcularViaje = () => {
    let viaje = '';
    let cantidad = 0;
    let precio = 0;
    let totalCompra = 0;
    let seguirComprando = false;

    do {
        viaje = prompt("¿Querés calcular el viaje a bodega: azul, o andeluna o ambos? ", "Ej: ambos");
        cantidad = parseInt(prompt("¿Cuantas veces pensas visitar la bodega?"));

        let cantidadValidada = validarCantidad(cantidad);

        switch (viaje) {
            case "andeluna":
                precio = 50000;
                break;
            case "azul":
                precio = 25000;
                break;
            case "ambos":
                precio = 70000;
                break;
            default:
                alert("Alguno de los datos ingresados no es correcto");
                precio = 0;
                cantidad = 0;
        }

        totalCompra += precio * cantidadValidada;
        seguirComprando = confirm("¿Querés agregar otro viaje?");

    } while (seguirComprando)

    return totalCompra;
}

const validarCantidad = (cantidad) => {
    while (Number.isNaN(cantidad) || cantidad === 0) {
        if (cantidad !== 0) {
            alert('Deber agregar un número.')
        } else {
            alert('Debe agregar un número distinto de cero.')
        }
        cantidad = parseInt(prompt("¿Cuantas veces pensas visitar?"));
    }

    return cantidad;
};

const aplicarDescuento = (totalCompra) => {
    if (totalCompra >= 100000) {
        return totalCompra * 0.80;
    } else {
        return totalCompra;
    }
}

const viajeAeropuerto = (totalCompra) => {
    let tieneViajeGratis = confirm("¿Querés ir al aeropuerto al finalizar tu estadia?");

    if (tieneViajeGratis && totalCompra >= 150000) {
        alert("Tenés el viaje gratis. El total del servicio es $" + totalCompra);
    } else if (tieneViajeGratis && totalCompra < 150000 && totalCompra !== 0) {
        totalCompra += 20000;
        alert("El viaje cuesta $20000. El total del servicio es $" + totalCompra);
    } else {
        alert("El total del servicio es $" + totalCompra);
    }

    return totalCompra;
}

viajeAeropuerto(aplicarDescuento(calcularViaje()));