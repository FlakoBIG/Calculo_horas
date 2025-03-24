import { registrarSemana } from "./promesas.js"; // Asegúrate de tener una función en promesas.js que maneje la inserción en Firebase

window.addEventListener("load", () => {
  document.getElementById("btnAgregarSemana").addEventListener("click", registrarSemanaFirebase);
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
      alert("Semana registrada con éxito");
    })
    .catch((error) => {
      alert("Ocurrió un error al registrar la semana: " + error);
    });
};
