import React from 'react'
import {Grid, Image, Text, Button, Input} from "../elements";
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { actionCreators as bucketAction } from "../redux/modules/bucket";

function BuckItem(props) {
   const bucket_list = useSelector((state)=>state.bucket.list);
//console.log(bucket_list)

  const dispatch = useDispatch();

  const id = props.id;
  //console.log(id)

  const {state} = props;
  const [checkState, setCheckState] = useState(false);

  //버튼함수
  const complete=()=>{
    checkState===true? setCheckState(false):setCheckState(true)
    
    const bucket_idx = bucket_list.findIndex(p=>p.id === id); // 인덱스번호를 찾는다.
    const bucket = bucket_list[bucket_idx];
    dispatch(bucketAction.PG_updateBucket(bucket))
  }
  if(state==="is_edit"){
    return (
      <React.Fragment>
        <div style={{marginTop:"10px"}}>
                <Box>
                <Text>{props.todolist[0].content}</Text>
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
            <Text>{props.todolist[0].content}</Text>
            <div>{checkState? "🗹":"☐"}</div>
          </Box>
          </div>
        </React.Fragment>
      )
  }   
    }

    
    BuckItem.defaultProps = {
      title: "",
      imageUrl:"/images/cancle.png",
      todolist:[{content: "반가워요", done : 0}]
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