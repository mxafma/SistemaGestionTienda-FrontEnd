// validaciones-users.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("usuarioForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    let esValido = true;

    // --- Validar RUN ---
    const runInput = document.getElementById("run");
    if (!validarRUN(runInput.value)) {
      marcarInvalido(runInput, "RUN inválido. Ej: 19011022K");
      esValido = false;
    } else {
      marcarValido(runInput);
    }

    // --- Validar Nombre ---
    const nombreInput = document.getElementById("nombre");
    if (nombreInput.value.trim() === "" || nombreInput.value.length > 50) {
      marcarInvalido(nombreInput, "Nombre requerido (máx. 50 caracteres)");
      esValido = false;
    } else {
      marcarValido(nombreInput);
    }

    // --- Validar Apellidos ---
    const apellidosInput = document.getElementById("apellidos");
    if (apellidosInput.value.trim() === "" || apellidosInput.value.length > 100) {
      marcarInvalido(apellidosInput, "Apellidos requeridos (máx. 100 caracteres)");
      esValido = false;
    } else {
      marcarValido(apellidosInput);
    }

    // --- Validar Correo ---
    const correoInput = document.getElementById("correo");
    if (!validarCorreo(correoInput.value)) {
      marcarInvalido(correoInput, "Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com");
      esValido = false;
    } else {
      marcarValido(correoInput);
    }

    // --- Validar Fecha Nacimiento (opcional) ---
    const fechaInput = document.getElementById("fechaNacimiento");
    if (fechaInput.value.trim() !== "" && isNaN(Date.parse(fechaInput.value))) {
      marcarInvalido(fechaInput, "Ingrese una fecha válida o deje el campo vacío");
      esValido = false;
    } else {
      marcarValido(fechaInput);
    }

    // --- Validar Tipo de Usuario ---
    const tipoUsuarioSelect = document.getElementById("tipoUsuario");
    if (tipoUsuarioSelect.value === "") {
      marcarInvalido(tipoUsuarioSelect, "Debe seleccionar un tipo de usuario");
      esValido = false;
    } else {
      marcarValido(tipoUsuarioSelect);
    }

    // --- Validar Región ---
    const regionSelect = document.getElementById("region");
    if (regionSelect.value === "") {
      marcarInvalido(regionSelect, "Debe seleccionar una región");
      esValido = false;
    } else {
      marcarValido(regionSelect);
    }

    // --- Validar Comuna ---
    const comunaSelect = document.getElementById("comuna");
    if (comunaSelect.value === "") {
      marcarInvalido(comunaSelect, "Debe seleccionar una comuna");
      esValido = false;
    } else {
      marcarValido(comunaSelect);
    }

    // --- Validar Dirección ---
    const direccionInput = document.getElementById("direccion");
    if (direccionInput.value.trim() === "" || direccionInput.value.length > 300) {
      marcarInvalido(direccionInput, "Dirección requerida (máx. 300 caracteres)");
      esValido = false;
    } else {
      marcarValido(direccionInput);
    }

    // --- Enviar si todo es válido ---
    if (esValido) {
      alert("Formulario válido");
      form.reset();
      limpiarClases(form);
    }
  });
});

/* --- Funciones de Validación --- */
function validarRUN(run) {
  // Validar formato (7 u 8 dígitos + DV) y calcular DV
  if (!/^[0-9]{7,8}[0-9Kk]$/.test(run)) return false;

  let cuerpo = run.slice(0, -1);
  let dv = run.slice(-1).toUpperCase();

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1; // corregido
  }

  let resto = suma % 11;
  let dvEsperado = 11 - resto;

  if (dvEsperado === 11) dvEsperado = "0";
  else if (dvEsperado === 10) dvEsperado = "K";
  else dvEsperado = dvEsperado.toString();

  return dv === dvEsperado;
}


function validarCorreo(correo) {
  const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return regex.test(correo);
}

/* --- Helpers Bootstrap --- */
function marcarInvalido(input, mensaje) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");

  let feedback = input.nextElementSibling;
  if (!feedback || !feedback.classList.contains("invalid-feedback")) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    input.insertAdjacentElement("afterend", feedback);
  }
  feedback.textContent = mensaje;
}

function marcarValido(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

function limpiarClases(form) {
  const inputs = form.querySelectorAll("input, select");
  inputs.forEach(input => {
    input.classList.remove("is-valid", "is-invalid");
  });
}
