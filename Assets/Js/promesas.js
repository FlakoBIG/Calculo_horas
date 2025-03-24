// promesas.js
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "./firebase.js";

// Función para agregar una nueva semana (ya existente)
export const Agregar_Semana = async (semana) => {
  try {
    const colRef = collection(db, "Semana");
    const semanasSnapshot = await getDocs(colRef);
    const newWeekNumber = semanasSnapshot.size + 1;
    const newWeekId = newWeekNumber.toString();
    await setDoc(doc(db, "Semana", newWeekId), semana);
    console.log("Semana agregada con ID:", newWeekId);
  } catch (error) {
    console.error("Error al agregar la semana:", error);
  }
};

// Función para iniciar sesión (consulta en la colección "cuenta")
export const iniciarSesionUsuario = async (nombre, contrasena) => {
  try {
    const cuentaRef = collection(db, "cuenta");
    const q = query(
      cuentaRef,
      where("Nombre", "==", nombre),
      where("Contraseña", "==", contrasena)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  } catch (error) {
    console.error("Error en la consulta de inicio de sesión:", error);
    throw error;
  }
};

// Función para listar todas las semanas
export const listarSemanas = async () => {
  try {
    const semanaRef = collection(db, "Semana");
    const querySnapshot = await getDocs(semanaRef);
    const semanas = [];
    querySnapshot.forEach((doc) => {
      semanas.push({ id: doc.id, data: doc.data() });
    });
    return semanas;
  } catch (error) {
    console.error("Error al listar las semanas:", error);
    throw error;
  }
};

// Función para obtener una semana por su ID
export const obtenerSemanaPorId = async (semanaId) => {
  try {
    const docRef = doc(db, "Semana", semanaId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn("No existe la semana con ID:", semanaId);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la semana por ID:", error);
    throw error;
  }
};

export const actualizarDiaYTotalSemanal = async (semanaId, dia, datosActualizados) => {
  try {
    const docRef = doc(db, "Semana", semanaId);
    // Actualizamos los campos específicos del día
    await updateDoc(docRef, {
      [`${dia}.Horas_lolo`]: datosActualizados.Horas_lolo,
      [`${dia}.Horas_limpiesa`]: datosActualizados.Horas_limpiesa,
      [`${dia}.Pago_lolo`]: datosActualizados.Pago_lolo,
      [`${dia}.Pago_limpiesa`]: datosActualizados.Pago_limpiesa,
      [`${dia}.Total`]: datosActualizados.Total,
      [`${dia}.Procedimiento`]: datosActualizados.Procedimiento,
    });
    
    // Recalculamos el Total_Semanal leyendo el documento completo
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const semanaData = docSnap.data();
      const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
      let totalSemanal = 0;
      dias.forEach((d) => {
        // Si el día existe y tiene Total, lo sumamos; en caso contrario, se suma 0.
        totalSemanal += (semanaData[d] && semanaData[d].Total) ? Number(semanaData[d].Total) : 0;
      });
      await updateDoc(docRef, {
        Total_Semanal: totalSemanal
      });
      console.log("Día y Total Semanal actualizado correctamente");
    }
  } catch (error) {
    console.error("Error al actualizar el día y el total semanal:", error);
    throw error;
  }
};
