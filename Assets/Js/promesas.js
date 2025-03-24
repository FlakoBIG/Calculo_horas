import { collection, addDoc, getDocs, doc, updateDoc, query, where, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { db } from "./firebase.js";

export const Agregar_Semana = async (semana) => {
  console.log("Agregando semana a Firestore:", semana);
  try {
    const colRef = collection(db, "Semana");
    const semanasSnapshot = await getDocs(colRef);
    console.log("Documentos actuales en la colección 'Semana':", semanasSnapshot.size);
    
    const newWeekNumber = semanasSnapshot.size + 1;
    const newWeekId = newWeekNumber.toString();
    console.log("Nuevo ID asignado:", newWeekId);
    
    await setDoc(doc(db, "Semana", newWeekId), semana);
    console.log("Semana agregada con ID:", newWeekId);
  } catch (error) {
    console.error("Error al agregar la semana:", error);
  }
};

export const iniciarSesionUsuario = async (nombre, contrasena) => {
  console.log("Intentando iniciar sesión para:", nombre);
  // Referencia a la colección "cuenta"
  const cuentaRef = collection(db, "cuenta");
  // Construimos la consulta con "where"
  const q = query(
    cuentaRef,
    where("Nombre", "==", nombre),
    where("Contraseña", "==", contrasena)
  );
  console.log("Consulta construida:", q);
  try {
    // Ejecutamos la consulta
    const querySnapshot = await getDocs(q);
    console.log("Resultado de la consulta:", querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log("Documento encontrado:", doc.data());
    });
    return querySnapshot; // Retornamos el snapshot para evaluarlo después
  } catch (error) {
    console.log("Error en la consulta de inicio de sesión:", error);
    throw error;
  }
};

export const listarSemanas = async () => {
  try {
    const semanaRef = collection(db, "Semana");
    const querySnapshot = await getDocs(semanaRef);
    const semanas = [];

    // Guardamos en un arreglo cada documento: { id, data }
    querySnapshot.forEach((doc) => {
      semanas.push({ id: doc.id, data: doc.data() });
    });

    return semanas;
  } catch (error) {
    console.error("Error al listar las semanas:", error);
    throw error;
  }
};