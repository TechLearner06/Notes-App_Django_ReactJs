import React, { useState } from 'react'
import './addnote.css';
import { useNavigate } from 'react-router-dom';


const AddNote = ({addNote}) => {

  const [title , setTitle] = useState("")
  const [description,setBody] = useState("")
  const [category,setCategory] = useState("")


  // Define a new note using the current state values
  const newNote = {
    title : title,
    description :description,
    category:category

  };

  const navigate = useNavigate();

   // Function to handle the form submission
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!title && !description && !category) {
      return;
    }
    addNote(newNote)
    navigate('/')
  }


  return (
    <div className='add-note'>
        <div className='heading'>
            New Note
        </div>

        <form className='add-note-form' onSubmit={handleSubmit}>
            <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <textarea rows={8} placeholder='Type Notes Here..' value={description} onChange={(e) => setBody(e.target.value)}></textarea>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="0">Choose Note's Category</option>
            <option value="PERSONAL">Personal</option>
            <option value="BUSINESS">Business</option>
            <option value="IMPORTANT">Important</option>
            </select>

            <button className="note-add-btn" type="submit">Save</button>
            
        </form>
      
    </div>
  )
}

export default AddNote
