import React from "react";
import styled from "styled-components";
import {Grid,Text,Input,Button} from "../elements";
import ProgressBar from "../components/ProgressBar";
import CommentItem from "../components/CommentItem";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as bucketAction } from "../redux/modules/bucket";
import { actionCreators as commentAction } from "../redux/modules/comment";

const BucketDetail =(props)=>{
    const history = useHistory();
    const bucket_list = useSelector((state)=>state.bucket.list)

    const userInfo = useSelector((state) => state.user.userInfo)
    const comment = useSelector((state)=> state.comment.list)
  
   const dispatch = useDispatch();
  const user_token = localStorage.getItem("user_token") ? true : false;
  const params = useParams();
  //const imgUrl = bucket_list[0].imageUrl
  //console.log(params.id)

  React.useEffect(() => {
    dispatch(bucketAction.getBucketDB(params.id));
   
  }, [dispatch,params.id]);

    const editWrite = () => {
        history.push(`/editB/${bucket_list[0].postId}`)
      
    }
    const [comments,setComments] = React.useState();
    const comment_cont = (e) =>{
        setComments(e.target.value);
    }
 
    const comment_send = () => {
      dispatch(commentAction.setCommentDB({comments:comments, Id : params.id, userInfo, imageUrl:bucket_list[0].imageUrl}))
    }
    const [checkState, setCheckState] = React.useState(false);
    const complete=()=>{
    checkState===true? setCheckState(false):setCheckState(true)
  
  }

    return(
        <>
          <WriteWrap>
            <Grid margin="80px 0px 30px 0px">
                <Text bold>김버킷의 버킷리스트</Text>
                <Grid margin="30px 0px 0px 0px">
                {/* <ProgressBar/> */}
            </Grid>
            </Grid>
                <Grid margin="80px 0px 0px 0px">
                  {
                  bucket_list.map((a,i) => {
                      return(
                              <div style={{marginTop:"10px"}} key={i}>
                              <Box checkState={checkState} onClick={complete}>
                                <Text>{a.todo[i].content}</Text>
                                <div>{checkState? "🗹":"☐"}</div>
                              </Box>
                              </div>
                        )
                    })
                  } 
                </Grid>
                <Grid margin="220px 0px 0px 0px">
                <div style={{float:"left", display:"flex"}}>
                    <div>🖤{bucket_list.likeNum}</div>
                    <div>💬{bucket_list.commentsNum}</div>
                </div>
                </Grid>
                <Grid is_flex margin="0px 0px 0px 0px">
                    <Input _onChange={comment_cont}/>
                    <Button width="60px" color="#fff" margin='10px 0px 0px 0px' _onClick={comment_send} >입력</Button>
                    {/* _onClick={comment_send} */}
                </Grid>
                <Grid  margin="20px 0px 0px 0px">
                 <CommentItem postId={params.id} />
                <CommentItem postId={params.id} />
                <CommentItem postId={params.id} />
                <CommentItem postId={params.id} />
                <CommentItem postId={params.id} />
                    <Grid margin="40px 0px 0px 0px"/>
                  {/* 밑의 버튼이랑 사이 간격이니 꼭 유지해주세요 */}
                </Grid> 
          </WriteWrap>
          <FloatButton><p style={{fontSize:"20px"}} onClick={editWrite}>✏️</p></FloatButton>
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

export default BucketDetail;