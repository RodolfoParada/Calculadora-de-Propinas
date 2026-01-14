describe('Calculadora de Propinas E2E', () => {
  beforeEach(() => {
    // Abre tu página en cada test
    cy.visit('http://127.0.0.1:5500/');
  });

  it('Calcula propina correctamente', () => {
    // Escribe un monto
    cy.get('#monto').clear().type('10000');
    // Selecciona porcentaje 10%
    cy.get('#porcentaje').select('10');
    // Escribe cantidad de personas
    cy.get('#personas').clear().type('2');

    // Verifica los resultados
    cy.get('#resultado-propina').should('contain', '$1.000');
    cy.get('#resultado-total').should('contain', '$11.000');
    cy.get('#resultado-cuota').should('contain', '$5.500');
  });

  it('Muestra error al ingresar monto negativo', () => {
    cy.get('#monto').clear().type('-5000');
    cy.get('#porcentaje').select('10');
    cy.get('#personas').clear().type('1');

    // El mensaje de error debería mostrarse
    cy.get('#mensaje-error').should('be.visible')
      .and('contain', 'Ingrese un monto válido');
  });

  it('Cuota por persona correcta al dividir entre 3', () => {
    cy.get('#monto').clear().type('30000');
    cy.get('#porcentaje').select('10');
    cy.get('#personas').clear().type('3');

    cy.get('#resultado-cuota').should('contain', '$11.000');
  });
});
