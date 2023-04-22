import React from "react";
import {Button} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

function BuyButton(){
    return(
        <Button onClick={buyRequest}>Buy</Button>
    );
}

function SellButton(){
    return(
        <Button onClick={sellRequest}>Sell</Button>
    )
}

function ShowUser(){
    return(
        <Button onClick={navigateShowUser}>Show User</Button>
    )
}

function navigateShowUser(){

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


function buyRequest(){
    console.log("Bought");
}

function sellRequest(){
    console.log("Sold");
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


export {BuyButton, SellButton, AddUser, ShowUser, ShowSalary}