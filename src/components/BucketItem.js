import React from 'react'
import {Grid, Image, Text, Button, Input} from "../elements";
import styled from 'styled-components';
import { useState } from 'react';

function BuckItem(props) {
  const {state} = props;
  const [checkState, setCheckState] = useState(false);
  const complete=()=>{
    checkState===true? setCheckState(false):setCheckState(true)
    console.log(checkState);
  }
  if(state==="is_edit"){
    return (
      <React.Fragment>
        <div style={{marginTop:"10px"}}>
        <Box>
          <Text>한라산 등반하고 친구랑 놀기</Text>
          <Button width="auto" padding="5px 10px" backgroundColor="transparent" color="black">✖</Button>
        </Box>
        </div>
      </React.Fragment>
    )}
    else{
      return (
        <React.Fragment>
          <div style={{marginTop:"10px"}}>
          <Box checkState={checkState} onClick={complete}>
            <Text>한라산 등반하고 친구랑 놀기</Text>
            <div>{checkState? "🗹":"☐"}</div>
          </Box>
          </div>
        </React.Fragment>
      )
  }   
    }

const Box=styled.div`
width:100%;
background:${(props)=>props.checkState? "#F5C820":"#f5f5f5"};
box-shadow:
0 1px 1px hsl(0deg 0% 0% / 0.015),
0 2px 2px hsl(0deg 0% 0% / 0.015),
0 4px 4px hsl(0deg 0% 0% / 0.015),
0 8px 8px hsl(0deg 0% 0% / 0.015),
0 16px 16px hsl(0deg 0% 0% / 0.015)
;
border-radius:5px;
padding:10px;
display:flex;
flex-direction:rows;
align-items:center;
justify-content:space-between;
box-sizing:border-box;
cursor:pointer;
text-docoration:${(props)=>props.checkState? "line-through":"none"};
`
export default BuckItem