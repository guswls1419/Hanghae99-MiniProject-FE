import React from 'react'
import '../shared/App.css'
import {Grid, Image, Text, Button, Input} from "../elements";
import Upload from '../shared/Upload';
import BuckItem from "../components/BucketItem";
import styled from 'styled-components';


export const WriteBucket = () => {
    return (
        <React.Fragment>
          <WriteWrap>
          <Grid margin="80px 0px 30px 0px">
                <Text bold>1.버킷리스트 미리보기 이미지를 등록해주세요.</Text>
                <Upload/>
            </Grid>
            <div style={{width:"100%",height:"300px",backgroundColor:"grey"}}/>
            <Grid margin="30px 0px 0px 0px">
              <Text bold>2.버킷리스트 미리보기 이미지를 등록해주세요.</Text>
            </Grid>
            <Input placeholder="김버킷의 버킷리스트"/>

            <Grid margin="50px 0px">
              <Text bold>3.버킷리스트 항목을 추가해보세요.</Text>
            <Grid>
              <Input placeholder="ex.혼자서 한라산 등반하기"></Input>
            <Grid margin="20px 0px 0px 0px">
                    <Button backgroundColor="#F5C820" color="black">추가하기</Button>
                  </Grid>
                </Grid>
                <Grid margin="80px 0px 0px 0px">
                  <BuckItem state="is_edit"/>
                  <BuckItem state="is_edit"/>
                  <BuckItem state="is_edit"/>
                  <BuckItem state="is_edit"/>
                  <BuckItem state="is_edit"/>
                  <Grid margin="80px 0px 0px 0px"/>
                  {/* 밑의 버튼이랑 사이 간격이니 꼭 유지해주세요 */}
                </Grid>
                
                
                </Grid>
                <SaveBtn>저장하기</SaveBtn>
          </WriteWrap>
        </React.Fragment>
    )
}

const WriteWrap=styled.div`
margin:0 auto;
max-width:450px;
min-width:350px;
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

export default WriteBucket;