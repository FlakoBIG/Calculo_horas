import { obtenerSemanaPorId, actualizarDiaYTotalSemanal } from "./promesas.js";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const semanaId = urlParams.get("semanaId");
  const dia = urlParams.get("dia");

  if (!semanaId || !dia) {
    alert("Falta información en la URL.");
    return;
  }

  function convertirATiempoDecimal(tiempoStr) {
    if (!tiempoStr) return 0;
    const [horas, minutos] = tiempoStr.split(':').map(Number);
    return horas + minutos / 60;
  }

  try {
    const semanaData = await obtenerSemanaPorId(semanaId);
    if (semanaData && semanaData[dia]) {
      const diaData = semanaData[dia];
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

  document.getElementById("btn-calcular").addEventListener("click", () => {
    const tiempoLolo = document.getElementById("horas_lolo").value;
    const tiempoLimpieza = document.getElementById("horas_limpiesa").value;

    const horasLoloDecimal = convertirATiempoDecimal(tiempoLolo);
    const horasLimpiezaDecimal = convertirATiempoDecimal(tiempoLimpieza);

    const pagoLolo = horasLoloDecimal * 90;
    const pagoLimpieza = horasLimpiezaDecimal * 200;
    const total = pagoLolo + pagoLimpieza;

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

  const form = document.getElementById("form-editar-dia");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Mostrar spinner y ocultar texto
    const btnGuardar = document.getElementById("btn-guardar");
    const texto = document.getElementById("guardar-texto");
    const spinner = document.getElementById("spinner-guardar");
    texto.style.display = "none";
    spinner.style.display = "block";
    btnGuardar.disabled = true;

    const tiempoLolo = document.getElementById("horas_lolo").value;
    const tiempoLimpieza = document.getElementById("horas_limpiesa").value;

    const pagoLolo = parseFloat(document.getElementById("pago_lolo").value) || 0;
    const pagoLimpieza = parseFloat(document.getElementById("pago_limpiesa").value) || 0;
    const total = parseFloat(document.getElementById("total").value) || 0;
    const procedimiento = document.getElementById("procedimiento").value;

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
      window.location.href = `detalle_semana_admin.html?semanaId=${semanaId}`;
    } catch (error) {
      alert("Error al actualizar el día");
      console.error(error);
      // Revertir si hay error
      texto.style.display = "inline";
      spinner.style.display = "none";
      btnGuardar.disabled = false;
    }
  });
});
