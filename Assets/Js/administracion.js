import { Agregar_Semana, listarSemanas } from "./promesas.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnAgregarSemana = document.getElementById("btnAgregarSemana");
  if (btnAgregarSemana) {
    btnAgregarSemana.addEventListener("click", registrarSemanaFirebase);
  }
  cargarSemanasAdmin();
});

// Función para agregar una nueva semana
const registrarSemanaFirebase = () => {
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

  console.log("Semana a registrar:", semana);
  Agregar_Semana(semana)
    .then(() => {
      console.log("Semana registrada con éxito");
      // Recargamos la página para ver el nuevo botón en la lista
      window.location.reload();
    })
    .catch((error) => {
      console.error("Ocurrió un error al registrar la semana:", error);
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

    semanas.forEach((semana) => {
      const { id, data } = semana;
      const totalSemanal = data.Total_Semanal;
      
      // Creamos un botón para cada semana
      const botonSemana = document.createElement("button");
      botonSemana.textContent = `Semana ${id} - $${totalSemanal}`;
      
      // Redirige a detalle_semana_admin.html pasando el ID de la semana en la query string
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
