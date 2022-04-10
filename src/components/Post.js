import React from "react";
import {Grid,Image,Text} from "../elements";
import styled from "styled-components";

const Post =(props)=>{
    return(
        <React.Fragment>
                <Box src={props.url}>
                <Grid padding="20px">
                        <Grid>
                            <div style={{float:"right", display:"flex"}}>
                                <div>🖤{props.like_cnt}</div>
                                <div>💬{props.comment_cnt}</div>
                            </div>
                        </Grid>
                        <Grid margin="240px 0px 0px 0px">
                            <Text bold color="white" size="16px">{props.contents}</Text>
                        </Grid>
                    </Grid>
                </Box>
        </React.Fragment>
    )
}
Post.defaultProps={
    url:"http://th1.tmon.kr/thumbs/image/f9f/661/078/258e751b2_700x700_95_FIT.jpg",
    contents:"권해원님의 버킷리스트 텍스트는 최대 두줄까지 가능합니다",
    like_cnt:0,
    comment_cnt:0,
}

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
background:linear-gradient(to bottom, rgba(0,0,0,0.1)0%, rgba(0,0,0,0.5) 100%),url("${(props) => props.src}");
`

export default Post;