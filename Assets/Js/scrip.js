
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
      Horas_lolo: "",
      Horas_limpiesa: "",
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Martes: {
      Horas_lolo: "",
      Horas_limpiesa: "",
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Miercoles: {
      Horas_lolo: "",
      Horas_limpiesa: "",
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Jueves: {
      Horas_lolo: "",
      Horas_limpiesa: "",
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Viernes: {
      Horas_lolo: "",
      Horas_limpiesa: "",
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Sabado: {
      Horas_lolo: "",
      Horas_limpiesa: "",
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: "",
      Total: 0
    },
    Domingo: {
      Horas_lolo: "",
      Horas_limpiesa: "",
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
      window.location.reload();
    })
    .catch((error) => {
      console.log("Ocurrió un error al registrar la semana: " + error);
      btnAgregarSemana.disabled = false; // Reactiva el botón si hay error
      btnAgregarSemana.innerHTML = "Agregar Semana"; // Restaura el texto del botón
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
      window.location.href = "Administracion.html";
    } else {
      console.log("Nombre o contraseña incorrectos");
    }
  } catch (error) {
    console.log("Error al iniciar sesión:", error);
  }
};

const cargarSemanas = async () => {
  try {
    const listaContainer = document.getElementById("lista-semanas");
    const semanas = await listarSemanas();
    listaContainer.innerHTML = "";

    // Ordenar de mayor a menor (la primera será la más reciente)
    semanas.sort((a, b) => b.id - a.id);

    semanas.forEach((semana, index) => {
      const { id, data } = semana;
      const totalSemanal = data.Total_Semanal;

      // Crear contenedor tipo botón
      const botonSemana = document.createElement("button");
      botonSemana.textContent = `Semana ${id} - $${totalSemanal}`;

      // Si es la más reciente (primera del array), agregar distintivo
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

      botonSemana.addEventListener("click", () => {
        window.location.href = `detalle_semana.html?semanaId=${id}`;
      });

      listaContainer.appendChild(botonSemana);
    });
  } catch (error) {
    console.error("Error al cargar las semanas:", error);
  } finally {
    document.getElementById("loader").style.display = "none";
  }
};

