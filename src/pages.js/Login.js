import React from "react";
import styled from "styled-components";
import PostList from "./PostList";
import { Input, Grid,Button} from "../elements";
import { keyframes } from "styled-components";
import Logo from "../shared/logo.png"
import { useDispatch, } from "react-redux";
import { emailCheck } from "../shared/common";
import {actionCreators as userActions} from "../redux/modules/user";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import KakaologinBtn from "../shared/kakao_login_medium_wide.png"
const Login =(props)=>{
    const dispatch=useDispatch();
    const REST_API_KEY="ccc8ac9f8e338ed91e0d3badd279b45f";
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const history =useHistory();
    const [username,setUserName]=React.useState('');
    const [password,setPassword]=React.useState('');
    const [email_check,setEmailCheck]=React.useState(false);
    const userNameCheck =(e)=>{
    if(!emailCheck(e.target.value)){
        setEmailCheck(false)
        return;
    }else{
        setEmailCheck(true)
    }
    setUserName(e.target.value);
}
    const login=()=>{
        if(username ==="" || password ===""){
            window.alert("아이디와 비밀번호를 입력해주세요");
            return ;
        }
        dispatch(userActions.loginFB(username,password));
    }
    return(
        <React.Fragment>
            <PostList/>
            <Modal>
                <Grid width="100%" margin="20px auto">
                    <img src={Logo} width="50px" style={{margin:"10px 50% auto", transform:"translateX(-50%)"}}/>
                </Grid>
                <Grid padding="20px" margin="30px 0px 0px 0px">
                    <Input  _onChange ={userNameCheck} placeholder="아이디를 입력해주세요" ></Input>
                </Grid>
                <Grid  padding="20px" margin="0px 0px 0px 5px">
                    <IdCheck2>{email_check ?"사용가능한 형식입니다":""}</IdCheck2>
                    <IdCheck>{email_check ?"":"이메일형식으로 입력해주세요"}</IdCheck>
                </Grid>
                <Grid padding="20px" margin="0px 0px 0px 0px">
                    <Input  _onChange ={(e)=>{setPassword(e.target.value);}} placeholder="비밀번호를 입력해주세요"  type="password"></Input>
                </Grid>
                <Grid padding="20px" margin="10px 0px">
                    <Button _onClick={login}>로그인하기</Button>
                </Grid>
                <Grid padding="20px" margin="0px 0px">
                    <p style={{textAlign:"center", fontSize:"14px"}}>소셜 로그인</p>
                </Grid>
                <Grid padding="20px" margin="10px 0px">
                    <a href={KAKAO_AUTH_URL}><img src={KakaologinBtn} style={{width:"100%", marginTop:"-4px"}}></img></a>
                </Grid>
                <Grid padding="20px">
                <Button is_outlined backgroundColor="white" color="black" _onClick={()=>(history.push("/signup"))}>아직 회원이 아니시라면? 회원가입하기</Button>
                </Grid>
            </Modal>
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