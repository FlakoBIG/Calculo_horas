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

  // Función para convertir tiempo "HH:MM" a horas decimales (solo para cálculos)
  function convertirATiempoDecimal(tiempoStr) {
    if (!tiempoStr) return 0;
    const partes = tiempoStr.split(':');
    const horas = parseInt(partes[0]) || 0;
    const minutos = parseInt(partes[1]) || 0;
    return horas + minutos / 60;
  }

  // Cargar datos existentes para mostrar los valores previos
  try {
    const semanaData = await obtenerSemanaPorId(semanaId);
    if (semanaData && semanaData[dia]) {
      const diaData = semanaData[dia];
      // Se asume que en la base de datos se guardan como string "HH:MM"
      document.getElementById("horas_lolo").value = diaData.Horas_lolo || "00:00";
      document.getElementById("horas_limpiesa").value = diaData.Horas_limpiesa || "00:00";
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
    const tiempoLolo = document.getElementById("horas_lolo").value;
    const tiempoLimpieza = document.getElementById("horas_limpiesa").value;

    // Convertir el tiempo a decimal para poder hacer el cálculo
    const horasLoloDecimal = convertirATiempoDecimal(tiempoLolo);
    const horasLimpiezaDecimal = convertirATiempoDecimal(tiempoLimpieza);

    const pagoLolo = horasLoloDecimal * 90;
    const pagoLimpieza = horasLimpiezaDecimal * 200;
    const total = pagoLolo + pagoLimpieza;
    
    // Se formatea el procedimiento con separadores y saltos de línea
    const procedimiento =
`Conversión Lolo: ${tiempoLolo} = ${horasLoloDecimal.toFixed(2)} horas
Operación Lolo: 90 x ${horasLoloDecimal.toFixed(2)} = ${pagoLolo.toFixed(2)}
--------------------------------
Conversión Limpieza: ${tiempoLimpieza} = ${horasLimpiezaDecimal.toFixed(2)} horas
Operación Limpieza: 200 x ${horasLimpiezaDecimal.toFixed(2)} = ${pagoLimpieza.toFixed(2)}
--------------------------------
Suma Total: ${pagoLolo.toFixed(2)} + ${pagoLimpieza.toFixed(2)} = ${total.toFixed(2)}`;

    document.getElementById("pago_lolo").value = pagoLolo.toFixed(2);
    document.getElementById("pago_limpiesa").value = pagoLimpieza.toFixed(2);
    document.getElementById("total").value = total.toFixed(2);
    document.getElementById("procedimiento").value = procedimiento;
  });

  // Botón Guardar
  const form = document.getElementById("form-editar-dia");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Se toman los valores originales del input (formato "HH:MM")
    const tiempoLolo = document.getElementById("horas_lolo").value;
    const tiempoLimpieza = document.getElementById("horas_limpiesa").value;
    
    // Se sigue haciendo la conversión para calcular pagos
    const horasLoloDecimal = convertirATiempoDecimal(tiempoLolo);
    const horasLimpiezaDecimal = convertirATiempoDecimal(tiempoLimpieza);
    const pagoLolo = parseFloat(document.getElementById("pago_lolo").value) || 0;
    const pagoLimpieza = parseFloat(document.getElementById("pago_limpiesa").value) || 0;
    const total = parseFloat(document.getElementById("total").value) || 0;
    const procedimiento = document.getElementById("procedimiento").value;

    // Objeto con los datos actualizados para el día.
    // Se almacenan los tiempos en formato "HH:MM", no el valor decimal.
    const datosActualizados = {
      Horas_lolo: tiempoLolo,
      Horas_limpiesa: tiempoLimpieza,
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
