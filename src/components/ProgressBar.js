import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ProgressBar=(props)=>{

    const bucket_list = useSelector((state) => state.bucket.list);
   // console.log(bucket_list)
    let count = 0;
        bucket_list.map((b, idx) => {
        if (b.done === 1 ) {
         count ++;
        }
        if (b.done === 0 ) {
            count --;
           }

        });

        //console.log(count);

    return(
        <ProgressBack>
            <HighLight width={(count / bucket_list.length) * 100 + "%"}/>
            <ProgressPoint/>
        </ProgressBack>
    )
}
const RedDiv =styled.div`

`
const ProgressBack=styled.div`
    width:100%;
    height:15px;
    background:#d3d3d3;
    
    display:flex;
`
const HighLight = styled.div`
background: #F5C820;
transition: 1s;
width: ${(props) => props.width};
height: 15px;
`;

const ProgressPoint =styled.div`
    width:30px;
    height:30px;
    background:#F5C820;
    border-radius:50%;
    margin : -7px -15px;
    box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.045),
    0 2px 2px hsl(0deg 0% 0% / 0.045),
    0 4px 4px hsl(0deg 0% 0% / 0.045),
    0 8px 8px hsl(0deg 0% 0% / 0.045),
    0 16px 16px hsl(0deg 0% 0% / 0.045)
    ;

`

export default ProgressBar;