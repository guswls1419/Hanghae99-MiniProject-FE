import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import Spinner from "../elements/Spinner";
import { useEffect } from "react";
import axios from "axios";
import { actionCreators as userAction } from "../redux/modules/user";
import { setToken, delToken} from "../shared/token";
import { useHistory } from "react-router-dom";

const Auth = (props) => {
  const dispatch =useDispatch();
  const history =useHistory();
  useEffect(()=>{
    let code = new URL(window.location.href).searchParams.get("code");
    const kakaoLogin = async()=>{
      await axios
      .get(`http://spt-prac.shop/oauth/kakao/callback?code=${code}`)
      .then((res) => {
        const token_res = res.headers.authorization;
        setToken(token_res);
        return token_res
      })
      .then((token_res) =>{
        axios({ 
          method: "post", 
          url: "http://spt-prac.shop/islogin", 
          headers: { 
            "Authorization": `${token_res}`, 
          }, 
        })
        .then((res) => {
          console.log(res);
          dispatch(userAction.setUser(
            {
              username: res.data.username,
              nickname: res.data.nickname
            })
          );
        })
        .catch((err) => {
          console.log("로그인 확인 실패", err)
        })
        history.replace('/')
      })
      }
      kakaoLogin()
  },[])
  return <Spinner/>;
};

export default Auth;
