// validaciones-products.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productoForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let esValido = true;

    // --- Código ---
    const codigo = document.getElementById("codigo");
    if (codigo.value.trim().length < 3) {
      marcarInvalido(codigo, "El código debe tener al menos 3 caracteres");
      esValido = false;
    } else {
      marcarValido(codigo);
    }

    // --- Nombre ---
    const nombre = document.getElementById("nombre");
    if (nombre.value.trim() === "" || nombre.value.length > 100) {
      marcarInvalido(nombre, "Nombre requerido (máx. 100 caracteres)");
      esValido = false;
    } else {
      marcarValido(nombre);
    }

    // --- Descripción (opcional) ---
    const descripcion = document.getElementById("descripcion");
    if (descripcion.value.length > 500) {
      marcarInvalido(descripcion, "Máximo 500 caracteres");
      esValido = false;
    } else {
      marcarValido(descripcion);
    }

    // --- Precio ---
    const precio = document.getElementById("precio");
    if (precio.value === "" || parseFloat(precio.value) < 0) {
      marcarInvalido(precio, "Ingrese un precio válido (mínimo 0)");
      esValido = false;
    } else {
      marcarValido(precio);
    }

    // --- Stock ---
    const stock = document.getElementById("stock");
    if (stock.value === "" || parseInt(stock.value) < 0) {
      marcarInvalido(stock, "Stock requerido (mínimo 0)");
      esValido = false;
    } else {
      marcarValido(stock);
    }

    // --- Stock Crítico (opcional) ---
    const stockCritico = document.getElementById("stockCritico");
    if (stockCritico.value !== "" && parseInt(stockCritico.value) < 0) {
      marcarInvalido(stockCritico, "Stock crítico debe ser mayor o igual a 0");
      esValido = false;
    } else {
      marcarValido(stockCritico);
    }

    // --- Categoría ---
    const categoria = document.getElementById("categoria");
    if (categoria.value === "") {
      marcarInvalido(categoria, "Debe seleccionar una categoría");
      esValido = false;
    } else {
      marcarValido(categoria);
    }

    // --- Imagen (opcional, no requiere validación extra) ---
    marcarValido(document.getElementById("imagen"));

    // --- Enviar si todo válido ---
    if (esValido) {
      alert("Producto válido ✅ (aquí se enviaría al backend)");
      form.reset();
      limpiarClases(form);
    }
  });
});

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
  const inputs = form.querySelectorAll("input, textarea, select");
  inputs.forEach(input => {
    input.classList.remove("is-valid", "is-invalid");
  });
}
