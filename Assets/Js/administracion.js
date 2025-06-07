import { Agregar_Semana, listarSemanas } from "./promesas.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnAgregarSemana = document.getElementById("btnAgregarSemana");
  if (btnAgregarSemana) {
    btnAgregarSemana.addEventListener("click", registrarSemanaFirebase);
  }
  cargarSemanasAdmin();
});

const registrarSemanaFirebase = () => {
  const btn = document.getElementById("btnAgregarSemana");
  const spinner = document.getElementById("spinner-agregar");
  const texto = document.getElementById("texto-agregar");

  // Mostrar spinner, ocultar texto, desactivar botón
  spinner.style.display = "block";
  texto.style.display = "none";
  btn.disabled = true;

  const semana = {
    Lunes: { Horas_lolo: 0, Horas_limpiesa: 0, Pago_lolo: 0, Pago_limpiesa: 0, Procedimiento: "", Total: 0 },
    Martes: { Horas_lolo: 0, Horas_limpiesa: 0, Pago_lolo: 0, Pago_limpiesa: 0, Procedimiento: "", Total: 0 },
    Miercoles: { Horas_lolo: 0, Horas_limpiesa: 0, Pago_lolo: 0, Pago_limpiesa: 0, Procedimiento: "", Total: 0 },
    Jueves: { Horas_lolo: 0, Horas_limpiesa: 0, Pago_lolo: 0, Pago_limpiesa: 0, Procedimiento: "", Total: 0 },
    Viernes: { Horas_lolo: 0, Horas_limpiesa: 0, Pago_lolo: 0, Pago_limpiesa: 0, Procedimiento: "", Total: 0 },
    Sabado: { Horas_lolo: 0, Horas_limpiesa: 0, Pago_lolo: 0, Pago_limpiesa: 0, Procedimiento: "", Total: 0 },
    Domingo: { Horas_lolo: 0, Horas_limpiesa: 0, Pago_lolo: 0, Pago_limpiesa: 0, Procedimiento: "", Total: 0 },
    Total_Semanal: 0
  };

  Agregar_Semana(semana)
    .then(() => {
      console.log("Semana registrada con éxito");

      // Restaurar el botón ANTES de recargar
      spinner.style.display = "none";
      texto.style.display = "inline";
      btn.disabled = false;

      // Luego recarga
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error al registrar semana:", error);

      // Restaurar botón si hay error
      spinner.style.display = "none";
      texto.style.display = "inline";
      btn.disabled = false;

      alert("Error al registrar la semana.");
    });
};



// Función para listar las semanas en modo administración
const cargarSemanasAdmin = async () => {
  try {
    document.getElementById("loader").style.display = "block";
    const listaContainer = document.getElementById("lista-semanas");
    const semanas = await listarSemanas();
    listaContainer.innerHTML = "";

    // 1) Ordenar de más reciente a más antiguo
    semanas.sort((a, b) => b.id - a.id);

    // 2) Calcular total acumulado UNA sola vez
    const labelTotal = document.getElementById("total-ganado");
    const sumaTotal = semanas.reduce((acc, semana) => {
      // Asegurarnos de leer el campo correcto y convertir a número
      return acc + (Number(semana.data.Total_Semanal) || 0);
    }, 0);
    // 3) Mostrarlo en el label
    labelTotal.textContent = `Total Ganado: $${sumaTotal}`;

    // 4) Crear los botones de cada semana
    semanas.forEach((semana, index) => {
      const { id, data } = semana;
      const totalSemanal = data.Total_Semanal;

      const botonSemana = document.createElement("button");
      botonSemana.textContent = `Semana ${id} - $${totalSemanal}`;

      if (index === 0) {
        const etiqueta = document.createElement("span");
        etiqueta.textContent = "Sem. actual";
        etiqueta.style.cssText = `
          background-color: #28a745;
          color: #fff;
          padding: 5px 10px;
          border-radius: 15px;
          margin-left: 10px;
          font-size: 0.9em;
          vertical-align: middle;
        `;
        botonSemana.appendChild(etiqueta);
      }

      botonSemana.addEventListener("click", () => {
        window.location.href = `detalle_semana_admin.html?semanaId=${id}`;
      });

      listaContainer.appendChild(botonSemana);
    });

  } catch (error) {
    console.error("Error al cargar las semanas en administración:", error);
  } finally {
    document.getElementById("loader").style.display = "none";
  }
};

