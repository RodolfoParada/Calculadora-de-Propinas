## Calculadora de Propinas

Este proyecto consiste en una **calculadora de propinas** que permite calcular el monto de propina, el total a pagar y la cuota por persona. Está diseñada con **JavaScript orientado a objetos**, incorpora **validaciones de datos**, utiliza **localStorage** para guardar información y cuenta con **tests unitarios y pruebas de UI**.

---

### Características principales

- Cálculo automático de propina y total a pagar.
- División de la cuenta entre varias personas.
- Validaciones de campos: montos negativos, porcentaje incorrecto, cantidad de personas inválida.
- Persistencia de datos usando **localStorage**.
- Experiencia de usuario amigable con interfaz retro y mensajes de error.

---

### Tecnologías utilizadas

- **JavaScript** (ES6+, orientación a objetos)
- **HTML5**
- **CSS3**
- **Jest** (tests unitarios)
- **Cypress** (tests E2E / comportamiento en el DOM)

---

### inicializacion Node.js
```
npm init -y
```
### Instalar dependencias para test unitarios 
```instala solo jest
npm install --save-dev jest
```
```instala solo jsdom
npm install --save-dev jest-environment-jsdom

```
```instala jest y jsdom
npm install --save-dev jest jest-environment-jsdom

```
```prueba los test
npm test
```
### Instalar Cypres pata tests E2E
```
npm install --save-dev cypress@latest
```
```
npx cypress open
```



