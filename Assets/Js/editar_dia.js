// editar_dia.js
import { obtenerSemanaPorId, actualizarDiaYTotalSemanal } from "./promesas.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Obtener parámetros de la URL: semanaId y dia
  const urlParams = new URLSearchParams(window.location.search);
  const semanaId = urlParams.get("semanaId");
  const dia = urlParams.get("dia");

  if (!semanaId || !dia) {
    alert("Falta información en la URL.");
    return;
  }

  // Cargar datos existentes para mostrar los valores previos
  try {
    const semanaData = await obtenerSemanaPorId(semanaId);
    if (semanaData && semanaData[dia]) {
      const diaData = semanaData[dia];
      document.getElementById("horas_lolo").value = diaData.Horas_lolo || 0;
      document.getElementById("horas_limpiesa").value = diaData.Horas_limpiesa || 0;
      document.getElementById("pago_lolo").value = diaData.Pago_lolo || 0;
      document.getElementById("pago_limpiesa").value = diaData.Pago_limpiesa || 0;
      document.getElementById("total").value = diaData.Total || 0;
      document.getElementById("procedimiento").value = diaData.Procedimiento || "";
    }
  } catch (error) {
    console.error("Error al cargar los datos del día:", error);
  }

  // Botón Calcular
  const btnCalcular = document.getElementById("btn-calcular");
  btnCalcular.addEventListener("click", () => {
    const horasLolo = parseFloat(document.getElementById("horas_lolo").value) || 0;
    const horasLimpieza = parseFloat(document.getElementById("horas_limpiesa").value) || 0;
    const pagoLolo = horasLolo * 90;
    const pagoLimpieza = horasLimpieza * 200;
    const total = pagoLolo + pagoLimpieza;
    
    // Procedimiento en tres líneas separadas
    const procedimiento = `Operación Lolo: 90 x ${horasLolo} = ${pagoLolo}\n` +
                          `Operación Limpieza: 200 x ${horasLimpieza} = ${pagoLimpieza}\n` +
                          `Suma Total: ${pagoLolo} + ${pagoLimpieza} = ${total}`;
    
    document.getElementById("pago_lolo").value = pagoLolo;
    document.getElementById("pago_limpiesa").value = pagoLimpieza;
    document.getElementById("total").value = total;
    document.getElementById("procedimiento").value = procedimiento;
  });

  // Botón Guardar
  const form = document.getElementById("form-editar-dia");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const horasLolo = parseFloat(document.getElementById("horas_lolo").value) || 0;
    const horasLimpieza = parseFloat(document.getElementById("horas_limpiesa").value) || 0;
    const pagoLolo = parseFloat(document.getElementById("pago_lolo").value) || 0;
    const pagoLimpieza = parseFloat(document.getElementById("pago_limpiesa").value) || 0;
    const total = parseFloat(document.getElementById("total").value) || 0;
    const procedimiento = document.getElementById("procedimiento").value;

    // Objeto con los datos actualizados para el día
    const datosActualizados = {
      Horas_lolo: horasLolo,
      Horas_limpiesa: horasLimpieza,
      Pago_lolo: pagoLolo,
      Pago_limpiesa: pagoLimpieza,
      Total: total,
      Procedimiento: procedimiento,
    };

    try {
      await actualizarDiaYTotalSemanal(semanaId, dia, datosActualizados);
      alert("Día actualizado correctamente");
      // Redirige a la página de detalle de la semana en modo administración
      window.location.href = `detalle_semana_admin.html?semanaId=${semanaId}`;
    } catch (error) {
      alert("Error al actualizar el día");
      console.error(error);
    }
  });
});
