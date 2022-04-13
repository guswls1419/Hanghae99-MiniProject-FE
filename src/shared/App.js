import './App.css';
import Auth from "./Auth";
import Profile from "./Profile";
import PostList from '../pages.js/PostList';
import {BrowserRouter, Route} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configstore';
import Header from './Header';
import Login from '../pages.js/Login';
import Signup from '../pages.js/Signup';
import styled from 'styled-components';
import WriteBucket from '../pages.js/WriteBucket';
import BucketDetail from "../pages.js/BucketDetail";
import EditComment from '../pages.js/EditComment';
import Permit from './Permit';
import {useSelector, useDispatch} from "react-redux";
import React from 'react';
import {actionCreators as userAction} from "../redux/modules/user";



function App() {
  
  const REST_API_KEY="ccc8ac9f8e338ed91e0d3badd279b45f";
  const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const dispatch =useDispatch();
  const is_login =useSelector(state=>state.user.is_login);
  const is_session =sessionStorage.getItem("token")? true : false;
  React.useEffect(()=>{
    if(is_session){
      dispatch(userAction.loginCheckDB());
    }else{
      history.push("/login");
    }
  })
  return (
    <AppWrap>
      <ConnectedRouter history={history}>
      <Header/>
      <Permit/>
        <Route path="/" exact>
          <PostList/>
        </Route>
        <Route path="/oauth/kakao/callback" component={Auth}></Route>
        <Route path="/login" exact>
          <ModalWrap/>
          <Login/>
        </Route>

        <Route path="/signup" exact>
          <ModalWrap/>
            <Signup/>
        </Route>

        <Route path="/edit/:id" exact>
          <ModalWrap/>
          <EditComment/>
        </Route>

        <Route path="/write" exact component={WriteBucket}/>
        <Route path="/bucket/:id" exact component={BucketDetail}/>
      </ConnectedRouter>
    </AppWrap>
  );
}

const AppWrap=styled.div`
width:100%;
scroll-height:100%;
`

const ModalWrap=styled.div`
margin:0 auto;
width:100%;
height:100%;
background:rgba(0,0,0,0.6);
position:fixed;
top:0;
left:0;
z-index:3;
`
export default App;
