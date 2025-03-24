// promesas.js
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "./firebase.js";

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
