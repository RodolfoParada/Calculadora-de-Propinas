import { formatearMoneda } from '../js/ui.js';

describe('formatearMoneda', () => {

    test('Formatea 10000 correctamente', () => {
        const resultado = formatearMoneda(10000);
        expect(resultado).toBe('$10.000');
    });

    test('Formatea 0 correctamente', () => {
        const resultado = formatearMoneda(0);
        expect(resultado).toBe('$0');
    });

    test('Formatea números decimales', () => {
        const resultado = formatearMoneda(1234.56);
        expect(resultado).toBe('$1.235'); // CLP redondea automáticamente
    });

    test('Formatea números negativos', () => {
        const resultado = formatearMoneda(-5000);
        expect(resultado).toBe('$-5.000'); // Ajuste correcto según Intl
    });
});
