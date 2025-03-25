import { obtenerSemanaPorId } from "./promesas.js";

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Obtener el ID de la semana desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const semanaId = urlParams.get("semanaId");

  const detalleContainer = document.getElementById("detalle-semana");

  if (!semanaId) {
    detalleContainer.textContent = "No se proporcionó el ID de la semana.";
    document.getElementById("loader").style.display = "none";
    return;
  }

  try {
    // 2. Obtener la información de la semana
    const semanaData = await obtenerSemanaPorId(semanaId);
    if (!semanaData) {
      detalleContainer.textContent = `No se encontró la semana con ID ${semanaId}.`;
      return;
    }

    // 3. Crear la tabla con los datos de cada día
    let html = `
      <h2>Semana ${semanaId}</h2>
      <p style="text-align:center;"><strong>Total Semanal:</strong> $${semanaData.Total_Semanal}</p>
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

    // Definir el orden de los días
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    dias.forEach(dia => {
      if (semanaData[dia]) {
        html += `
          <tr>
            <td>${dia}</td>
            <td>${semanaData[dia].Horas_lolo}</td>
            <td>${semanaData[dia].Horas_limpiesa}</td>
            <td>$${semanaData[dia].Pago_lolo}</td>
            <td>$${semanaData[dia].Pago_limpiesa}</td>
            <td >${semanaData[dia].Procedimiento.replace(/\n/g, "<br>")}</td>
            <td>$${semanaData[dia].Total}</td>
          </tr>
        `;
      }
    });

    html += `
        </tbody>
      </table>
    `;

    detalleContainer.innerHTML = html;
  } catch (error) {
    detalleContainer.textContent = "Error al obtener los datos de la semana.";
    console.error(error);
  } finally {
    // Ocultar el spinner una vez finalizada la carga
    document.getElementById("loader").style.display = "none";
  }
});
