import React from "react";
import styled from "styled-components";
import { Grid,Button,Text } from "../elements";
import {useMediaQuery} from "react-responsive";
import Logo from "./logo.png"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";
const Header =(props)=>{
    const dispatch =useDispatch();
   
   const nickname=useSelector((state)=>state.user.userInfo.nickname)
   const is_login =useSelector((state)=>state.user.is_login)
   const is_session =sessionStorage.getItem("token")? true : false;
    const isPc = useMediaQuery ({
        query : "(min-width : 1024px) and (max-width :1920px)"
        });
const logout=()=>{
    console.log("로그아웃 누름")
    dispatch(userAction.logOutDB);
}
if(is_login && is_session){
            return( 
                <div style={{position:"fixed",top:"0",left:"0",zIndex:"1",width:"100%"}}>
                <Grid width="100%" height="80px" bg="rgba(255,255,255,0.8)">
                    <Grid width="80%" margin="0 auto" is_flex>
                        <Grid>
                            <img src={Logo} width="50px" style={{marginTop:"13px"}}/>
                        </Grid>
                    <Grid width="700px" is_flex>
                        <Grid margin="60px 0px 0px 0px">
                            {isPc &&<Text>{nickname}님 환영합니다</Text>}
                        </Grid>    
                    </Grid>
                        <Grid margin="45px 0px 0px 0px" is_flex width="300px">
                            <Button width="100px" margin="0 10px 0 0">마이버킷</Button>
                            <Button width="100px" _onClick={logout}>로그아웃</Button>
                        </Grid>
                    </Grid>
                </Grid> 
            </div>
            )}
        }

export default Header;