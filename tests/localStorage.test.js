
describe('LocalStorage', () => {
    beforeEach(() => {
        global.localStorage = {
            store: {},
            getItem: function(key) { return this.store[key] || null; },
            setItem: function(key, value) { this.store[key] = value.toString(); },
            removeItem: function(key) { delete this.store[key]; },
            clear: function() { this.store = {}; }
        };
    });

    test('Guarda y lee correctamente', () => {
        const datos = { monto: 10000, porcentaje: 10, personas: 2 };
        localStorage.setItem('calculadora-propina', JSON.stringify(datos));
        const resultado = JSON.parse(localStorage.getItem('calculadora-propina'));
        expect(resultado).toEqual(datos);
    });
});
