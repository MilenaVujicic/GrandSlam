import React from "react";
import {Button} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

function BuyButton(){
    const navigate = useNavigate();

    const handleBuy = () =>{
        navigate("/buy");
    }
    return(
        <Button onClick={handleBuy}>Buy</Button>
    );
}

function SellButton(){
    const navigate = useNavigate();

    const handleSell = ()=>{
        navigate("/sell");
    }

    return(
        <Button onClick={handleSell}>Sell</Button>
    )
}

function Influxes(){
    const navigate = useNavigate();

    const handleInflux = () => {
        navigate("/influx")
    }

    return(
        <Button onClick={handleInflux}>Incomes</Button>
    )
}

function Effluxes(){
    const navigate = useNavigate();

    const handleEfflux = () => {
        navigate("/efflux");
    }

    return(
        <Button onClick={handleEfflux}>Expenses</Button>
    )

}

function GetALoan(){
    const navigate = useNavigate();

    const handleLoan = () => {
        navigate('/loan');
    }
   

    return(
        <Button onClick={handleLoan}>Loan</Button>
    )
}

function ShowUser(){
    const navigate = useNavigate();
    const handleShowUser = ()=>{
        navigate("/showUsers");
    }
    return(
        <Button onClick={handleShowUser}>Show Users</Button>
    )
}


function AddUser(){
    const navigate = useNavigate();

    const handleShowUserPage=()=>{
        navigate('/userTable')
    }
    return(
        <Button onClick={handleShowUserPage}>Add User</Button>
    );
}




function ShowSalary(){
    const navigate = useNavigate();

    const handleShowSalary=()=>{
        navigate('/addSalary')
    }
    return(
        <Button onClick={handleShowSalary}>Add Salary</Button>
    );
}


export {BuyButton, SellButton, AddUser, ShowUser, ShowSalary, GetALoan, Influxes, Effluxes}