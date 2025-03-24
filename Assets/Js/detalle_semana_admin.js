// detalle_semana_admin.js
import { obtenerSemanaPorId } from "./promesas.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Obtener el ID de la semana desde la URL, ej: detalle_semana_admin.html?semanaId=3
  const urlParams = new URLSearchParams(window.location.search);
  const semanaId = urlParams.get("semanaId");
  const container = document.getElementById("detalle-semana-admin");

  if (!semanaId) {
    container.textContent = "No se proporcionó el ID de la semana.";
    return;
  }

  try {
    const semanaData = await obtenerSemanaPorId(semanaId);
    if (!semanaData) {
      container.textContent = "Semana no encontrada.";
      return;
    }

    container.innerHTML = `<h2>Semana ${semanaId}</h2>`;
    // Lista de días de la semana
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    dias.forEach((dia) => {
      const botonDia = document.createElement("button");
      botonDia.textContent = dia;
      // Al pulsar el botón, se redirige a la página para editar ese día, pasando el ID de la semana y el nombre del día
      botonDia.addEventListener("click", () => {
        window.location.href = `editar_dia.html?semanaId=${semanaId}&dia=${dia}`;
      });
      container.appendChild(botonDia);
    });
  } catch (error) {
    container.textContent = "Error al cargar la semana.";
  }
});
