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

    let html = `<h2 style="text-align:center;">Semana ${semanaId}</h2>`;
    html += `
      <table>
        <thead>
          <tr>
            <th>Día</th>
            <th>Horas Lolo</th>
            <th>Horas Limpieza</th>
            <th>Pago Lolo</th>
            <th>Pago Limpieza</th>
            <th>Procedimiento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
    `;

    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    dias.forEach(dia => {
      if (semanaData[dia]) {
        html += `
          <tr>
            <td>
              <button class="dia-btn" onclick="window.location.href='editar_dia.html?semanaId=${semanaId}&dia=${dia}'">${dia}</button>
            </td>
            <td>${semanaData[dia].Horas_lolo}</td>
            <td>${semanaData[dia].Horas_limpiesa}</td>
            <td>$${semanaData[dia].Pago_lolo}</td>
            <td>$${semanaData[dia].Pago_limpiesa}</td>
            <td>
              <button class="btn toggle-btn" onclick="toggleProcedimiento(this)">Mostrar</button>
              <div class="procedimiento-content" style="display: none;">
                ${semanaData[dia].Procedimiento.replace(/\n/g, "<br>")}
              </div>
            </td>
            <td>$${semanaData[dia].Total}</td>
          </tr>
        `;
      }
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
  } catch (error) {
    container.textContent = "Error al cargar la semana.";
    console.error(error);
  }
});

// Función para mostrar/ocultar el contenido del procedimiento
window.toggleProcedimiento = function(button) {
  const content = button.nextElementSibling;
  if (content.style.display === "none") {
    content.style.display = "block";
    button.textContent = "Ocultar";
  } else {
    content.style.display = "none";
    button.textContent = "Mostrar";
  }
};
