import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {Link }from 'react-router-dom'
import '../index.css'


const NavBar = ({searchText,handleSearch}) => {
  return (
    <div className='header'>
          <div className='app-title'><a href="/" style={{'textDecoration':'none'}}>clipNote</a></div>
          <div className='search-section'>
              <form className='search-form'
              onSubmit={(e) => e.preventDefault()} // Prevent form submission
              >
                  <input 
                      type="search" 
                      className='search-input' 
                      placeholder='Search your notes here...' 
                      aria-label="Search notes"
                      value={searchText}
                      onChange={(e)=>handleSearch(e.target.value)}
                  />
                  <button 
                      type="submit" 
                      className='search-btn'>
                      <FontAwesomeIcon icon={faSearch} color='white'/>
                  </button>
              </form>
          </div>

          <div className='new-note'>
            <Link to="add-note">
            <button>Add Note</button>
            </Link>
          </div>
      </div>
  )
}

export default NavBar
