import React from "react";
import styled from "styled-components";
import PostList from "./PostList";
import { Input, Grid,Button,Text} from "../elements";
import { useDispatch } from "react-redux";
import Logo from "../shared/logo.png"
import { emailCheck } from "../shared/common";
import { actionCreators as userActions } from "../redux/modules/user";

const Signup =(props)=>{
    const dispatch=useDispatch();
    const [user_name,setUserName]=React.useState('');
    const [pwd,setPwd]=React.useState('');
    const [nick_name,setNickName]=React.useState('');
    const [pwd_check,setPwdCheck]=React.useState('');
    const [email_check,setEmailCheck]=React.useState(false);
    const pwdCheckCheck =()=>{
        if(pwd===""||pwd_check===""){
            return false;
        }
        if(pwd===pwd_check){
            return true;
        }else{
            return false;
        }
    }  
    const usernameCheck =(e)=>{
        if(!emailCheck(e.target.value)){
            setEmailCheck(false)
            return;
        }else{
            setEmailCheck(true)
        }
        setUserName(e.target.value);
    }
    const idDupCheck =()=>{
        if(user_name===""){
            window.alert("아이디를 입력해주세요")
            return;
        }
        dispatch(userActions.usernameDupCheckFB(user_name))
    }
    const nicknameDupCheck =()=>{
        if(nick_name===""){
            window.alert("닉네임을 입력해주세요")
            return;
        }
        dispatch(userActions.nicknameDupCheckFB(nick_name))
    }
    const signup=()=>{
        if(pwd ==""){
            window.alert("비밀번호를 입력해주세요")
            return;
        }
        dispatch(userActions.signupFB(user_name,pwd,nick_name));
    };

    return(
        <React.Fragment>
            <Modal>
                <Grid margin="20px 0px 0px 0px">
                <img src={Logo} width="50px" style={{margin:"10px 50% auto", transform:"translateX(-50%)"}}/>
                </Grid>
                <Grid padding="20px" margin="50px 0px 0px 0px" is_flex>
                    <Input _onChange ={usernameCheck} placeholder="아이디를 입력해주세요"></Input>
                    <Button width="80px" margin="12px 0px 0px 0px" backgroundColor="#949494" _onClick={idDupCheck}>중복확인</Button>
                </Grid>
                <Grid  padding="20px" margin="-20px 0px 0px 5px">
                    <IdCheck2>{email_check ?"사용가능한 형식입니다":""}</IdCheck2>
                    <IdCheck>{email_check ?"":"이메일형식으로 입력해주세요"}</IdCheck>
                </Grid>
                <Grid padding="20px" margin="10px 0px 0px 0px" is_flex>
                    <Input _onChange ={(e)=>{setNickName(e.target.value);}} placeholder="닉네임을 입력해주세요"></Input>
                    <Button width="80px" margin="11px 0px 0px 0px" backgroundColor="#949494" _onClick={nicknameDupCheck}>중복확인</Button>
                </Grid>
                <Grid padding="20px" margin="-5px 0px 0px 0px">
                    <Input type="password" _onChange ={(e)=>{setPwd(e.target.value);}} placeholder="비밀번호를 입력해주세요"></Input>
                </Grid>
                <Grid padding="20px" margin="10px 0px 0px 0px">
                    <Input type="password" _onChange ={(e)=>{setPwdCheck(e.target.value);}} placeholder="비밀번호를 다시 입력해주세요"></Input>
                </Grid>
                <Grid  padding="20px" margin="0px 0px 0px 5px">
                    <IdCheck>{pwdCheckCheck()?"":"비밀번호를 확인해주세요"}</IdCheck>
                    <IdCheck2>{pwdCheckCheck()?"비밀번호가 일치합니다":""}</IdCheck2>
                </Grid>
                <Grid padding="20px" margin="0px 0px 0px 0px">
                    <Button backgroundColor="#F5C820" color="black" _onClick={signup}>회원가입하기</Button>
                </Grid>
                <Grid padding="20px" margin="10px 0px 0px 0px">
                    <Button is_outlined backgroundColor="white" color="black">이미 회원이신가요? 로그인하기</Button>
                </Grid>
            </Modal>
            <PostList/>
        </React.Fragment>
    )
}

const IdCheck=styled.p`
font-size:12px;
color:#fa8072;
`
const IdCheck2=styled.p`
font-size:12px;
color:#03ac13;
`
const Modal =styled.div`
max-width:450px;
min-width:350px;
height:480px;
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