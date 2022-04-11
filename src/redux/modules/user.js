import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import axios from 'axios'

//1)액션 타입을 만든다
const SET_USER ="SET_USER";
const LOG_OUT ="LOG_OUT";
const GET_USER ="GET_USER";

//2)액션 생성 함수를 만든다
const setUser = createAction(SET_USER,(user)=>({user}));
const logOut = createAction(LOG_OUT,(user)=>({user}));
const getUser = createAction(GET_USER,(user)=>({user}));

//3)initialState 만든다
const initialState ={
    user_name:"godnjs1234",
    nick_name:"권핑키",
    is_login:false,
};

//5) 페이지 이동을 위해 미들웨어를 만듦

const signupFB=(user_name,pwd,nick_name,pwd_check)=>{
    return async function(dispatch,getState,{history}){
        axios.post('/user/signup', {
            username:user_name,
            passowrd:pwd,
            nickname:nick_name,
            pwdCheck:pwd_check
          })
          .then(function (response) {
              dispatch(setUser({
                username:user_name,
                passowrd:pwd,
                nickname:nick_name,
                pwdCheck:pwd_check
              }))
              history.push("/");
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

const nicknameDupCheckFB=(nick_name)=>{
    return function(dispatch,getState,{history}){
        console.log(nick_name)
    }
}

const usernameDupCheckFB=(user_name)=>{
    return function(dispatch,getState,{history}){
        console.log(user_name)
    }
}

const loginFB =(user_name,pwd)=>{
    return async function(dispatch,getState,{history}){
        axios.post('/user/login', {
            username: user_name,
            passowrd: pwd,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}


//4)리듀서 만든다(feat.immer)
export default handleActions(
    {
        [SET_USER]:(state,action)=>
        produce(state,(draft)=>{
            setCookie("is_login","success");
            draft.user_name = action.payload.user_name;
            draft.nick_name = action.payload.nick_name;
            draft.is_login=true;
        }),
        [LOG_OUT]:(state,action)=>
        produce(state,(draft)=>{
          
        }),
        [GET_USER]:(state,action)=>
        produce(state,(draft)=>{

        }),
    },initialState
);

const actionCreators={
    signupFB,
    nicknameDupCheckFB,
    usernameDupCheckFB,
    loginFB
};

export {actionCreators};