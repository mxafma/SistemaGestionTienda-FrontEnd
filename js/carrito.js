// productos.js

// Formato de moneda CLP
const fmtCLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP"
});

// Lista de productos
const productos = [
  {
    id: 1,
    nombre: "Producto 1",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    precio: 8000,
    imagen: "img/producto1.jpg",
    imagenes: ["img/producto1.jpg", "img/producto1b.jpg", "img/producto1c.jpg"]
  },
  {
    id: 2,
    nombre: "Producto 2",
    descripcion: "Producto delicioso con ingredientes de alta calidad.",
    precio: 6000,
    imagen: "img/producto2.jpg",
    imagenes: ["img/producto2.jpg", "img/producto2b.jpg"]
  },
  {
    id: 3,
    nombre: "Producto 3",
    descripcion: "Perfecto para ocasiones especiales.",
    precio: 10000,
    imagen: "img/producto3.jpg",
    imagenes: ["img/producto3.jpg", "img/producto3b.jpg"]
  }
];

// Render en productos.html
document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-productos");
  if (lista) {
    lista.innerHTML = productos
      .map(
        (prod) => `
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <img src="${prod.imagen}" class="card-img-top obj-cover-200" alt="${prod.nombre}">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text small text-muted">${prod.descripcion}</p>
            <p class="fw-bold">${fmtCLP.format(prod.precio)}</p>
            <a href="detalle-producto.html?id=${prod.id}" class="btn btn-sm btn-outline-foodix">Ver detalle</a>
            <button class="btn btn-foodix mt-2" onclick="agregarAlCarrito(${prod.id})">
              <i class="bi bi-cart-plus"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }
});

// --- Carrito ---
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  // Si hay input cantidad (en detalle)
  let cantidad = 1;
  const cantidadInput = document.getElementById("cantidad");
  if (cantidadInput) cantidad = parseInt(cantidadInput.value) || 1;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const item = carrito.find((p) => p.id === id);

  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} agregado al carrito ✅`);
}
