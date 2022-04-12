import React from "react";
import { useSelector } from "react-redux";



const Permit =(props)=>{
    const token = sessionStorage.getItem("token");
    const is_login =useSelector(state=>state.user.is_login);
    const is_session =sessionStorage.getItem("token")? true : false;
    console.log(token);
    console.log(is_login);
    console.log(is_session);
        if(is_session&&is_login){
            return<React.Fragment>{props.children}</React.Fragment>
        }return null;
}
export default Permit;