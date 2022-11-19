//Validacion de formulario
const selectForm = document.querySelector('.formcontato__form');
const inputs = document.querySelectorAll('.formcontato__form input,textarea');

const fields = {
    nombre: false,
    email: false,
    asunto: false,
    mensaje: false
}

const Expressions = {
    nombre: /^[a-zA-Z\ ]{5,50}$/, //Solo letras y espacios
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //formato correo@correo.com
    asunto: /^[a-zA-ZÀ-ÿ0-9\ ]{5,50}$/, //Solo letras y numeros, se permiten espacios
    mensaje: /^[a-zA-ZÀ-ÿ0-9\ ]{5,300}$/ //Solo letras y numeros, se permiten espacios
}

const validateForm = (e) => {
    switch (e.target.name) {
        case "nombre":
            validateField(Expressions.nombre, e.target.value, 'nombre');
            break;
        case "email":
            validateField(Expressions.email, e.target.value, 'email');
            break;
        case "asunto":
            validateField(Expressions.asunto, e.target.value, 'asunto');
            break;
        case "mensaje":
            validateField(Expressions.mensaje, e.target.value, 'mensaje');
            break;
    }
}

const validateField = (expresion, input, campo) => {
    if (expresion.test(input)) {
        document.querySelector(`[data-${campo}].formcontato__input`).classList.add('formcontato__input-valid');
        document.querySelector(`[data-${campo}].formcontato__input`).classList.remove('formcontato__input-invalid');
        document.querySelector(`[data-${campo}].formcontato__msg-condicion`).classList.remove('formcontato__msg-condicion-error');
        fields[campo] = true;
    } else if (input === "") {
        document.querySelector(`[data-${campo}].formcontato__input`).classList.remove('formcontato__input-valid');
        document.querySelector(`[data-${campo}].formcontato__input`).classList.remove('formcontato__input-invalid');
        document.querySelector(`[data-${campo}].formcontato__msg-condicion`).classList.remove('formcontato__msg-condicion-error');
        fields[campo] = false;
    } else {
        document.querySelector(`[data-${campo}].formcontato__input`).classList.remove('formcontato__input-valid');
        document.querySelector(`[data-${campo}].formcontato__input`).classList.add('formcontato__input-invalid');
        document.querySelector(`[data-${campo}].formcontato__msg-condicion`).classList.add('formcontato__msg-condicion-error');
        fields[campo] = false;
    }
}

inputs.forEach((e) => {
    e.addEventListener('keyup', validateForm);
    e.addEventListener('blur', validateForm);
});

const sendForm = (e) => {
    e.preventDefault();

    if (fields.nombre && fields.email && fields.asunto && fields.mensaje) {

        inputs.forEach((e) => {
            document.querySelector(`[data-${e.name}].formcontato__input`).classList.remove('formcontato__input-valid');
            document.querySelector(`[data-${e.name}].formcontato__input`).classList.remove('formcontato__input-invalid');
            document.querySelector(`[data-${e.name}].formcontato__msg-condicion`).classList.remove('formcontato__msg-condicion-error');
            fields[e.name] = false;
        });

        selectForm.reset();

        Swal.fire(
            'Enviado!',
            'Se ha enviado con exito, pronto nos pondremos en contacto con usted',
            'success'
        );
    } else {
        Swal.fire(
            'Error!',
            'Complete correctamente los campos antes de enviar el formulario',
            'error'
        );
    }
}

selectForm.addEventListener('submit', sendForm);