import { registrarSemana } from "./promesas.js"; // Asegúrate de tener una función en promesas.js que maneje la inserción en Firebase

window.addEventListener("load", () => {
  document.getElementById("btnAgregarSemana").addEventListener("click", registrarSemanaFirebase);
  document.getElementById("btniniciarsesion").addEventListener("click", iniciarsesion);
});

const registrarSemanaFirebase = () => {
  // Estructura de la semana con valores iniciales en 0
  const semana = {
    Lunes: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: 0,
      Total: 0
    },
    Martes: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: 0,
      Total: 0
    },
    Miercoles: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: 0,
      Total: 0
    },
    Jueves: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: 0,
      Total: 0
    },
    Viernes: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: 0,
      Total: 0
    },
    Sabado: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: 0,
      Total: 0
    },
    Domingo: {
      Horas_lolo: 0,
      Horas_limpiesa: 0,
      Pago_lolo: 0,
      Pago_limpiesa: 0,
      Procedimiento: 0,
      Total: 0
    },
    Total_Semanal: 0
  };

  console.log("Semana a registrar:", semana);

  // Llamada a la función que inserta la semana en Firebase
  registrarSemana(semana)
    .then(() => {
        console.log("Semana registrada con éxito");
    })
    .catch((error) => {
        console.log("Ocurrió un error al registrar la semana: " + error);
    });
};

const iniciarsesion = async () => {
    
    // 1. Obtener los valores de los inputs (IDs "nombre" y "contrasena")
    const nombre = document.getElementById("nombre").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
  
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
        // Si NO está vacío, hay al menos un documento que coincide
        console.log("Inicio de sesión exitoso");
        window.location.href = "administracion.html";
      } else {
        console.log("Nombre o contraseña incorrectos");
      }
    } catch (error) {
        console.log("Error al iniciar sesión: " + error);
    }
  };