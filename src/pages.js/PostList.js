import React from "react";
import Post from "../components/Post";
import {Grid} from "../elements";
import styled from "styled-components";
import {actionCreators as BucketAction} from "../redux/modules/bucket";
import {useSelector, useDispatch} from "react-redux";

const PostList =(props)=>{

  const dispatch = useDispatch();
//   React.useEffect(()=>{
//   dispatch(BucketAction.LodeBucketDB());
// },[]);

  const bucket_list = useSelector((state)=>state.bucket.list);
  console.log(bucket_list);
    return(
        <React.Fragment>
                <PostWrap>
                  <div style={{width:"100%",height:"80px"}}></div>
                  {bucket_list.map((b,idx)=>{
                return <Post key={b.id}{...b}/>
                })}    
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

export default PostList;