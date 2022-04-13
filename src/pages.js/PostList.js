import React from "react";
import Post from "../components/Post";
import {Grid} from "../elements";
import styled from "styled-components";
import {actionCreators as BucketAction} from "../redux/modules/bucket";
import {useSelector, useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";

const PostList =(props)=>{
  const dispatch = useDispatch();
  const bucket_list = useSelector((state)=>state.bucket.list)
 // console.log(bucket_list)

  React.useEffect(()=>{
  dispatch(BucketAction.LodeBucketDB());
},[]);

    return(
        <React.Fragment>
                <PostWrap>
                  <div style={{width:"100%",height:"80px"}}></div>
                  {
                  bucket_list.map((b,i)=>{
                    //console.log(b.imageUrl)
                return <Post key={i} {...b} />
                })
                }    
                </PostWrap>
        </React.Fragment>
    )
}

const PostWrap=styled.div`
  width:80%;
  margin:0 auto;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-around;
`

const TitleText=styled.div`
width:100%;
height:63px;
font-size:16px;
color:white;
overflow:hidden;
text-overflow:ellipsis;
white-space:initial;
font-weight:600;
`
const Box=styled.div`
border-radius:10px;
min-width:270px;
width:280px;
background:lightgrey;
height:350px;
margin:10px;
box-shadow:
0 1px 1px hsl(0deg 0% 0% / 0.075),
0 2px 2px hsl(0deg 0% 0% / 0.075),
0 4px 4px hsl(0deg 0% 0% / 0.075),
0 8px 8px hsl(0deg 0% 0% / 0.075),
0 16px 16px hsl(0deg 0% 0% / 0.075)
;
background:linear-gradient(to bottom, rgba(0,0,0,0.1) 0% , rgba(0,0,0,0.5) 100%),url("${(props) => props.src}");
`
export default PostList;