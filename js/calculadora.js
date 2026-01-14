// Lógica matemática (Clase)
export default class Calculadora {
  constructor(monto, porcentaje, personas) {
        this.monto = Number(monto);
        this.porcentaje = Number(porcentaje);
        this.personas = Number(personas);

        // Normalización defensiva
        if (isNaN(this.monto) || this.monto < 0) {
            this.monto = 0;
        }

        if (isNaN(this.porcentaje) || this.porcentaje < 0) {
            this.porcentaje = 0;
        }

        if (!Number.isInteger(this.personas) || this.personas <= 0) {
            this.personas = 1;
        }
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