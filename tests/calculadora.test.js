import Calculadora from '../js/calculadora.js';

describe('Calculadora de Propinas', () => {

    test('Calcula propina 10% de 10000', () => {
        const calc = new Calculadora(10000, 10, 1);
        expect(calc.calcularPropina()).toBe(1000);
    });

    test('Calcula total a pagar correctamente', () => {
        const calc = new Calculadora(20000, 10, 1);
        expect(calc.totalPagar()).toBe(22000);
    });

    test('Calcula cuota por persona', () => {
        const calc = new Calculadora(30000, 10, 3);
        expect(calc.totalPersona()).toBe(11000);
    });

    test('Sin propina (0%)', () => {
        const calc = new Calculadora(10000, 0, 1);
        expect(calc.totalPagar()).toBe(10000);
    });

});

describe('Manejo de errores y edge cases en funcions calculadora', () => {

    test('Personas en 0 se corrige a 1', () => {
        const calc = new Calculadora(10000, 10, 0);
        expect(calc.totalPersona()).toBe(11000);
    });

    test('Monto negativo se trata como 0', () => {
        const calc = new Calculadora(-5000, 10, 1);
        expect(calc.totalPagar()).toBe(0);
    });

    test('Porcentaje negativo se trata como 0', () => {
        const calc = new Calculadora(10000, -10, 1);
        expect(calc.totalPagar()).toBe(10000);
    });

});


describe('Validaciones de Calculadora', () => {

    test('Monto negativo se corrige a 0', () => {
        const calc = new Calculadora(-5000, 10, 1);
        expect(calc.monto).toBe(0);
        expect(calc.totalPagar()).toBe(0);
    });

    test('Porcentaje negativo se corrige a 0', () => {
        const calc = new Calculadora(10000, -10, 1);
        expect(calc.porcentaje).toBe(0);
        expect(calc.totalPagar()).toBe(10000);
    });

    test('Personas en 0 se corrige a 1', () => {
        const calc = new Calculadora(10000, 10, 0);
        expect(calc.personas).toBe(1);
        expect(calc.totalPersona()).toBe(11000);
    });

    test('Personas negativas se corrige a 1', () => {
        const calc = new Calculadora(20000, 10, -3);
        expect(calc.personas).toBe(1);
        expect(calc.totalPersona()).toBe(22000);
    });

    test('Campos vacíos se inicializan correctamente', () => {
        const calc = new Calculadora('', '', '');
        expect(calc.monto).toBe(0);
        expect(calc.porcentaje).toBe(0);
        expect(calc.personas).toBe(1);
    });

});

