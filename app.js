document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("vinoForm");
  const lista = document.getElementById("vinoLista");

  let vinos = JSON.parse(localStorage.getItem("vinos")) || [];

  renderVinos();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const vino = {
      id: Date.now(),
      nombre: document.getElementById("nombre").value,
      bodega: document.getElementById("bodega").value,
      varietal: document.getElementById("varietal").value,
      rating: document.getElementById("rating").value,
      comentario: document.getElementById("comentario").value,
      usuario: document.getElementById("usuario").value,
    };

    vinos.push(vino);
    guardarVinos();
    renderVinos();
    form.reset();
  });

  function guardarVinos() {
    localStorage.setItem("vinos", JSON.stringify(vinos));
  }

  function eliminarVino(id) {
    vinos = vinos.filter((vino) => vino.id !== id);
    guardarVinos();
    renderVinos();
  }

  function renderVinos() {
    lista.innerHTML = "";

    vinos.forEach((vino) => {
      const card = document.createElement("div");
      card.classList.add("vino-card");

      card.innerHTML = `
        <h3>${vino.nombre}</h3>
        <p><strong>Bodega:</strong> ${vino.bodega || "-"}</p>
        <p><strong>Varietal:</strong> ${vino.varietal || "-"}</p>
        <p class="rating">${"⭐".repeat(vino.rating)}</p>
        <p>${vino.comentario || "Sin comentarios"}</p>
        <p class="usuario">Cargado por ${vino.usuario}</p>
        <button class="delete-btn">Eliminar 🗑️</button>
      `;

      card.querySelector(".delete-btn").addEventListener("click", () => {
        eliminarVino(vino.id);
      });

      lista.prepend(card);
    });
  }
});

/* REGISTRO DEL SERVICE WORKER (PWA) */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log("Service Worker registrado ✅"))
    .catch((error) => console.error("Error al registrar SW ❌", error));
}

