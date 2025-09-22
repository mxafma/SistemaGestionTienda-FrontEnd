// carrito-utils.js
function getCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function saveCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCartCount();
}

function actualizarCartCount() {
  const carrito = getCarrito();
  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = totalItems;
}

// Inicializar contador en cada carga
document.addEventListener("DOMContentLoaded", actualizarCartCount);
