console.log("Frontend Foodix cargado correctamente");

// --- Datos de ejemplo (puedes cambiarlos o cargarlos luego desde el backend) ---
const productos = [
  {
    id: 1,
    nombre: "Aceite de Oliva Extra 1L",
    precio: 7990,
    imagen: "img/aceite-oliva.jpg",
    imagenes: [
      "img/aceite-oliva.jpg",
      "img/aceite-oliva2.jpg",
      "img/aceite-oliva3.jpg"
    ],
    descripcion: "Aceite de oliva extra virgen, ideal para ensaladas y cocina saludable."
  },
  {
    id: 2,
    nombre: "Arroz Basmati 5kg",
    precio: 20990,
    imagen: "img/arroz-basmati.jpg",
    imagenes: [
      "img/arroz-basmati.jpg",
      "img/arroz-basmati2.jpg",
      "img/arroz-basmati3.jpg"
    ],
    descripcion: "Arroz Basmati de grano largo, perfecto para platos orientales y gourmet."
  },
  {
    id: 3,
    nombre: "Harina Integral 25kg",
    precio: 25990,
    imagen: "img/harina-integral.jpg",
    imagenes: [
      "img/harina-integral.jpg",
      "img/harina-integral2.jpg",
      "img/harina-integral3.jpg"
    ],
    descripcion: "Harina integral para panadería y repostería saludable."
  },
  {
    id: 4,
    nombre: "Vinagre Balsámico 500ml",
    precio: 6990,
    imagen: "img/vinagre-balsamico.jpg",
    imagenes: [
      "img/vinagre-balsamico.jpg",
      "img/vinagre-balsamico2.jpg",
      "img/vinagre-balsamico3.jpg"
    ],
    descripcion: "Vinagre balsámico italiano, excelente para aderezos y marinados."
  },
  {
    id: 5,
    nombre: "Pimienta Negra 250gr",
    precio: 2500,
    imagen: "img/pimienta-negra.jpg",
    imagenes: [
      "img/pimienta-negra.jpg",
      "img/pimienta-negra2.jpg",
      "img/pimienta-negra3.jpg"
    ],
    descripcion: "Pimienta negra molida, condimento esencial en la cocina."
  },
  {
    id: 6,
    nombre: "Sal de Mar 1kg",
    precio: 18990,
    imagen: "img/sal-mar.jpg",
    imagenes: [
      "img/sal-mar.jpg",
      "img/sal-mar2.jpg",
      "img/sal-mar3.jpg"
    ],
    descripcion: "Sal de mar natural, ideal para realzar el sabor de tus comidas."
  },
  {
    id: 7,
    nombre: "Tomate Deshidratado 25gr",
    precio: 2550,
    imagen: "img/tomate-deshidratado.jpg",
    imagenes: [
      "img/tomate-deshidratado.jpg",
      "img/tomate-deshidratado2.jpg",
      "img/tomate-deshidratado3.jpg"
    ],
    descripcion: "Tomate deshidratado, perfecto para ensaladas y pastas."
  },
  {
    id: 8,
    nombre: "Queso Parmesano Reggiano Dop 18m Boni. Italiano 1kg",
    precio: 46990,
    imagen: "img/queso-parmesano.jpg",
    imagenes: [
      "img/queso-parmesano.jpg",
      "img/queso-parmesano2.jpg",
      "img/queso-parmesano3.jpg"
    ],
    descripcion: "Queso parmesano italiano madurado 18 meses, sabor intenso y auténtico."
  }
];

// --- Formato de moneda (Chile) ---
const fmtCLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });



// --- Acción placeholder (más adelante se conecta al carrito real) ---
function agregarAlCarrito(id) {
  const prod = productos.find(x => x.id === id);
  if (!prod) return;

  // cantidad (detalle) o 1
  let cantidad = 1;
  const cantidadInput = document.getElementById("cantidad");
  if (cantidadInput) cantidad = parseInt(cantidadInput.value) || 1;

  let carrito = getCarrito();
  const item = carrito.find((p) => p.id === id);

  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ ...prod, cantidad });
  }

  saveCarrito(carrito); // guarda y actualiza contador
  alert(`${prod.nombre} agregado al carrito ✅`);
}


// --- stilo uniforme para imágenes ---
(function ensureHelpers() {
  const style = document.createElement("style");
  style.textContent = `
    .obj-cover-200 {
      height:200px;
      object-fit:cover;
      object-position:center;
    }
  `;
  document.head.appendChild(style);
})();

// --- Ejecutar al cargar la página --- (editar cantidad mostrada con (productos,CANTIDAD))
document.addEventListener("DOMContentLoaded", () => {
  renderProductos(productos, "lista-productos");        // productos.html (todos los producot)
  renderProductos(productos, "lista-productos-home", 8); // index.html (los primeros 8)
});

// -------------------------------------------------------------------
// EJEMPLO de conexión al backend (Railway) para registrar usuario
// más adelante lo conectaremos con el formulario de registro 
async function registrarUsuario() {
  try {
    const response = await fetch("https://scintillating-renewal-production.up.railway.app/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Matias",
        password: "clave",
        role: "USER"
      })
    });

    if (!response.ok) throw new Error("Error en la petición");

    const data = await response.json();
    console.log("Respuesta backend:", data);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
  }
}



// Render de cards en productos.html
//cantidad es para limitar la cantidad de productos mostrados (ej. en home)
function renderProductos(lista, containerId = "lista-productos", cantidad = null) {
  const cont = document.getElementById(containerId);
  if (!cont) return;

  let subset = lista;
  if (cantidad !== null) {
    subset = lista.slice(0, cantidad);
  }

  cont.innerHTML = subset.map(p => `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="card h-100 shadow-sm">
        <img src="${p.imagen}" class="card-img-top obj-cover-200" alt="${p.nombre}" 
             onerror="this.src='img/placeholder.jpg'">
        <div class="card-body d-flex flex-column">
          <!-- Título clickeable -->
          <h6 class="card-title mb-1">
            <a href="detalle-producto.html?id=${p.id}" class="text-decoration-none text-dark">
              ${p.nombre}
            </a>
          </h6>
          <p class="card-text text-muted mb-3">${fmtCLP.format(p.precio)}</p>
          
          <!-- Botón añadir al carrito -->
          <button class="btn btn-foodix mt-auto" onclick="agregarAlCarrito(${p.id})">
            <i class="bi bi-cart-plus"></i> Añadir
          </button>
        </div>
      </div>
    </div>
  `).join("");
}


// Helper para imágenes consistentes
(function ensureHelpers() {
  const style = document.createElement("style");
  style.textContent = `
    .obj-cover-200 {
      height: 200px;
      object-fit: cover;
      object-position: center;
    }
  `;
  document.head.appendChild(style);
})();

// Render en DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  renderProductos(productos);
});
