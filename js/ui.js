// Lógica matemática (Clase)
export const formatearMoneda = (valor) =>{
    return new Intl.NumberFormat("es-Cl", {
        style: 'currency',
        currency: 'CLP',
    }).format(valor)
};