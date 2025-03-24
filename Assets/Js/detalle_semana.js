// detalle_semana.js
import { obtenerSemanaPorId } from "./promesas.js";

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Obtener el ID de la semana desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const semanaId = urlParams.get("semanaId");

  const detalleContainer = document.getElementById("detalle-semana");

  if (!semanaId) {
    detalleContainer.textContent = "No se proporcionó el ID de la semana.";
    return;
  }

  try {
    // 2. Llamar a la función que obtiene la semana por ID
    const semanaData = await obtenerSemanaPorId(semanaId);
    if (!semanaData) {
      detalleContainer.textContent = `No se encontró la semana con ID ${semanaId}.`;
      return;
    }

    // 3. Mostrar todos los datos en pantalla
    //    Aquí puedes formatear la información como gustes
    //    Por ejemplo, mostrar día por día
    detalleContainer.innerHTML = `
      <h2>Semana ${semanaId}</h2>
      <p><strong>Total Semanal:</strong> $${semanaData.Total_Semanal}</p>
      <h3>Lunes</h3>
      <p>Horas_lolo: ${semanaData.Lunes.Horas_lolo}</p>
      <p>Horas_limpiesa: ${semanaData.Lunes.Horas_limpiesa}</p>
      <p>Pago_lolo: ${semanaData.Lunes.Pago_lolo}</p>
      <p>Pago_limpiesa: ${semanaData.Lunes.Pago_limpiesa}</p>
      <p>Procedimiento: ${semanaData.Lunes.Procedimiento}</p>
      <p>Total: ${semanaData.Lunes.Total}</p>
      
      <h3>Martes</h3>
      <p>Horas_lolo: ${semanaData.Martes.Horas_lolo}</p>
      <p>Horas_limpiesa: ${semanaData.Martes.Horas_limpiesa}</p>
      <p>Pago_lolo: ${semanaData.Martes.Pago_lolo}</p>
      <p>Pago_limpiesa: ${semanaData.Martes.Pago_limpiesa}</p>
      <p>Procedimiento: ${semanaData.Martes.Procedimiento}</p>
      <p>Total: ${semanaData.Martes.Total}</p>

      <!-- Repite lo mismo para Miercoles, Jueves, etc. -->
      
      <h3>Miercoles</h3>
      <p>Horas_lolo: ${semanaData.Miercoles.Horas_lolo}</p>
      <p>Horas_limpiesa: ${semanaData.Miercoles.Horas_limpiesa}</p>
      <p>Pago_lolo: ${semanaData.Miercoles.Pago_lolo}</p>
      <p>Pago_limpiesa: ${semanaData.Miercoles.Pago_limpiesa}</p>
      <p>Procedimiento: ${semanaData.Miercoles.Procedimiento}</p>
      <p>Total: ${semanaData.Miercoles.Total}</p>

      <h3>Jueves</h3>
      <p>Horas_lolo: ${semanaData.Jueves.Horas_lolo}</p>
      <p>Horas_limpiesa: ${semanaData.Jueves.Horas_limpiesa}</p>
      <p>Pago_lolo: ${semanaData.Jueves.Pago_lolo}</p>
      <p>Pago_limpiesa: ${semanaData.Jueves.Pago_limpiesa}</p>
      <p>Procedimiento: ${semanaData.Jueves.Procedimiento}</p>
      <p>Total: ${semanaData.Jueves.Total}</p>

      <h3>Viernes</h3>
      <p>Horas_lolo: ${semanaData.Viernes.Horas_lolo}</p>
      <p>Horas_limpiesa: ${semanaData.Viernes.Horas_limpiesa}</p>
      <p>Pago_lolo: ${semanaData.Viernes.Pago_lolo}</p>
      <p>Pago_limpiesa: ${semanaData.Viernes.Pago_limpiesa}</p>
      <p>Procedimiento: ${semanaData.Viernes.Procedimiento}</p>
      <p>Total: ${semanaData.Viernes.Total}</p>

      <h3>Sabado</h3>
      <p>Horas_lolo: ${semanaData.Sabado.Horas_lolo}</p>
      <p>Horas_limpiesa: ${semanaData.Sabado.Horas_limpiesa}</p>
      <p>Pago_lolo: ${semanaData.Sabado.Pago_lolo}</p>
      <p>Pago_limpiesa: ${semanaData.Sabado.Pago_limpiesa}</p>
      <p>Procedimiento: ${semanaData.Sabado.Procedimiento}</p>
      <p>Total: ${semanaData.Sabado.Total}</p>

      <h3>Domingo</h3>
      <p>Horas_lolo: ${semanaData.Domingo.Horas_lolo}</p>
      <p>Horas_limpiesa: ${semanaData.Domingo.Horas_limpiesa}</p>
      <p>Pago_lolo: ${semanaData.Domingo.Pago_lolo}</p>
      <p>Pago_limpiesa: ${semanaData.Domingo.Pago_limpiesa}</p>
      <p>Procedimiento: ${semanaData.Domingo.Procedimiento}</p>
      <p>Total: ${semanaData.Domingo.Total}</p>
    `;
  } catch (error) {
    detalleContainer.textContent = "Error al obtener los datos de la semana.";
    console.error(error);
  }
});
