import React from "react";
import {AddUser, BuyButton, SellButton} from "./buttons";
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
            <h2>Test Inspector</h2>
        </div>
    );
}

export default MainPage;