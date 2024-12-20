import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const EditNote = ({editNote}) => {

  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [category,setCategory] = useState("")



  const {slug} = useParams()

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/notes/${slug}`)
    .then(res=> {
      console.log(res.data)
      setTitle(res.data.title)
      setBody(res.data.description)
      setCategory(res.data.category)

    })
    .catch(err =>{
      console.log(err.message)
    })
  },[slug])     //The last slug in your useEffect hook is in the dependency array: useEffect(() => { /*...*/ }, [slug]). It tells React to re-run this useEffect whenever slug changes. This keeps the data in sync if you pass a different slug prop to the component.

  
  const updateNote = {
    title : title,
    description :body,
    category:category,

  }
  console.log("Selected category:", category);

  
  const navigate = useNavigate();

   // Function to handle the form submission
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!title && !body && !category) return;
    editNote(updateNote, slug)
    navigate(`/view-note/${slug}`)

  }

  const handleCancel = (e) =>{
    e.preventDefault();
    navigate('/')

  }


  return (
    <div className='add-note'>

        <form className='add-note-form' onSubmit={handleSubmit}>
            <input type="text" placeholder='Title' value={title} onChange={(e) =>setTitle(e.target.value)}></input>
            <textarea rows={8} placeholder='Type Notes Here..' value={body}  onChange={(e) =>setBody(e.target.value)}></textarea>
            <select   value={category} onChange={(e) =>setCategory(e.target.value)}>
            <option value="0">Category</option>
            <option value="PERSONAL">Home</option>
            <option value="BUSINESS">Business</option>
            <option value="IMPORTANT">Important</option>
            </select>

            <div className='buttons'>
              <button className="note-add-btn" type="submit">Save</button>
              <button className="can-btn" onClick={handleCancel}>Cancel</button>

            </div>

        </form>
      
    </div>
  )
}

export default EditNote
