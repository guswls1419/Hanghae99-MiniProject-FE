import React from 'react'
import '../shared/App.css'
import {Grid, Image, Text, Button, Input} from "../elements";
import BuckItem from "../components/BucketItem";
import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux'; 
import { actionCreators as bucketAction } from "../redux/modules/bucket";
import axios from 'axios';
import { useHistory } from "react-router-dom";

export const WriteBucket = (props) => {
  const bucket_list = useSelector((state)=>state);
  const preview = useSelector((state) => state.image); 

//console.log(bucket_list)

  const dispatch = useDispatch();

    const [name,setName] = React.useState();
    const [bkContent,setBkContent] = React.useState({"content": "" , "done" : false});
    const [contentList, setContentList] = React.useState([]);

 
    //인풋함수
    const bucketName = (e) =>{
        setName(e.target.value);
    }
    const buckets = (e) =>{
      setBkContent({"content": (e.target.value) , "done" : false});
    }


    //버튼 함수
    const add = (e) => {
      setContentList([...contentList, bkContent])
    }

    //이미지
  const fileInput = React.useRef();
  const [imgFile, setImgFile] = React.useState("");
  const [Preview, setPreviewSrc] = React.useState('');

 //이미지 프리뷰
  const selectFile = () => {
        const reader = new FileReader();     
        const file = fileInput.current.files[0];
        reader.readAsDataURL(file);  

        return new Promise((resolve) => {
          reader.onload = () => {
          setPreviewSrc(reader.result); 
          resolve();
         }; 
      });
 
      };

//이미지업로드
    const Write_BK = () => {
        dispatch(bucketAction.createBucketDB({title:name,contentList,imgFile}))
        const file = fileInput.current.files[0];
        const token = sessionStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", file);
        axios({
          method: "post",
          url: "http://spt-prac.shop/api/image",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `${token}`,
          },
        })
          .then((response) => {
            window.alert("사진이 업로드 되었습니다.");
            setImgFile(`http://spt-prac.shop${response.data.imageUrl}`);
          })
          .catch((err) => {
            window.alert("사진 업로드 실패");
          });
      };


    return (
        <React.Fragment>
          <WriteWrap>
          <Grid margin="80px 0px 30px 0px">
                <Text bold>1.버킷리스트 미리보기 이미지를 등록해주세요.</Text>

                {/* <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/> */}
               <form >
                <input
          cursor="pointer"
          type="file"
          name="file"
          id="input-file"
          encType="multipart/form-data"
          onChange={selectFile}
          ref={fileInput}
        />
       </form>
          </Grid>
            <Image src={ Preview
                        ? Preview
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
                    contentList.map((a,i) => {
                       return(
                        <div style={{marginTop:"10px"}}>
                                <Box>
                                <Text>{a.content}</Text>
                                <Button width="auto" padding="5px 10px" backgroundColor="transparent" color="black">✖</Button>
                              </Box>
                        </div>

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