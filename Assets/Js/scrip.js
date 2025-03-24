import { Agregar_Semana, iniciarSesionUsuario,listarSemanas} from "./promesas.js";

console.log("scrip.js cargado");

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
  cargarSemanas();
});

const registrarSemanaFirebase = () => {
  // Estructura de la semana con valores iniciales en 0
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

  console.log("Semana a registrar:", semana);
  Agregar_Semana(semana)
    .then(() => {
      console.log("Semana registrada con éxito");
      window.location.reload();
    })
    .catch((error) => {
      console.log("Ocurrió un error al registrar la semana: " + error);
    });
};

const iniciarsesion = async () => {
  console.log("Click en iniciar sesión");
  // 1. Obtener los valores de los inputs (IDs "nombre" y "contrasena")
  const nombre = document.getElementById("nombre").value.trim();
  const contrasena = document.getElementById("contrasena").value.trim();
  console.log("Valores obtenidos - Nombre:", nombre, "Contraseña:", contrasena);

  // 2. Verificar que no estén vacíos
  if (!nombre || !contrasena) {
    console.log("Por favor, completa ambos campos.");
    return;
  }

  try {
    // 3. Llamar a la función que hace la consulta en Firestore
    const querySnapshot = await iniciarSesionUsuario(nombre, contrasena);

    // 4. Evaluar el resultado
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

const cargarSemanas = async () => {
  try {
    const listaContainer = document.getElementById('lista-semanas');
    // Obtener las semanas desde Firebase usando la función importada
    const semanas = await listarSemanas();
    listaContainer.innerHTML = "";

    semanas.forEach(semana => {
      const { id, data } = semana;
      const totalSemanal = data.Total_Semanal;
      const semanaElem = document.createElement('div');
      // Formato: "Semana 1   $0"
      semanaElem.textContent = `Semana ${id}   $${totalSemanal}`;
      listaContainer.appendChild(semanaElem);
    });
  } catch (error) {
    console.error("Error al cargar las semanas:", error);
  }
};