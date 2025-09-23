document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    let errores = [];

    // Validación nombre
    if (!nombre) {
      errores.push("El nombre es obligatorio.");
    } else if (nombre.length > 100) {
      errores.push("El nombre no puede superar los 100 caracteres.");
    }

    // Validación correo
    if (correo.length > 100) {
      errores.push("El correo no puede superar los 100 caracteres.");
    } else if (correo) {
      const dominioValido = /@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
      if (!dominioValido.test(correo)) {
        errores.push("Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com.");
      }
    }

    // Validación comentario
    if (!mensaje) {
      errores.push("El comentario es obligatorio.");
    } else if (mensaje.length > 500) {
      errores.push("El comentario no puede superar los 500 caracteres.");
    }

    if (errores.length > 0) {
      alert("Corrige los siguientes errores:\n\n" + errores.join("\n"));
      return;
    }

    alert("Mensaje enviado ✅ Gracias por contactarnos, " + nombre + "!");
    form.reset();
  });
});
