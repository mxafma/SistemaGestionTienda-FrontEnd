document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  const prod = productos.find(p => p.id === id);
  const cont = document.getElementById("detalle-producto");

  if (!prod) {
    cont.innerHTML = `<p class="text-danger">Producto no encontrado</p>`;
    return;
  }

  // Imagen principal + miniaturas
  let miniaturas = prod.imagenes.map((img, i) => `
    <img src="${img}" class="img-thumbnail me-2 thumb-img ${i===0 ? 'border-primary' : ''}" 
         style="width:70px; height:70px; object-fit:cover; cursor:pointer"
         onclick="cambiarImagen('${img}')">
  `).join("");

  cont.innerHTML = `
    <div class="row g-4">
      <!-- Galería -->
      <div class="col-md-6">
        <img id="img-principal" src="${prod.imagen}" class="img-fluid rounded shadow-sm mb-3" alt="${prod.nombre}">
        <div class="d-flex">${miniaturas}</div>
      </div>

      <!-- Info producto -->
      <div class="col-md-6">
        <h2 class="fw-bold">${prod.nombre}</h2>
        <p class="text-muted fs-5">${fmtCLP.format(prod.precio)}</p>
        <p>${prod.descripcion}</p>

        <label for="cantidad" class="form-label">Cantidad</label>
        <input type="number" id="cantidad" class="form-control w-25 mb-3" min="1" value="1">

        <button class="btn btn-foodix" onclick="agregarAlCarrito(${prod.id})">
          <i class="bi bi-cart-plus"></i> Añadir al carrito
        </button>
      </div>
    </div>

    <!-- Productos relacionados -->
    <div class="mt-5">
      <h4 class="brand mb-4">Productos relacionados</h4>
      <div class="row g-4" id="relacionados"></div>
    </div>
  `;

  // Render relacionados (excluye el actual, muestra 4 random)
  const relacionadosCont = document.getElementById("relacionados");
  const relacionados = productos.filter(p => p.id !== prod.id).sort(() => 0.5 - Math.random()).slice(0,4);

  relacionadosCont.innerHTML = relacionados.map(r => `
    <div class="col-6 col-md-3">
      <div class="card h-100 shadow-sm">
        <img src="${r.imagen}" class="card-img-top obj-cover-200" alt="${r.nombre}">
        <div class="card-body text-center">
          <h6 class="card-title mb-1">
            <a href="detalle-producto.html?id=${r.id}" class="text-decoration-none text-dark">${r.nombre}</a>
          </h6>
          <p class="text-muted mb-2">${fmtCLP.format(r.precio)}</p>
          <a href="detalle-producto.html?id=${r.id}" class="btn btn-sm btn-outline-foodix">Ver detalle</a>
        </div>
      </div>
    </div>
  `).join("");
});

// Cambiar imagen principal
function cambiarImagen(src) {
  document.getElementById("img-principal").src = src;
}