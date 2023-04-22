import React from "react";
import {AddUser, BuyButton, SellButton, ShowUser, ShowSalary} from "./buttons";
function MainPage(){
    return(
        <div>
            <h2>Test User</h2>
            <AddUser></AddUser>
            <br/>
            <br/>
            <BuyButton></BuyButton>
            <br/>
            <br/>
            <SellButton></SellButton>
            <br/>
            <br/>
            <ShowSalary></ShowSalary>
            <h2>Test Inspector</h2>
            <ShowUser></ShowUser>
        </div>
    );
}

export default MainPage;