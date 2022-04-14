import React from 'react'
import {Grid, Image, Text, Button, Input} from "../elements";
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { actionCreators as bucketAction } from "../redux/modules/bucket";

function BucketItem(props) {
   const bucket_list = useSelector((state)=>state.bucket.list);

   console.log(props)

  const dispatch = useDispatch();

  const id = props.id;

  const [checkState, setCheckState] = useState(false);

  //버튼함수
  const complete=()=>{
    console.log("버튼 클릭했습니다");
  }
      return (
        <React.Fragment>
          <div style={{marginTop:"10px"}}>
          <Box checkState={checkState} _onClick={complete}>
            <Text>{props.todo[0].content}</Text>
            <div>{checkState? "🗹":"☐"}</div>
          </Box>
          </div>
        </React.Fragment>
      )
  // }   
    }

    
    BucketItem.defaultProps = {
      title: "",
      imageUrl:"/images/cancle.png",
      todolist:[{content: "반가워요", done : false}]
    }

const Box=styled.div`
width:100%;
background:${(props)=>props.checkState===true ? "#F5C820":"#f5f5f5"};
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
export default BucketItem