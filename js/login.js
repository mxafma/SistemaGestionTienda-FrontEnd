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

    // Validaciones previas
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
