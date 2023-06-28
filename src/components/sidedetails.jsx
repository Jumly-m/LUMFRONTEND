import React from "react";
import SocialMedia from "./socialmedia";


function SideDetails(){
    return(
        <div className="sideDetails">
        <div className="logo">
        <img  className="logo" src="images/logo.png" alt="logo"/>
        </div>
        
       
        <SocialMedia/>
        </div>
    )
}


export default SideDetails;