// productos.js

const productos = [
  { id: 1, nombre: "Producto 1", descripcion: "Descripción breve", precio: 8000, imagen: "img/producto1.jpg" },
  { id: 2, nombre: "Producto 2", descripcion: "Descripción breve", precio: 6000, imagen: "img/producto2.jpg" },
  { id: 3, nombre: "Producto 3", descripcion: "Descripción breve", precio: 10000, imagen: "img/producto3.jpg" }
];

// Mostrar productos en productos.html
document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("lista-productos");
  if (lista) {
    lista.innerHTML = "";
    productos.forEach(prod => {
      lista.innerHTML += `
        <div class="col-md-4">
          <div class="card shadow-sm h-100">
            <img src="${prod.imagen}" class="card-img-top obj-cover-200" alt="${prod.nombre}">
            <div class="card-body">
              <h5 class="card-title">${prod.nombre}</h5>
              <p class="card-text small text-muted">${prod.descripcion}</p>
              <p class="fw-bold">$ ${prod.precio.toLocaleString("es-CL")}</p>
              <button class="btn btn-foodix" onclick="agregarAlCarrito(${prod.id})">
                <i class="bi bi-cart-plus"></i> Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      `;
    });
  }
});

// Carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const item = carrito.find(p => p.id === id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} agregado al carrito ✅`);
}

// para usar funciones de carrito-utils.js
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  // cantidad (detalle) o 1
  let cantidad = 1;
  const cantidadInput = document.getElementById("cantidad");
  if (cantidadInput) cantidad = parseInt(cantidadInput.value) || 1;

  let carrito = getCarrito();
  const item = carrito.find((p) => p.id === id);

  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  saveCarrito(carrito); // guarda y actualiza contador
  alert(`${producto.nombre} agregado al carrito ✅`);
}
