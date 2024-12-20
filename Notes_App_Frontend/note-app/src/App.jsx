import { useEffect, useState } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


import './App.css';
import './index.css';
import MainLayout from './Layout/MainLayout.jsx';
import AddNote from './pages/AddNote.jsx';
import EditNote from './pages/EditNote.jsx';
import HomePage from './pages/homepage.jsx';
import ViewNote from './pages/viewnote.jsx';

function App() {
  const [notes, setNotes] = useState([]); // State to store the notes
  const [filterNotes, setFilterNotes] = useState(""); // State for filtering category
  const [selectedCategory,setSelectedCategory] = useState("");
  const [ searchText,setSearchText ] = useState("")


  // Fetch notes from Django API on component mount
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/notes")
      .then(res => {
        console.log("Fetched notes:", res.data);
        setNotes(res.data);
      })
      .catch(err => {
        console.error("Error fetching notes:", err.message);
      });
  }, []);

  // Add new note
  const addNote = (data) => {
    axios.post("http://127.0.0.1:8000/notes", data)
      .then(res => {
        setNotes(prevNotes => [...prevNotes, res.data]); // Append new note to state
        toast.success("New note has been added");
        console.log("Added note:", res.data);

       
      })
      .catch(err => {
        console.error("Error adding note:", err.response ? err.response.data : err.message);
        toast.error("Failed to add the note. Please try again.");
      });
  };

  // Edit existing note
  const editNote = (data, slug) => {
    axios.put(`http://127.0.0.1:8000/notes/${slug}`, data)
      .then(res => {
        console.log("Updated note:", res.data);
        toast.success("Note has been updated");
        // Optional: Update the state with the edited note
      })
      .catch(err => {
        console.error("Error updating note:", err.message);
        toast.error("Failed to update the note.");
      });
  };

  // Delete a note
  const deleteNote = (slug) => {
    axios.delete(`http://127.0.0.1:8000/notes/${slug}`)
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(note => note.slug !== slug)); // Remove the deleted note from state
    
      })
      .catch(err => {
        console.error("Error deleting note:", err.message);
        toast.error("Failed to delete the note.");
      });
  };

  // Handle category filtering
  const handleFilter = (category) => {
    setFilterNotes(category);  // Update the filter state
    setSelectedCategory(category); // Track the selected category
    console.log("Selected filter:", category);
  };

  // Filter notes based on the selected category
  const filteredNotes = filterNotes
    ? notes.filter(note => note.category.toLowerCase() === filterNotes.toLowerCase())
    : notes;


  //search

  const handleSearch = (val) =>{
    setSearchText(val);
  }


  //search results

  useEffect(()=>{
    if(searchText.length<3){
      axios.get(`http://127.0.0.1:8000/notes`)
      .then(res => {
        console.log(res.data);
        setNotes(res.data);
    })
    .catch(err => console.log(err.message));
  }else{

    axios.get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
      
      .then(res=>{
        console.log(res.data)
        setNotes(res.data)
      })
    .catch(err=>console.log(err.message))
  }
  },[searchText])

  // Define routes for the application
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout searchText={searchText} handleSearch={handleSearch}/>}>
        <Route 
          index 
          element={<HomePage notes={filteredNotes} handleFilter={handleFilter} selectedCategory={selectedCategory} searchText={searchText}/>} 
        />
        <Route 
          path="/add-note" 
          element={<AddNote addNote={addNote} />} 
        />
        <Route 
          path="/view-note/:slug" 
          element={<ViewNote deleteNote={deleteNote} />} 
        />
        <Route 
          path="/edit-note/:slug" 
          element={<EditNote editNote={editNote} />} 
        />
      </Route>
    )
  );

  // Render the RouterProvider with the defined routes
  return <RouterProvider router={router} />;
}

export default App;
