import React from "react";
import styled from "styled-components";
import { Grid,Button,Text } from "../elements";
import {useMediaQuery} from "react-responsive";
import Logo from "./logo.png"
import { useSelector } from "react-redux";

const Header =(props)=>{
    const nick_name =useSelector((state)=>state.user.nick_name);
    const isPc = useMediaQuery ({
        query : "(min-width : 1024px) and (max-width :1920px)"
        });
        
    return(
        <React.Fragment>
            <div style={{position:"fixed",top:"0",left:"0",zIndex:"1",width:"100%"}}>
            <Grid width="100%" height="80px" bg="rgba(255,255,255,0.8)">
                <Grid width="80%" margin="0 auto" is_flex>
                    <Grid>
                        <img src={Logo} width="50px" style={{marginTop:"13px"}}/>
                    </Grid>
                    <Grid width="700px" is_flex>
                        <Grid margin="60px 0px 0px 0px">
                            {isPc && <Text>{nick_name}님 환영합니다</Text>}
                        </Grid>
                        <Grid margin="45px 0px 0px 0px" is_flex>
                            <Button width="100px" margin="0 10px 0 0">마이버킷</Button>
                            <Button width="100px">로그아웃</Button>
                        </Grid>
                        
                    </Grid>
                </Grid> 
            </Grid>
            </div>
        </React.Fragment>
    )
}

export default Header;