
import {
  Agregar_Semana,
  iniciarSesionUsuario,
  listarSemanas
} from "./promesas.js";

console.log("script.js cargado");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM completamente cargado");

  const btnIniciarSesion = document.getElementById("btniniciarsesion");
  if (btnIniciarSesion) {
    btnIniciarSesion.addEventListener("click", iniciarsesion);
  }

  const btnAgregarSemana = document.getElementById("btnAgregarSemana");
  if (btnAgregarSemana) {
    btnAgregarSemana.addEventListener("click", registrarSemanaFirebase);
  }

  // Al cargar la página, mostramos las semanas como botones
  cargarSemanas();
});

const registrarSemanaFirebase = () => {
  const semana = {
    Lunes: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Martes: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Miercoles: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Jueves: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Viernes: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Sabado: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Domingo: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Total_Semanal: 0
  };

  Agregar_Semana(semana)
    .then(() => {
      console.log("Semana registrada con éxito");
      // Recargamos la página
      window.location.reload();
    })
    .catch((error) => {
      console.log("Ocurrió un error al registrar la semana: " + error);
    });
};

const iniciarsesion = async () => {
  const nombre = document.getElementById("nombre").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();

  if (!nombre || !contrasena) {
    console.log("Por favor, completa ambos campos.");
    return;
  }

  try {
    const querySnapshot = await iniciarSesionUsuario(nombre, contrasena);
    if (!querySnapshot.empty) {
      console.log("Inicio de sesión exitoso");
      window.location.href = "administracion.html";
    } else {
      console.log("Nombre o contraseña incorrectos");
    }
  } catch (error) {
    console.log("Error al iniciar sesión:", error);
  }
};

// MOSTRAR LAS SEMANAS COMO BOTONES
const cargarSemanas = async () => {
  try {
    const listaContainer = document.getElementById("lista-semanas");
    const semanas = await listarSemanas();
    listaContainer.innerHTML = "";

    // Ordenar las semanas de mayor a menor según su ID
    semanas.sort((a, b) => b.id - a.id);

    semanas.forEach((semana) => {
      const { id, data } = semana;
      const totalSemanal = data.Total_Semanal;

      // Creamos un botón en lugar de un div
      const botonSemana = document.createElement("button");
      botonSemana.textContent = `Semana ${id} - $${totalSemanal}`;

      // Al hacer clic, redirigimos a detalle_semana.html pasando el ID
      botonSemana.addEventListener("click", () => {
        window.location.href = `detalle_semana.html?semanaId=${id}`;
      });

      listaContainer.appendChild(botonSemana);
    });
  } catch (error) {
    console.error("Error al cargar las semanas:", error);
  }
};
