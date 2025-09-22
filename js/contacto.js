document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    let errores = [];

    if (!nombre) errores.push("El nombre es obligatorio.");
    if (!correo || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
      errores.push("Ingrese un correo válido.");
    }
    if (!mensaje) errores.push("El mensaje no puede estar vacío.");

    if (errores.length > 0) {
      alert("Corrige los siguientes errores:\n\n" + errores.join("\n"));
      return;
    }

    alert("Mensaje enviado ✅ Gracias por contactarnos, " + nombre + "!");
    form.reset();
  });
});
