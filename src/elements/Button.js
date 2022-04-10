import React from "react";
import styled from "styled-components";

const Button =(props)=>{
    const {text,_onClick,is_float,children,margin,width,is_outlined,padding,backgroundColor,cursor,borderRadius,color}=props;
    if(is_float){
        return(
            <React.Fragment>
                <FloatButton onClick={_onClick}>{text? text:children}</FloatButton>
            </React.Fragment>
        )
    }
    else if(is_outlined){
        const styles={margin:margin,width:width,padding:padding,backgroundColor:backgroundColor,is_outlined,cursor:cursor,borderRadius:borderRadius,color:color}
        return(
            <React.Fragment>
                <OutlinedButton {...styles} onClick={_onClick}>{text? text:children}</OutlinedButton>
            </React.Fragment>
        )
    }else{
        const styles={margin:margin,width:width,padding:padding,backgroundColor:backgroundColor,cursor:cursor,borderRadius:borderRadius,color:color}
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
    color:"white",
    borderRadius:false,
}
const OutlinedButton=styled.button`
    width:${(props)=>props.width};
    cursor:${(props)=>(props.cursor? "pointer":"")};
    background:${(props)=>props.backgroundColor};
    border:1px solid #d4d4d4;
    color:${(props)=>props.color};
    padding:${(props)=>props.padding};
    box-sizing:border-box;
    ${(props)=>(props.margin? `margin:${props.margin};`:"")};
    ${(props)=>(props.borderRadius? `border-radius:${props.borderRadius};`:"")};
`

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
    background-color:${(props)=>props.backgroundColor};
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