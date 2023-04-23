import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './main_page/main';
import {UserTable, SalaryForm, LoanForm, SellForm, BuyForm} from './main_page/tables';
import { Route, Router, Routes } from 'react-router-dom';
import { ReactDOM } from 'react';
import DataTable from './main_page/admin_table';

function App() {
  return (
    
      <div>
      <Routes>
      <Route exact path="/" element={<MainPage/>}></Route>
      <Route exact path="/userTable" element={<UserTable/>}></Route>
      <Route exact path="/addSalary" element={<SalaryForm/>}></Route>
      <Route exact path="/showUsers" element={<DataTable/>}></Route>
      <Route exact path="/loan" element={<LoanForm/>}></Route>
      <Route exact path="/sell" element={<SellForm/>}></Route>
      <Route exact path="/buy" element={<BuyForm/>}></Route>
  
      </Routes>
      </div>
      );
}

export default App;
