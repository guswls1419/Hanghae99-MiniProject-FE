import React from "react";
import styled from "styled-components";
import PostList from "./PostList";
import { Input, Grid,Button,Text} from "../elements";
import { keyframes } from "styled-components";
import Logo from "../shared/logo.png"

const Login =(props)=>{
    return(
        <React.Fragment>
            <PostList/>
            <Modal>
                <Grid width="100%" margin="20px auto">
                    <img src={Logo} width="50px" style={{margin:"10px 50% auto", transform:"translateX(-50%)"}}/>
                </Grid>
                <Grid padding="20px" margin="30px 0px 0px 0px">
                    <Input placeholder="아이디를 입력해주세요"></Input>
                </Grid>
                <Grid padding="20px" margin="10px 0px 0px 0px">
                    <Input placeholder="비밀번호를 입력해주세요"></Input>
                </Grid>
                <Grid padding="20px" margin="10px 0px">
                    <Button>로그인하기</Button>
                </Grid>
                <Grid padding="20px" margin="30px 0px">
                    <p style={{textAlign:"center"}}>소셜 로그인</p>
                </Grid>
                <Grid padding="20px" margin="10px 0px">
                    <Button backgroundColor="#F5C820" color="black">카카오톡으로 로그인하기</Button>
                </Grid>
                <Grid padding="20px">
                <Button is_outlined backgroundColor="white" color="black">아직 회원이 아니시라면? 회원가입하기</Button>
                </Grid>
            </Modal>
        </React.Fragment>
    )
}


const ModalWrap=styled.div`
margin:0 auto;
width:100%;
height:100%;
background:rgba(0,0,0,0.6);
position:absolute;
top:0;
left:0;
`
const fadeIn = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const Modal =styled.div`
max-width:450px;
min-width:350px;
height:470px;
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
export default Login;