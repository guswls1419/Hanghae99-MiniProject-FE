import React from "react";
import {Text,Grid} from "../elements"
import styled from "styled-components"


const Input = (props) => {

    const {label, placehodaer,_onChange, type,border,width,padding  } = props;

    const styles = {
        label:label, 
        placehodaer:placehodaer,
        _onChange:_onChange,
         type:type,
         border:border,
         width:width,
         padding:padding
    }

    return (
        <React.Fragment>
            <Grid>
                {label ? "" : <Text margin ="0px" >{label}</Text>}
                <ElInput {...styles}/>
            </Grid>
        </React.Fragment>
    )
};

Input.defaultProps = {
   label : false,
   placehodaer : '텍스트를 입력하세요.',
   type:"text",
   _onChange : () => {},
   border: "1px solid #212121",
   width: "100%",
   padding:"12px 4px"
}

const ElInput = styled.input`
    border: ${(props) => props.border};
    width: ${(props) => props.width};
    padding: ${(props) => props.padding};
    box-sizing : border-box;
`;



export default Input;