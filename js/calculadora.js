// Lógica matemática (Clase)
export default class Calculadora {
    constructor(monto, porcentaje, personas) {
        this.monto = Number(monto) || 0;
        this.porcentaje = Number(porcentaje) || 0;
        this.personas = Number(personas) || 1;
    }

    // Método para calcular solo la propina
    calcularPropina() {
        return this.monto * (this.porcentaje / 100);
    }

    // Método para calcular el total (Monto + Propina)
    totalPagar() {
        // IMPORTANTE: Llamamos al método anterior con ()
        return this.monto + this.calcularPropina();
    }

    // Método para la cuota individual
    totalPersona() {
        return this.totalPagar() / this.personas;
    }
}