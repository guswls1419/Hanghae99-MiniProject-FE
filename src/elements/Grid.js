import React from "react";
import styled from "styled-components"

const Grid = (props) => {
    const {
        is_flex,
        height,
        width,
        margin,
        padding,
        bg,
        children,
        center,
        _onClick,
        border_radius} = props;
    //props로 설정해준 값 가져오기

    const styles = {
        height:height,
        is_flex : is_flex,
        width : width,
        margin : margin,
        padding: padding,
        bg : bg,
        center:center,
        border_radius:border_radius,
    }
    
    return (
        <React.Fragment>
            <GridBox {...styles} onClick={_onClick}>
                {children}
            </GridBox>
        </React.Fragment>
    )
}

Grid.defaultProps = {
    children : null,
    is_flex : false,
    width: "100%",
    padding : false,
    margin : false,
    bg :false,
    center:false,
    border_radius:false,
    _onClick:() => {},
    height:"30px",
}

const GridBox = styled.div`
    width : ${(props) => props.width};
    height : ${(props) => props.height};
    box-sizing :border-box;
    ${(props) => props.padding ? `padding : ${props.padding};` : ""};
    ${(props) => props.margin ? `margin : ${props.margin};` : ""};
    ${(props) => props.bg ? ` background-color :  ${props.bg};` : ""};
    ${(props) => props.center ? `text-align : center` : ""}
    ${(props) => props.border_radius ? `border-radius : ${props.border_radius};` : ""}
    ${(props) => props.is_flex ? `display:flex; align-items : center; justify-content : space-between;` : ""};
`;


export default Grid;