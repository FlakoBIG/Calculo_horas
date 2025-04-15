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
    // Mostrar el spinner mientras se carga la información
    document.getElementById("loader").style.display = "block";

    const listaContainer = document.getElementById("lista-semanas");
    const semanas = await listarSemanas();
    listaContainer.innerHTML = "";

    // Ordenar de mayor a menor (la primera será la más reciente)
    semanas.sort((a, b) => b.id - a.id);

    semanas.forEach((semana, index) => {
      const { id, data } = semana;
      const totalSemanal = data.Total_Semanal;
      
      // Crear un botón para cada semana
      const botonSemana = document.createElement("button");
      botonSemana.textContent = `Semana ${id} - $${totalSemanal}`;
      
      // Si es la semana más actual, agregar una etiqueta para remarcarlo
      if (index === 0) {
        const etiqueta = document.createElement("span");
        etiqueta.textContent = "Sem. actual";
        etiqueta.style.backgroundColor = "#28a745"; // verde
        etiqueta.style.color = "#fff";
        etiqueta.style.padding = "5px 10px";
        etiqueta.style.borderRadius = "15px";
        etiqueta.style.marginLeft = "10px";
        etiqueta.style.fontSize = "0.9em";
        etiqueta.style.verticalAlign = "middle";

        botonSemana.appendChild(etiqueta);
      }
      
      // Redirigir a detalle_semana_admin.html pasando el ID de la semana como query string
      botonSemana.addEventListener("click", () => {
        window.location.href = `detalle_semana_admin.html?semanaId=${id}`;
      });

      listaContainer.appendChild(botonSemana);
    });
  } catch (error) {
    console.error("Error al cargar las semanas en administración:", error);
  } finally {
    // Ocultar el spinner una vez finalizada la carga
    document.getElementById("loader").style.display = "none";
  }
};
