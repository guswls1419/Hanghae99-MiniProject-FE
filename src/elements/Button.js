import React from "react";
import styled from "styled-components";

const Button =(props)=>{
    const {text,_onClick,is_float,children,margin,width,padding,backgroundColor,cursor,borderRadius}=props;
    if(is_float){
        return(
            <React.Fragment>
                <FloatButton onClick={_onClick}>{text? text:children}</FloatButton>
            </React.Fragment>
        )
    }else{
        const styles={margin:margin,width:width,padding:padding,backgroundColor:backgroundColor,cursor:cursor,borderRadius:borderRadius}
        return(
            <React.Fragment>
                <ElButton {...styles} onClick={_onClick}>{text? text:children}</ElButton>
            </React.Fragment>
        )
    }
}

Button.defaultProps ={
    text:false,
    _onClick: ()=>{},
    is_float:false,
    children:null,
    margin:false,
    width:"100%",
    padding:"12px 0px",
    backgroundColor:"black",
    cursor:"pointer",
    color:"#ffffff",
    borderRadius:false,
}
const ElButton =styled.button`
    width:${(props)=>props.width};
    cursor:${(props)=>(props.cursor? "pointer":"")};
    background:${(props)=>props.backgroundColor};
    color:${(props)=>props.color};
    padding:${(props)=>props.padding};
    box-sizing:border-box;
    border:none;
    ${(props)=>(props.margin? `margin:${props.margin};`:"")};
    ${(props)=>(props.borderRadius? `border-radius:${props.borderRadius};`:"")};
`
const FloatButton =styled.button`
    width:50px;
    height:50px;
    border-radius:50%;
    background:${(props)=>props.backgroundColor};
    color:${(props)=>props.color};
    box-sizing:border-box;
    font-size:36px;
    font-weight:400;
    line-height:36px;
    position:fixed;
    bottom:8%;
    right:8%;
    border:none;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`
export default Button;