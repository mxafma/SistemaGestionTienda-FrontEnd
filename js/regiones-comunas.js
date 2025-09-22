// regiones-comunas.js

const regionesYComunas = {
  "Región Metropolitana": ["Santiago", "Puente Alto", "Maipú", "La Florida"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
  "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"],
  "Coquimbo": ["La Serena", "Coquimbo"]
};

document.addEventListener("DOMContentLoaded", () => {
  const regionSelect = document.getElementById("region");
  const comunaSelect = document.getElementById("comuna");

  // Cargar regiones
  Object.keys(regionesYComunas).forEach(region => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  });

  // Al cambiar región → cargar comunas
  regionSelect.addEventListener("change", () => {
    const region = regionSelect.value;
    comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';

    if (region && regionesYComunas[region]) {
      regionesYComunas[region].forEach(comuna => {
        const option = document.createElement("option");
        option.value = comuna;
        option.textContent = comuna;
        comunaSelect.appendChild(option);
      });
    }
  });
});
