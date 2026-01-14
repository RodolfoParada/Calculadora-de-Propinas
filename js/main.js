// Punto de entrada y gestión del DOM
import Calculadora from './calculadora.js';
import { formatearMoneda } from './ui.js';



//localstorage configuracion
const STORAGE_KEY = 'calculadora-propina';
const MONTO_MAX_DIGITOS = 7;
const MONTO_MAXIMO = 1000000;
const PERSONAS_MAX = 50;

// Captura de elementos del DOM
const formulario = document.querySelector('#propina-form');
const inputMonto = document.querySelector('#monto');
const inputPorcentaje = document.querySelector('#porcentaje');
const inputPersonas = document.querySelector('#personas');

const displayPropina = document.querySelector('#resultado-propina');
const displayTotal = document.querySelector('#resultado-total');
const displayCuota = document.querySelector('#resultado-cuota');

const mensajeError = document.querySelector('#mensaje-error');


// limitadores del input
inputMonto.addEventListener('input', () => {
 
   
    // 1. Obtener solo dígitos (valor real)
    let numeros = inputMonto.value.replace(/\D/g, '');

    if (!numeros) {
        inputMonto.value = '';
        return;
    }

    // 2. Convertir a número
    let numero = Number(numeros);

    // 3. Limitar por valor máximo
    if (numero > MONTO_MAXIMO) {
        numero = MONTO_MAXIMO;
    }

    // 4. Mostrar con formato visual (puntos de miles)
    inputMonto.value = numero
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
});

inputPersonas.addEventListener('input', () => {
  let valor = inputPersonas.value.replace(/\D/g, ''); // solo números

    if (valor === '') {
        inputPersonas.value = '';
        return;
    }

    valor = parseInt(valor, 10);

    if (valor > 50) {
        valor = 50;
    }

    inputPersonas.value = valor;

});


// Funciones de validación de entrada UX
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

// LocalStorage
const guardarEnStorage = (datos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
};

const leerDesdeStorage = () => {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : null;
};

// Manejo de errores
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
      const monto = Number(inputMonto.value.replace(/\D/g, ''));
    const porcentaje = parseFloat(inputPorcentaje.value);
    const personas = parseInt(inputPersonas.value);


    //evitar error al cargar la página
    if(!inputMonto.value){
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

   

    // Guardar estado
    guardarEnStorage({ monto, porcentaje, personas });

     displayPropina.textContent = formatearMoneda(calc.calcularPropina());
    displayTotal.textContent = formatearMoneda(calc.totalPagar());
    displayCuota.textContent = formatearMoneda(calc.totalPersona());
};

// 5. Event Listener
formulario.addEventListener('input', actualizarCalculos);

// Inicialización
// ================================
const datosGuardados = leerDesdeStorage();

if (datosGuardados) {
    inputMonto.value = datosGuardados.monto;
    inputPorcentaje.value = datosGuardados.porcentaje;
    inputPersonas.value = datosGuardados.personas;
}

// 6. Inicialización
actualizarCalculos();
