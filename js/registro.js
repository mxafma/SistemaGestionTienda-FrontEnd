document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRegistro");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // evita recargar la página

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;
    const confirmar = document.getElementById("confirmar").value;
    const telefono = document.getElementById("telefono").value.trim();
    const region = document.getElementById("region").value;
    const comuna = document.getElementById("comuna").value;

    let errores = [];

    // Validaciones
    if (!nombre) errores.push("El nombre completo es obligatorio.");

    // Validación correo
    if (!correo) {
      errores.push("El correo es requerido.");
    } else if (correo.length > 100) {
      errores.push("El correo no puede superar los 100 caracteres.");
    } else {
      const dominioValido = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
      if (!dominioValido.test(correo)) {
        errores.push("Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com.");
      }
    }

    // Validación contraseña
    if (!password) {
      errores.push("La contraseña es requerida.");
    } else if (password.length < 4 || password.length > 10) {
      errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
    }
    if (password !== confirmar) errores.push("Las contraseñas no coinciden.");
    if (!region) errores.push("Seleccione una región.");
    if (!comuna) errores.push("Seleccione una comuna.");

    // Validación de teléfono (si lo ingresan)
    if (telefono) { 
      if (!/^[9]\d{8}$/.test(telefono)) {
        errores.push("Ingrese un número de teléfono válido (ej: 999999999).");
      }
    }

    // Mostrar resultados
    if (errores.length > 0) {
      alert("Corrija los siguientes errores:\n\n" + errores.join("\n"));
      return;
    }

    // Si todo ok → luego podemos mandar al backend
    alert("Registro exitoso ✅ Bienvenido a Foodix, " + nombre + "!");
  });
});
