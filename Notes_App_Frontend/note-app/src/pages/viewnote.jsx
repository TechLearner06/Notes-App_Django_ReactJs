import React, { useEffect,useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit} from  '@fortawesome/free-solid-svg-icons';
import './viewnote.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom'
import PopUp from '../components/popup';

const ViewNote = ({deleteNote}) => {

  const [note,setNote] = useState({})
  const {slug}=  useParams()
  const [isOpen , setIsOpen] = useState(false)
 

  const buttonClicked = ()=>{
    setIsOpen(!isOpen)

  }



  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/notes/${slug}`)
      .then(res =>{
        setNote(res.data);
        console.log(res.data)
      })
      .catch(err =>{
        console.log(err.message)
  })

},[slug]);

// Format the updated date to show only the date
const createdDate = new Date(note.created);
const options = { year: 'numeric', month: 'short', day: '2-digit' };
const formatDate = createdDate.toLocaleDateString('en-GB', options); // Format as DD/MM/YYYY


// Format the updated date to show only the date
const updatedDate = new Date(note.updated);
const formattedDate = updatedDate.toLocaleDateString('en-GB', options); // Format as DD/MM/YYYY





  return (

    <>
    
    <div className='view-note-section'>
        <div className="note-header">
            <div className="last-updated" style={{"fontSize" : 13}}>Last Updated: {formattedDate}</div>
            <div className="options">
                <span id='edit-icon'><Link to={`/edit-note/${slug}`} style={{"textDecoration":"none", "color":"black" ,"cursor":"pointer"}}><FontAwesomeIcon icon={faEdit}  color="green" />Edit</Link></span>
                <span id='delete-icon' onClick={buttonClicked} style={{"cursor":"pointer"}}><FontAwesomeIcon icon={faTrash} color="red" />Delete</span>
            </div>
        </div>
        <h4 className='view-note-title'>{note.title}</h4>
        <h6 className='view-note-content' style={{whiteSpace:"pre-wrap"}}>{note.description}</h6>
        <div className="note-footer">
            <small>Created at: {formatDate}</small>
        </div>
    </div>

   {isOpen && <PopUp buttonClicked={buttonClicked} deleteNote={() => deleteNote(slug)}/>}   
   </>  
    //The above line is a conditional rendering statement using the && operator.
    //When isOpen is true, <PopUp /> is rendered.
  )
}

export default ViewNote
