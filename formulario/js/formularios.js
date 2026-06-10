function validarInput(elemento) {
    if (elemento.value == '') {
        elemento.classList.add('inputInvalido');
        return false;
    } else {
        elemento.classList.remove('inputInvalido');
        return true;
    }
}

// Evento Listener para limpiar el formulario de forma interactiva
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btn_cancelar").addEventListener("click", function() {
        document.getElementById("formularioRegistro").reset();
        
        // Limpiamos los bordes rojos de todos los controles de Bootstrap
        let inputs = document.querySelectorAll(".form-control, .form-select");
        inputs.forEach(control => control.classList.remove("inputInvalido"));
    });
});