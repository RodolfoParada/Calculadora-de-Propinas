/**
 * @jest-environment jsdom
 */

import Calculadora from '../js/calculadora.js';
import { formatearMoneda } from '../js/ui.js';

// Simulamos las funciones de main.js necesarias
let inputMonto, inputPorcentaje, inputPersonas;
let displayPropina, displayTotal, displayCuota;
let mensajeError;

const STORAGE_KEY = 'calculadora-propina';
const MONTO_MAXIMO = 1_000_000;
const PERSONAS_MAX = 50;

beforeEach(() => {
    // Simula el HTML
    document.body.innerHTML = `
        <form id="propina-form">
            <input id="monto" />
            <select id="porcentaje">
                <option value="10">10%</option>
                <option value="15">15%</option>
            </select>
            <input id="personas" />
            <strong id="resultado-propina">$0</strong>
            <strong id="resultado-total">$0</strong>
            <strong id="resultado-cuota">$0</strong>
            <p id="mensaje-error" style="display:none;"></p>
        </form>
    `;

    inputMonto = document.querySelector('#monto');
    inputPorcentaje = document.querySelector('#porcentaje');
    inputPersonas = document.querySelector('#personas');

    displayPropina = document.querySelector('#resultado-propina');
    displayTotal = document.querySelector('#resultado-total');
    displayCuota = document.querySelector('#resultado-cuota');
    mensajeError = document.querySelector('#mensaje-error');

    // Mock de localStorage
    global.localStorage = {
        store: {},
        getItem: function(key) { return this.store[key] || null; },
        setItem: function(key, value) { this.store[key] = value.toString(); },
        removeItem: function(key) { delete this.store[key]; },
        clear: function() { this.store = {}; }
    };
});

// Función de actualización simulada (igual a main.js)
const actualizarCalculos = () => {
    const monto = Number(inputMonto.value.replace(/\D/g, ''));
    const porcentaje = Number(inputPorcentaje.value);
    const personas = Number(inputPersonas.value);

    if (!inputMonto.value || monto <= 0) {
        mensajeError.style.display = 'block';
        mensajeError.textContent = 'Ingrese un monto válido';
        displayPropina.textContent = '--';
        displayTotal.textContent = '--';
        displayCuota.textContent = '--';
        return;
    }

    mensajeError.style.display = 'none';
    const calc = new Calculadora(monto, porcentaje, personas);

    displayPropina.textContent = formatearMoneda(calc.calcularPropina());
    displayTotal.textContent = formatearMoneda(calc.totalPagar());
    displayCuota.textContent = formatearMoneda(calc.totalPersona());

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ monto, porcentaje, personas }));
};

describe('DOM Calculadora', () => {

    test('Calcula correctamente la propina y actualiza el DOM', () => {
        inputMonto.value = '10000';
        inputPorcentaje.value = '10';
        inputPersonas.value = '2';

        actualizarCalculos();

        expect(displayPropina.textContent).toBe('$1.000');
        expect(displayTotal.textContent).toBe('$11.000');
        expect(displayCuota.textContent).toBe('$5.500');
    });

    test('Muestra mensaje de error si monto es 0', () => {
        inputMonto.value = '0';
        inputPorcentaje.value = '10';
        inputPersonas.value = '1';

        actualizarCalculos();

        expect(mensajeError.style.display).toBe('block');
        expect(mensajeError.textContent).toBe('Ingrese un monto válido');
        expect(displayPropina.textContent).toBe('--');
    });

    test('Guarda valores en localStorage correctamente', () => {
        inputMonto.value = '20000';
        inputPorcentaje.value = '15';
        inputPersonas.value = '4';

        actualizarCalculos();

        const datosGuardados = JSON.parse(localStorage.getItem(STORAGE_KEY));
        expect(datosGuardados).toEqual({ monto: 20000, porcentaje: 15, personas: 4 });
    });

});
