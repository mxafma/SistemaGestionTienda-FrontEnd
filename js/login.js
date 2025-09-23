document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  // credenciales "demo"
  const usuarios = [
    { correo: "admin@duoc.cl",     pass: "admin123",    rol: "Administrador" },
    { correo: "vendedor@duoc.cl",  pass: "vendedor123", rol: "Vendedor" },
    { correo: "cliente@gmail.com", pass: "cliente123",  rol: "Cliente" }
  ];

  form.addEventListener("submit", function (e) {
    e.preventDefault();


    const correo   = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value;

    let errores = [];

    // Validación correo
    if (!correo) {
      errores.push("El correo es requerido.");
    } else if (correo.length > 100) {
      errores.push("El correo no puede superar los 100 caracteres.");
    } else {
      // Solo dominios permitidos
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

    if (errores.length > 0) {
      alert("Errores:\n\n" + errores.join("\n"));
      return;
    }

    // Verificar credenciales hardcodeadas
    const user = usuarios.find(u => u.correo === correo && u.pass === password);

    if (!user) {
      alert("Correo o contraseña incorrectos.");
      return;
    }

    // Guardar rol en localStorage
    localStorage.setItem("rol", user.rol);

    // Redirigir según rol
    if (user.rol === "Cliente") {
      alert("Bienvenido Cliente ✅");
      window.location.href = "index.html";
    } else if (user.rol === "Vendedor") {
      alert("Bienvenido Vendedor ✅");
      window.location.href = "admin/homeAdm.html";
    } else if (user.rol === "Administrador") {
      alert("Bienvenido Administrador ✅");
      window.location.href = "admin/homeAdm.html";
    }
  });
});
