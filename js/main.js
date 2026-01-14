// Punto de entrada y gestión del DOM
// 1. Importamos las dependencias
import Calculadora  from './calculadora.js';
import { formatearMoneda } from './ui.js';

// 2. Capturamos los elementos del DOM
const formulario = document.querySelector('#propina-form');
const inputMonto = document.querySelector('#monto');
const inputPorcentaje = document.querySelector('#porcentaje');
const inputPersonas = document.querySelector('#personas');

// Elementos donde mostraremos los resultados
const displayPropina = document.querySelector('#resultado-propina');
const displayTotal = document.querySelector('#resultado-total');
const displayPersona = document.querySelector('#resultado-cuota')

// 3. Función principal de actualización
const actualizarCalculos = () => {
    
    // Obtenemos los valores y los validamos mínimamente
    const monto = parseFloat(inputMonto.value) || 0;
    const porcentaje = parseFloat(inputPorcentaje.value) || 0;
    const personas = parseInt(inputPersonas.value) || 1;

    // Instanciamos la clase con los nuevos valores
    const calc = new Calculadora(monto, porcentaje, personas);

    // Ejecutamos la lógica y formateamos la salida
    displayPropina.textContent = formatearMoneda(calc.calcularPropina());
    displayTotal.textContent = formatearMoneda(calc.totalPagar());
    displayPersona.textContent = formatearMoneda(calc.totalPersona())
};

// 4. Escuchadores de eventos (Event Listeners)
// 'input' permite que la calculadora se actualice en tiempo real mientras escribes
formulario.addEventListener('input', actualizarCalculos);
