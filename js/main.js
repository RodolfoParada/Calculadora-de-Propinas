import Calculadora from './calculadora.js';
import { formatearMoneda } from './ui.js';

// ================================
// Configuración
// ================================
const STORAGE_KEY = 'calculadora-propina';
const MONTO_MAXIMO = 1_000_000;
const PERSONAS_MAX = 50;

// ================================
// Captura del DOM
// ================================
const formulario = document.querySelector('#propina-form');
const inputMonto = document.querySelector('#monto');
const inputPorcentaje = document.querySelector('#porcentaje');
const inputPersonas = document.querySelector('#personas');

const displayPropina = document.querySelector('#resultado-propina');
const displayTotal = document.querySelector('#resultado-total');
const displayCuota = document.querySelector('#resultado-cuota');
const mensajeError = document.querySelector('#mensaje-error');

// ================================
// Formateo y límites de inputs
// ================================
inputMonto.addEventListener('input', () => {
    let numeros = inputMonto.value.replace(/\D/g, '');

    if (!numeros) {
        inputMonto.value = '';
        return;
    }

    let numero = Number(numeros);

    if (numero > MONTO_MAXIMO) {
        numero = MONTO_MAXIMO;
    }

    inputMonto.value = numero
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
});

inputPersonas.addEventListener('input', () => {
    let valor = inputPersonas.value.replace(/\D/g, '');

    if (!valor) {
        inputPersonas.value = '';
        return;
    }

    valor = parseInt(valor, 10);

    if (valor > PERSONAS_MAX) {
        valor = PERSONAS_MAX;
    }

    inputPersonas.value = valor;
});

// ================================
// Validaciones
// ================================
const validarDatos = (monto, porcentaje, personas) => {
    if (!monto || monto <= 0) {
        return 'Ingrese un monto válido';
    }

    if (isNaN(porcentaje) || porcentaje < 0) {
        return 'El porcentaje no es válido';
    }

    if (!Number.isInteger(personas) || personas <= 0) {
        return 'La cantidad de personas debe ser mayor a 0';
    }

    return null;
};

// ================================
// Manejo de errores
// ================================
const mostrarError = (mensaje) => {
    mensajeError.textContent = mensaje;
    mensajeError.style.display = 'block';
};

const limpiarError = () => {
    mensajeError.textContent = '';
    mensajeError.style.display = 'none';
};

// ================================
// LocalStorage
// ================================
const guardarEnStorage = (datos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
};

const leerDesdeStorage = () => {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : null;
};

// ================================
// Función principal
// ================================
const actualizarCalculos = () => {
    const monto = Number(inputMonto.value.replace(/\D/g, ''));
    const porcentaje = Number(inputPorcentaje.value);
    const personas = Number(inputPersonas.value);

    if (!inputMonto.value) {
        limpiarError();
        displayPropina.textContent = '$0';
        displayTotal.textContent = '$0';
        displayCuota.textContent = '$0';
        return;
    }

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

    guardarEnStorage({ monto, porcentaje, personas });
};

// ================================
// Eventos
// ================================
formulario.addEventListener('input', actualizarCalculos);

// ================================
// Inicialización
// ================================
const datosGuardados = leerDesdeStorage();

if (datosGuardados) {
    inputMonto.value = datosGuardados.monto
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    inputPorcentaje.value = datosGuardados.porcentaje;
    inputPersonas.value = datosGuardados.personas;
}

actualizarCalculos();
