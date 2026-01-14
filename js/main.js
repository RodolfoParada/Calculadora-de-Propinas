// Punto de entrada y gestión del DOM
import Calculadora from './calculadora.js';
import { formatearMoneda } from './ui.js';

// 1. Captura de elementos del DOM
const formulario = document.querySelector('#propina-form');
const inputMonto = document.querySelector('#monto');
const inputPorcentaje = document.querySelector('#porcentaje');
const inputPersonas = document.querySelector('#personas');

const displayPropina = document.querySelector('#resultado-propina');
const displayTotal = document.querySelector('#resultado-total');
const displayCuota = document.querySelector('#resultado-cuota');

const mensajeError = document.querySelector('#mensaje-error');

inputMonto.addEventListener('input', () => {
    if (inputMonto.value.length > 7) {
        inputMonto.value = inputMonto.value.slice(0, 7);
    }
});

inputPersonas.addEventListener('input', () => {
    if (inputPersonas.value.length > 1 ) {
        inputPersonas.value = inputPersonas.value.slice(0, 1);
    } 

});


// 2. Funciones de validación
const validarDatos = (monto, porcentaje, personas) => {
    if (isNaN(monto) || monto < 0) {
        return 'ingrese el total de cuenta';
    }

    if (isNaN(porcentaje) || porcentaje < 0) {
        return 'El porcentaje no es válido';
    }

    if (!Number.isInteger(personas) || personas <= 0) {
        return 'La cantidad de personas debe ser mayor a 0';
    }


    return null;
};

// 3. Manejo de errores
const mostrarError = (mensaje) => {
    mensajeError.textContent = mensaje;
    mensajeError.style.display = 'block';
};

const limpiarError = () => {
    mensajeError.textContent = '';
    mensajeError.style.display = 'none';
};

// 4. Función principal
const actualizarCalculos = () => {
    const monto = parseFloat(inputMonto.value);
    const porcentaje = parseFloat(inputPorcentaje.value);
    const personas = parseInt(inputPersonas.value);

    const error = validarDatos(monto, porcentaje, personas);
    if (error) {
        mostrarError(error);
        displayPropina.textContent = '--';
        displayTotal.textContent = '--';
        displayCuota.textContent = '--';
        return;
    }

    limpiarError();

    const calc = new Calculadora(monto, porcentaje, personas);

    displayPropina.textContent = formatearMoneda(calc.calcularPropina());
    displayTotal.textContent = formatearMoneda(calc.totalPagar());
    displayCuota.textContent = formatearMoneda(calc.totalPersona());
};

// 5. Event Listener
formulario.addEventListener('input', actualizarCalculos);

// 6. Inicialización
actualizarCalculos();
