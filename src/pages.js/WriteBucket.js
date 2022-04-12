import React from 'react'
import '../shared/App.css'
import {Grid, Image, Text, Button, Input} from "../elements";
import Upload from '../shared/Upload';
import BuckItem from "../components/BucketItem";
import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux'; 
import { actionCreators as bucketAction } from "../redux/modules/bucket";

import { useHistory } from "react-router-dom";

export const WriteBucket = (props) => {
  const bucket_list = useSelector((state)=>state.bucket.list);
  const imageUrl = useSelector((state) =>state.image )
  console.log(imageUrl)

  React.useEffect(() => {
    dispatch(bucketAction.LodeBucketDB());
  },[]);

  const history = useHistory();
  const dispatch = useDispatch();

    const [name,setName] = React.useState();
    const [bk_list,setBk_list] = React.useState();

    //console.log(name)
   // console.log(bk_list)

    //인풋함수
    const bucketName = (e) =>{
        setName(e.target.value);
    }
    const buckets = (e) =>{
      setBk_list(e.target.value);
    }

    //버튼 함수
    const add = () => {
      dispatch(bucketAction.addBucket(bk_list))
    }
    const Write_BK = () => {
        dispatch(bucketAction.createBucket({
            title: name,
            imageUrl: imageUrl,
            todo:[{content: bk_list, done : 0}]
        }))

        // history.push('/bucket/:id')
    }

   



  //이미지 프리뷰
  const preview = useSelector((state) => state.image.preview);

console.log(preview)

    return (
        <React.Fragment>
          <WriteWrap>
          <Grid margin="80px 0px 30px 0px">
                <Text bold>1.버킷리스트 미리보기 이미지를 등록해주세요.</Text>
                <Upload/>
            </Grid>
            <Image src={preview
                        ? preview
                        :"http://via.placeholder.com/400x300"}/>
           
            <Grid margin="30px 0px 0px 0px">
              <Text bold>2.버킷리스트 이름을 등록해주세요.</Text>
            </Grid>
            <Input placeholder="김버킷의 버킷리스트"  _onChange={bucketName}/>

            <Grid margin="50px 0px">
              <Text bold>3.버킷리스트 항목을 추가해보세요.</Text>
            <Grid>
              <Input placeholder="ex.혼자서 한라산 등반하기" _onChange={buckets}></Input>
            <Grid margin="20px 0px 0px 0px">
                    <Button backgroundColor="#F5C820" color="black" _onClick={add}>추가하기</Button>
                  </Grid>
                </Grid>
                <Grid margin="80px 0px 0px 0px">
                {
                    bucket_list.map((a,i) => {
                      return(
                        <BuckItem state="is_edit" key={i} {...a} />
                        )
                   })
                }  
                  
                  <Grid margin="80px 0px 0px 0px"/>
                  {/* 밑의 버튼이랑 사이 간격이니 꼭 유지해주세요 */}
                </Grid>
                
                
                </Grid>
                <SaveBtn onClick={Write_BK}>저장하기</SaveBtn>
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