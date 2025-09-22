document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;

    let errores = [];

    if (!correo || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
      errores.push("Ingrese un correo válido.");
    }
    if (password.length < 6) {
      errores.push("La contraseña debe tener al menos 6 caracteres.");
    }

    if (errores.length > 0) {
      alert("Errores:\n\n" + errores.join("\n"));
      return;
    }

    // Si pasa validación, más adelante conectamos con el backend
    alert("Inicio de sesión exitoso ✅ Bienvenido a Foodix!");
  });
});
