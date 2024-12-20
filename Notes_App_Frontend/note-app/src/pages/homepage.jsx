import React from 'react'
import NotesList from '../components/noteslist';
import Filter from '../components/filter';



const HomePage = ({notes,handleFilter,selectedCategory,searchText}) => {
    return (
   
        <>
        <div className="content-section">
            {searchText && notes.length === 0 ? <h4 style={{textAlign:"center" , color:"green",paddingTop:"30px"}}>No notes found for "<strong>{searchText}</strong>"</h4> : <Filter handleFilter={handleFilter} selectedCategory={selectedCategory} />}
    
            <div className='notes-section'>
                <NotesList notes={notes}/>
            </div>
        </div>
    
        </>
        
      );
}

export default HomePage
