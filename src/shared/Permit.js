import React from "react";
import { useSelector } from "react-redux";



const Permit =(props)=>{
    const token = sessionStorage.getItem("token");
    const is_login =useSelector(state=>state.user.is_login);
    const is_session =sessionStorage.getItem("token")? true : false;
    const kakaotoken=localStorage.getItem("kakao_65ea142c72defd00cf704f4b62b8d049");
    const is_kakao=kakaotoken? true:false;
    console.log(is_kakao);
        if(is_session&&is_login){
            return<React.Fragment>{props.children}</React.Fragment>
        }else if(is_kakao){
            return<React.Fragment>{props.children}</React.Fragment>
        }else{
            return null;
        }
        
}
export default Permit;