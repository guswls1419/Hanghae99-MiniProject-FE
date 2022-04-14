    import React from "react";
    import styled from "styled-components";
    import {Grid,Text,Button} from "../elements";
    import Logut from "../shared/update.png"
    import { useHistory, useParams } from "react-router-dom";
    import { useDispatch, useSelector } from "react-redux";
    import { actionCreators as commentActions } from "../redux/modules/comment";
    import axios from "axios";

    const CommentItem =(props)=>{

        const dispatch = useDispatch();
        const comment = useSelector((state) => state.bucket.list);
        console.log(comment)
    
 
        const {postId} = props;  

    React.useEffect(() => {
    dispatch(commentActions.getCommentDB(postId));
    
    }, [])
 
    // console.log(props.useIn)
        const history = useHistory();
        const editComment=()=>{
            history.push('/edit/:id')
        }
        const {nickname, createdAt, comments} = props;

        console.log(props)
        const deleteBt = () => {
            dispatch(commentActions.deleteCommentDB(props.postId,props.id))
        }

        return(
            <React.Fragment>
                <CommentBox>
                    <SubContents>
                        <Grid is_flex>
                        <p>{nickname} |{createdAt}</p>
                        <Grid is_flex width="40px">
                            <Button width="auto" padding="0px 5px 0px 10px" backgroundColor="transparent" _onClick={editComment}>
                                <img src={Logut} style={{width:"12px", margin:"5px 3px 0px 0px"}}/>
                            </Button>
                            <Button width="auto" backgroundColor="transparent" color="black" _onClick={deleteBt} >✖</Button>
                        </Grid>
                        </Grid>
                    </SubContents>
                        <Comments>{comments}</Comments>
                </CommentBox>
            </React.Fragment>
            
        )
    }

    CommentItem.defaultProps={
        nickname:"김버킷",
        createdAt:"3시간 전",
        comments:"우와 정말 열심히 사시네요 저도 참고해서 해봐야겠습니다!!!",
    }

    const CommentBox=styled.div`
    width:100%;
    padding:10px;
    box-sizing:border-box;
    //border-bottom:1px solid #d3d3d3;
    `;
    const SubContents=styled.div`
    width:100%;
    font-size:12px;
    float:left;
    `;
    const Comments=styled.div`
    width:100%;
    font-size:14px;
    float:left;
    `;

export default CommentItem;