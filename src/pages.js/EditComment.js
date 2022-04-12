import React from "react";
import styled from "styled-components";
import BucketDetail from "./BucketDetail";
import {Grid,Button,Text,Input} from "../elements";
import { useHistory } from "react-router-dom";


const EditComment =(props)=>{
    const history = useHistory();

    const SuccessComment=()=>{
        history.push('/bucket/:id')
        
    }

    const [comment,setComment] = React.useState();

    const comment_ct = (e) =>{
        setComment(e.target.value);
    }
   // console.log(comment)

    return(
        <React.Fragment>
            
            <Modal>
                <Grid width="100%" margin="20px auto">
                    <Grid padding="20px" margin="15px 0px 0px 0px">
                        <Input multiLine placeholder="댓글 내용" _onChange={comment_ct}></Input>
                    </Grid>
                    <Grid padding="20px" margin="150px 0px 0px 0px">
                        <Button backgroundColor="#F5C820" color="black" _onClick={SuccessComment} >댓글수정완료</Button>
                    </Grid>
                </Grid>
            </Modal>
            <BucketDetail/>
        </React.Fragment>
    )
}

const Modal =styled.div`
max-width:450px;
min-width:350px;
height:300px;
background:rgba(255,255,255,0.9);
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
z-index:3;
border-radius:10px;
box-shadow:
0 1px 1px hsl(0deg 0% 0% / 0.075),
0 2px 2px hsl(0deg 0% 0% / 0.075),
0 4px 4px hsl(0deg 0% 0% / 0.075),
0 8px 8px hsl(0deg 0% 0% / 0.075),
0 16px 16px hsl(0deg 0% 0% / 0.075)
;
`

export default EditComment;