import React from "react";
import styled from "styled-components";
import PostList from "./PostList";
import { Input, Grid,Button,Text} from "../elements";
import Logo from "../shared/logo.png"

const Signup =(props)=>{
    return(
        <React.Fragment>
            <Modal>
                <Grid margin="20px 0px 0px 0px">
                <img src={Logo} width="50px" style={{margin:"10px 50% auto", transform:"translateX(-50%)"}}/>
                </Grid>
                <Grid padding="20px" margin="50px 0px 0px 0px" is_flex>
                    <Input placeholder="아이디를 입력해주세요"></Input>
                    <Button width="80px" margin="12px 0px 0px 0px" backgroundColor="#949494">중복확인</Button>
                </Grid>
                <Grid padding="20px" margin="10px 0px 0px 0px" is_flex>
                    <Input placeholder="닉네임을 입력해주세요"></Input>
                    <Button width="80px" margin="11px 0px 0px 0px" backgroundColor="#949494">중복확인</Button>
                </Grid>
                <Grid padding="20px" margin="0px 0px 0px 0px">
                    <Input placeholder="비밀번호를 입력해주세요"></Input>
                </Grid>
                <Grid padding="20px" margin="10px 0px 0px 0px">
                    <Input placeholder="비밀번호를 다시 입력해주세요"></Input>
                </Grid>
                <Grid padding="20px" margin="40px 0px 0px 0px">
                    <Button backgroundColor="#F5C820" color="black">회원가입하기</Button>
                </Grid>
                <Grid padding="20px" margin="10px 0px 0px 0px">
                    <Button is_outlined backgroundColor="white" color="black">이미 회원이신가요? 로그인하기</Button>
                </Grid>
            </Modal>
            <PostList/>
        </React.Fragment>
    )
}



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
export default Signup;