function validarFormulario() {
    //Captura de elementos por sus IDs correspondientes
    let campoNombre = document.getElementById('input_nombre');
    let campoRut = document.getElementById('input_rut');
    let campoEmail = document.getElementById('input_email');
    let campoFechaNacimiento = document.getElementById('input_fechaNacimiento');
    let campoContrasena = document.getElementById('input_contrasena');
    let campoRepetirContrasena = document.getElementById('input_confirm_contrasena');

    let todoValido = true;

    // 2. Comprobación del Nombre (usa la función de formulario.js)
    if (!validarInput(campoNombre)) todoValido = false;
    
    // 3. Comprobación de RUT Chileno
    if (!validarInput(campoRut)) {
        todoValido = false;
    } else if (!verificarRutChileno(campoRut.value)) {
        campoRut.classList.add('inputInvalido');
        todoValido = false;
    }

    // 4. Comprobación de Email mediante expresión regular
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!validarInput(campoEmail)) {
        todoValido = false;
    } else if (!emailRegex.test(campoEmail.value)) {
        campoEmail.classList.add('inputInvalido');
        todoValido = false;
    }

    // 5. Comprobación opcional de Fecha
    if (campoFechaNacimiento.value !== "") {
        let fechaRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        if (!fechaRegex.test(campoFechaNacimiento.value)) {
            campoFechaNacimiento.classList.add('inputInvalido');
            todoValido = false;
        } else {
            campoFechaNacimiento.classList.remove('inputInvalido');
        }
    }

    // 6. Comprobación Compleja de Contraseña (8-12 caracteres, Mayús, Minús, Num, Especial)
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_])[A-Za-z\d!@#$%^&*(),.?":{}|<>_]{8,12}$/;
    if (!validarInput(campoContrasena)) {
        todoValido = false;
    } else if (!passRegex.test(campoContrasena.value)) {
        campoContrasena.classList.add('inputInvalido');
        todoValido = false;
    }

    // 7. Comprobación de Coincidencia de Contraseñas
    if (!validarInput(campoRepetirContrasena)) {
        todoValido = false;
    } else if (campoContrasena.value !== campoRepetirContrasena.value) {
        campoRepetirContrasena.classList.add('inputInvalido');
        todoValido = false;
    }

    // Respuesta de la pauta al cumplir el 100% de las condiciones
    if (todoValido) {
        alert("El envío de datos ha sido correcto.");
    }
}

// Algoritmo modular Módulo 11 para la validación del RUT
function verificarRutChileno(rut) {
    let rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').trim();
    if (rutLimpio.length < 2) return false;

    let cuerpo = rutLimpio.slice(0, -1);
    let dvInput = rutLimpio.slice(-1).toUpperCase();

    if (!/^\d+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += multiplo * parseInt(cuerpo.charAt(i));
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 11) dvEsperado = '0';
    else if (dvEsperado === 10) dvEsperado = 'K';
    else dvEsperado = dvEsperado.toString();

    return dvInput === dvEsperado;
}