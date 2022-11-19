//Calcular edad de forma dinamica
const calcEdad = document.querySelector('#calcEdad');

const birthYear = 1991;
const currentTime = new Date();
const currentYear = currentTime.getFullYear();
const currentAge = currentYear - birthYear;

calcEdad.innerHTML = currentAge;

//Crear logica de validacion para formulario
const formulario = document.querySelector('.formcontato__form');
const inputs = document.querySelectorAll('.formcontato__form input,textarea');

const campos = {
    nombre: false,
    email: false,
    asunto: false,
    mensaje: false
}

const expresiones = {
    nombre: /^[a-zA-Z\ ]{5,50}$/, //Solo letras y espacios
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //formato correo@correo.com
    asunto: /^[a-zA-Z0-9\ ]{5,50}$/, //Solo letras y numeros, se permiten espacios
    mensaje: /^[a-zA-Z0-9\ ]{5,300}$/ //Solo letras y numeros, se permiten espacios
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target.value, 'nombre');
            break;
        case "email":
            validarCampo(expresiones.email, e.target.value, 'email');
            break;
        case "asunto":
            validarCampo(expresiones.asunto, e.target.value, 'asunto');
            break;
        case "mensaje":
            validarCampo(expresiones.mensaje, e.target.value, 'mensaje');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input)) {
        document.querySelector(`[data-${campo}].formcontato__input`).classList.add('formcontato__input');
        document.querySelector(`[data-${campo}].formcontato__input`).classList.add('formcontato__input-valid');
        document.querySelector(`[data-${campo}].formcontato__input`).classList.remove('formcontato__input-invalid');
        document.querySelector(`[data-${campo}].formcontato__msg-condicion`).classList.remove('formcontato__msg-condicion-error');
        campos[campo] = true;
    } else {
        document.querySelector(`[data-${campo}].formcontato__input`).classList.add('formcontato__input-invalid');
        document.querySelector(`[data-${campo}].formcontato__input`).classList.remove('formcontato__input-valid');
        document.querySelector(`[data-${campo}].formcontato__input`).classList.add('formcontato__input-invalid');
        document.querySelector(`[data-${campo}].formcontato__msg-condicion`).classList.add('formcontato__msg-condicion-error');
        campos[campo] = false;
    }
}

inputs.forEach((e) => {
    e.addEventListener('keyup', validarFormulario);
    e.addEventListener('blur', validarFormulario);
})

const enviarFormulario = (e) => {
    e.preventDefault();

    if (campos.nombre && campos.email && campos.asunto && campos.mensaje) {
        document.querySelectorAll('formcontato__input').forEach((borderBottom) => {
            borderBottom.classList.remove('.formcontato__input');
        });

        Swal.fire(
            'Enviado!',
            'Se ha enviado con exito, pronto nos pondremos en contacto con usted',
            'success'
        );

        formulario.reset();

    } else {
        Swal.fire(
            'Error!',
            'Complete correctamente los campos antes de enviar el formulario',
            'error'
        );
    }
}

formulario.addEventListener('submit', enviarFormulario);