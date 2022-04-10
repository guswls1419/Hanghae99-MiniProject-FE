import React from "react";
import {Text,Grid} from "../elements"
import styled from "styled-components"


const Input = (props) => {

    const {label, placeholder,_onChange, type,border,width,padding,multiLine} = props;
    const styles = {
        label:label, 
        placeholder:placeholder,
        _onChange:_onChange,
         type:type,
         border:border,
         width:width,
         padding:padding
    }
    if(multiLine){
        return(
            <Grid>
                {label &&<Text margin="0px">{label}</Text>}
                <ElTextarea rows={10} placeholder ={placeholder} onChange ={_onChange} {...styles}/>
            </Grid>
        )
    }
    return (
        <React.Fragment>
            <Grid>
                {label &&<Text margin="0px">{label}</Text>}
                <ElInput type={type} placeholder ={placeholder} onChange ={_onChange} {...styles}/> 
            </Grid>
                
        </React.Fragment>
    )
};

Input.defaultProps = {
   label : false,
   placeholder : '텍스트를 입력하세요.',
   type:"text",
   _onChange : () => {},
   border: "1px solid #d4d4d4",
   width: "100%",
   padding:"12px 4px"
}

const ElInput = styled.input`
    border: ${(props) => props.border};
    width: ${(props) => props.width};
    padding: ${(props) => props.padding};
    box-sizing : border-box;
    type:${(props)=>props.type};
`;
const ElTextarea =styled.textarea`

border:1px solid #212121;
width:100%;
padding:12px 4px;
box-sizing:border-box;    
`


export default Input;