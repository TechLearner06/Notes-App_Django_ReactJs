import React from 'react'
import NavBar from '../components/navbar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({searchText,handleSearch}) => {
  return (
    <>
    <NavBar searchText={searchText} handleSearch={handleSearch}/>
    <ToastContainer/>
    <Outlet/>
    </>
  )
}

export default MainLayout
