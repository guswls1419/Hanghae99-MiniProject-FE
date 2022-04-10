import React from "react";
import styled from "styled-components";
import {Grid,Text,Input,Button} from "../elements";
import Upload from "../shared/Upload";
import BuckItem from "../components/BucketItem";
import ProgressBar from "../components/ProgressBar";
import CommentItem from "../components/CommentItem";

const BucketDetail =(props)=>{
    return(
        <>
          <WriteWrap>
            <Grid margin="80px 0px 30px 0px">
                <Text bold>김버킷의 버킷리스트</Text>
                <Grid margin="30px 0px 0px 0px">
                <ProgressBar/>
            </Grid>
            </Grid>
                <Grid margin="80px 0px 0px 0px">
                  <BuckItem/>
                  <BuckItem/>
                  <BuckItem/>
                  <BuckItem/>
                </Grid>
                <Grid margin="220px 0px 0px 0px">
                <div style={{float:"left", display:"flex"}}>
                    <div>🖤{props.like_cnt}</div>
                    <div>💬{props.comment_cnt}</div>
                </div>
                </Grid>
                <Grid margin="0px 0px 0px 0px">
                    <Input/>
                </Grid>
                <Grid  margin="20px 0px 0px 0px">
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <CommentItem/>
                    <Grid margin="40px 0px 0px 0px"/>
                  {/* 밑의 버튼이랑 사이 간격이니 꼭 유지해주세요 */}
                </Grid> 
          </WriteWrap>
          <FloatButton><p style={{fontSize:"20px"}}>✏️</p></FloatButton>
          </>
    )
}
BucketDetail.defaultProps={
    like_cnt:0,
    comment_cnt:0,
}
const WriteWrap=styled.div`
margin:0 auto;
max-width:450px;
min-width:350px;
padding:20px;
`

const SaveBtn=styled.button`
width:150px;
height:50px;
background:black;
z-index:3;
border-radius:50px;
position:fixed;
color:white;
bottom:30px;
left:50%;
transform:translateX(-50%);
border:none;
cursor:pointer;
`

const FloatButton=styled.button`
width:60px;
height:60px;
border-radius:50%;
background:#F5C820;
position:fixed;
right:10%;
bottom:10%;
border:none;
box-shadow:
0 1px 1px hsl(0deg 0% 0% / 0.045),
0 2px 2px hsl(0deg 0% 0% / 0.045),
0 4px 4px hsl(0deg 0% 0% / 0.045),
0 8px 8px hsl(0deg 0% 0% / 0.045),
0 16px 16px hsl(0deg 0% 0% / 0.045)
;
cursor:pointer;
    p{
        margin-top:12px;
    }
`

export default BucketDetail;