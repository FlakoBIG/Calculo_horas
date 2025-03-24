import {collection,addDoc,getDocs,doc,updateDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {db} from './firebase.js'

export const Agregar_Semana = async(semana)=>{
  //hacemos una coleccion llamada semana en la base de datos que venga semana 
  const docRef = await addDoc(collection(db,"Semana"),semana);
}
export const Ver_Semanas = async()=>{
  const documentos = collection(db,"Semana");
  const querySnap = await getDocs(documentos);
  console.log(querySnap);
  let listado_Semanas = [];

  querySnap.forEach(doc => {
    listado_Semanas.push({...doc.data(),id:doc.id});
  });
  return listado
}