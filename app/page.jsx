"use client"
import { db } from "./firebase"
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
export default function Home() {
const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
const [isCreate, setIsCreate] = useState(false)
const [tasks, set98Tasks] = useState([])
async function fetchFirebase() {
  const documentsArray = [];
  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((doc) => {
  documentsArray.push(doc.data())
  })
  setTasks(documentsArray)
  console.log(tasks)
}
useEffect(() => {
  fetchFirebase()
}, [])

 
  async function handleSubmit(e) {  
    e.preventDefault();
    const citiesRef = collection(db, "tasks");
    const date = Date.now();
    try {
      await setDoc(doc(citiesRef, date.toString()), {
        title: title,
        description: description,
        id:date,
        isCreate: false,
      });
      
      console.log("Documento creado exitosamente");
    } catch (error) {
      console.error("Error al crear el documento:", error);
    }
}
async function handleSubmitEdit(e, id) {
  e.preventDefault();
  const citiesRef = collection(db, "tasks");
  const date = id;
  try {
    await setDoc(doc(citiesRef, id.toString()), {
      title: title,
      description: description,
      id:date,
      isCreate: false
    });
    
    console.log("Documento creado exitosamente");
  } catch (error) {
    console.error("Error al crear el documento:", error);
  }
setIsCreate(false)
}

async function removeDocument(id) {
await deleteDoc(doc(db, "tasks", id.toString()))
}
function handleInputTitle(e) {
  e.preventDefault()
  const values = e.target.value;
  setTitle(values)
}
function handleInputDescription(e) {
  e.preventDefault()
  const values = e.target.value;
  setDescription(values)
}
async function editMode(id, item){
  const citiesRef = collection(db, "tasks");
  const date = id;
  try {
    await setDoc(doc(citiesRef, id.toString()), {
      title: item.title,
      description: item.description  ,
      id:date,
      isCreate: true
    });
    console.log("Documento en modo edición");
  } catch (error) {
    console.error("Error al activar el modo edición de el documento:", error);
  }
}
  return (
    <main>
{/*       <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título" onChange={handleInputTitle}/>
        <input type="text" placeholder="Descripción" onChange={handleInputDescription}/>
        <button type="submit">Crear</button>  
      </form>
{tasks.map(item => (
item.isCreate == false ? <div key={item.id}><h1>Título: {item.title}</h1><p>Descripción: {item.description}</p> <button onClick={() => removeDocument(item.id)}>Delete</button><button onClick={() => editMode(item.id, item)}>Edit</button></div> : <div className="modalContainer" key={item.id}><form className="modalContent" onSubmit={(e) => handleSubmitEdit(e, item.id)}>
<input defaultValue={item.title} type="text" placeholder="Título" onChange={handleInputTitle}/>
<input defaultValue={item.description} type="text" placeholder="Descripción" onChange={handleInputDescription}/>
<button type="submit">Finalizar edición</button>  
</form></div>
))} */}
<div className="modalContainer"><form className="modalContent" onSubmit={(e) => handleSubmitEdit(e, item.id)}>
<input type="text" placeholder="Título" onChange={handleInputTitle}/>
<input type="text" placeholder="Descripción" onChange={handleInputDescription}/>
<button type="submit">Finalizar edición</button>  
</form></div>
    </main>
  )
}
