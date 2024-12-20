import React from 'react';

const Filter = ({ handleFilter, selectedCategory }) => {
  return (
    <div className='menu-section'>
      <button 
        onClick={() => handleFilter("")} 
        id='all' 
        className={selectedCategory === "" ? "selected" : ""}
      >
        All
      </button>
      <button 
        onClick={() => handleFilter("PERSONAL")} 
        id='per' 
        className={selectedCategory === "PERSONAL" ? "selected" : ""}
      >
        Personal
      </button>
      <button 
        onClick={() => handleFilter("BUSINESS")} 
        id='home' 
        className={selectedCategory === "BUSINESS" ? "selected" : ""}
      >
        Business
      </button>
      <button 
        onClick={() => handleFilter("IMPORTANT")} 
        id='bus' 
        className={selectedCategory === "IMPORTANT" ? "selected" : ""}
      >
        Important
      </button>
    </div>
  );
};

export default Filter;
