import { useState } from 'react'
import NoteContext from './NoteContext'

const  NoteState=(props)=>{
  // const host='http://localhost:5000'
  const host='https://i-notes-backend-umber.vercel.app'
const notesData= []
      const [notes,setNotes]=useState(notesData)
      //Get all Notes
      const getNotes=async()=>{
        //Backend Update
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
           "auth-token":localStorage.getItem('token')
          },
        });
        const json=await response.json(); 
        setNotes(json);
      }
      //Add a Note
      const addNote=async(title,description,tag)=>{
        //Backend Update
     await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
           "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        
        //Frontend Update
       getNotes()
      }
      //Delete a Note
      const deleteNote=async(id)=>{
          //Backend Update
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
             "auth-token":localStorage.getItem('token')
            },
          });
          //Frontend Update
          let newnote=notes.filter((note)=>{return note._id!==id })
          setNotes(newnote)
      }
      //Edit a Note
      const editNote=async(id,title,description,tag)=>{
        //Backend Update
       await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
           "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        //Frontend Update
        getNotes()
      }

 return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
 )
}

export default NoteState
