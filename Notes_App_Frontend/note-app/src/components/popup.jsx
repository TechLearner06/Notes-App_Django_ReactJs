import React from 'react'
import "./popup.css"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PopUp = ({buttonClicked,deleteNote}) => {
  const navigate = useNavigate()
  const handleDeleteNote = ()=>{
    deleteNote()
    navigate('/')
    toast.success("Note Deleted Successfully")
  }
  return (
    <div className='c-modal-overlay'>
        <div className='c-modal'>
          <div className='delete-header'>
            <h2>Delete Note</h2>
            <button className='close-button' onClick={buttonClicked}>X</button>
          </div>
            
          <div className="c-modal-content">
              
              <p>Are you sure you want to delete this note?</p>
              <span className='buttons'>
                  <button className='del-btn' onClick={handleDeleteNote}>Delete</button>
                  <button className='cancel-btn' onClick={buttonClicked}>Cancel</button>
              </span>
          </div>
        </div>
      
    </div>
  )
}

export default PopUp
