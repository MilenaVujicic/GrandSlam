import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './main_page/main';
import UserTable from './main_page/tables';
import { Route, Router, Routes } from 'react-router-dom';
import { ReactDOM } from 'react';

function App() {
  return (
    
      <div>
      <Routes>
      <Route exact path="/" element={<MainPage/>}></Route>
      <Route exact path="/userTable" element={<UserTable/>}></Route>
      </Routes>
      </div>
      );
}

export default App;
