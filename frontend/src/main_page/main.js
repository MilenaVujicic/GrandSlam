import React from "react";
import {AddUser, BuyButton, SellButton, ShowUser, ShowSalary, GetALoan, Effluxes, Influxes} from "./buttons";
function MainPage(){
    return(
        <div>
            <h2>Test User</h2>
            <AddUser></AddUser>
            <br/>
            <br/>
            <GetALoan></GetALoan>
            <br/>
            <br/>
            <BuyButton></BuyButton>
            <br/>
            <br/>
            <SellButton></SellButton>
            <br/>
            <br/>
            <ShowSalary></ShowSalary>
            <br/>
            <br/>
            <h2>Test Inspector</h2>
            <ShowUser></ShowUser>
            <br/>
            <br/>
            <Influxes></Influxes>
            <br/>
            <br/>
            <Effluxes></Effluxes>
        </div>
    );
}

export default MainPage;