import React from "react";
import {Grid,Image,Text} from "../elements";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {actionCreators as BucketAction} from "../redux/modules/bucket";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";

const Post =(props)=>{
    const bucket_list=useSelector((state)=>state.bucket.list)
    const dispatch = useDispatch();
    const history = useHistory();
    return(
        <React.Fragment>
                <Box style = {{backgroundImage:`url(${props.imageUrl})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover"}} 
                                onClick={()=>{
                  history.push(`/bucket/${props.postId}`)
                  window.location.reload();
                }}>
                  <Grid padding="20px">
                          <Grid>
                              <div style={{float:"right", display:"flex"}}>
                                  <div>🖤{props.like_cnt}</div>
                                  <div>💬{props.comment_cnt}</div>
                              </div>
                          </Grid>
                          <Grid margin="220px 0px 0px 0px">
                              <TitleText>
                                  {props.title}
                              </TitleText>
                          </Grid>
                      </Grid>
                  </Box>
        </React.Fragment>
    )
}
Post.defaultProps={
    url:"http://th1.tmon.kr/thumbs/image/f9f/661/078/258e751b2_700x700_95_FIT.jpg",
    contents:"권해원님의 버킷리스트 텍스트는 최대 세줄까지 가능합니다",
    like_cnt:0,
    comment_cnt:0,
}

const TitleText=styled.div`
width:100%;
height:63px;
font-size:16px;
color:black;
overflow:hidden;
text-overflow:ellipsis;
white-space:initial;
font-weight:600;
`
const Box=styled.div`
border-radius:10px;
min-width:270px;
width:280px;
background:linear-gradient(to bottom, rgba(0,0,0,0.1) 0% , rgba(0,0,0,0.5) 100%),url(imageUrl);
height:350px;
margin:10px;
box-shadow:
0 1px 1px hsl(0deg 0% 0% / 0.075),
0 2px 2px hsl(0deg 0% 0% / 0.075),
0 4px 4px hsl(0deg 0% 0% / 0.075),
0 8px 8px hsl(0deg 0% 0% / 0.075),
0 16px 16px hsl(0deg 0% 0% / 0.075);
`


export default Post;