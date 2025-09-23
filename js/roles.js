// js/roles.js
(() => {
  const ROL = localStorage.getItem("rol") || "Cliente";

  const ocultar = (sel) =>
    document.querySelectorAll(sel).forEach(el => el.style.display = "none");

  function aplicarVisibilidad() {
    if (ROL === "Administrador") return;              // ve todo
    if (ROL === "Vendedor") ocultar(".admin-only");   // oculta solo admin
    if (ROL === "Cliente") {                          // cliente no debería estar en admin
      ocultar(".admin-only");
      ocultar(".vendedor-only");
    }
  }

  function redirigirSiNoCorresponde() {
    const inAdmin = location.pathname.includes("/admin/");
    if (!inAdmin) return;

    // Cliente no puede estar en /admin
    if (ROL === "Cliente") {
      window.location.replace("../index.html");
      return;
    }

    // Vendedor: solo productos/inventory y órdenes
    if (ROL === "Vendedor") {
      const file = location.pathname.split("/").pop().toLowerCase();
      const permitidas = new Set([
        "homeadm.html", "productos.html", "producto-form.html",
        "inventory.html", "orders.html", "ordenes.html",
        "order-detail.html", "detalle-orden.html"
      ]);
      if (!permitidas.has(file)) {
        window.location.replace("productos.html"); // o "homeAdm.html"
      }
    }
  }

  function hookupLogout() {
    const btn = document.getElementById("logout");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("rol");
        const inAdmin = location.pathname.includes("/admin/");
        window.location.href = inAdmin ? "../index.html" : "index.html";
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    aplicarVisibilidad();
    redirigirSiNoCorresponde();
    hookupLogout();
    const badge = document.getElementById("role-badge");
    if (badge) badge.textContent = ROL;
  });
})();
