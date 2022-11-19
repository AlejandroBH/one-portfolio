//Calcular edad de forma dinamica
const calcEdad = document.querySelector('#calcEdad');

const birthYear = 1991;
const currentTime = new Date();
const currentYear = currentTime.getFullYear();
const currentAge = currentYear - birthYear;

calcEdad.innerHTML = currentAge;