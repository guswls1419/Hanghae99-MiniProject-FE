import React from "react";
import Post from "../components/Post";
import {Grid} from "../elements";
import styled from "styled-components";


const PostList =(props)=>{
    return(
        <React.Fragment>
                <PostWrap>
                  <div style={{width:"100%",height:"80px"}}></div>
                  <Post/>
                   <Post/>
                   <Post/>
                   <Post/>
                   <Post/>
                   <Post/>
                   <Post/>
                   <Post/>   
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