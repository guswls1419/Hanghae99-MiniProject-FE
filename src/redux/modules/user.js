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
    user:{
        user_name:"godnjs1234",
        nick_name:"권핑키"
    },
    nick_name_dupcheck:false,
    user_name_dupCheck:false,
};
//5) 페이지 이동을 위해 미들웨어를 만듦
// const signupFB=(user_name,pwd,nick_name)=>{
//     return function(dispatch,getState,{history}){
//         auth
//         .createUserWithEmailAndPassword(user_name,pwd)
//         .then((user)=>{
//             auth.currentUser.updateProfile({
//                 displayName:nick_name,
//             }).then(()=>{
//                 dispatch(setUser({user_name:user_name, nick_name:nick_name}));
//                 history.push("/");
//             }).catch((error)=>{
//                 console.log(error);
//             })
//         })
//         .catch((error)=>{
//             var errorCode =error.code;
//             var errorMessage=error.message;
//             console.log(errorCode,errorMessage);
//         });
//     }
// }

const signupFB=(user_name,pwd,nick_name,pwd_check)=>{
    return async function(dispatch,getState,{history}){
        await axios.post('http://spt-prac.shop/user/signup', {
            username:user_name,
            password:pwd,
            nickname:nick_name,
            pwdCheck:pwd_check
          })
          .then(function (response) {
              console.log(response)
              dispatch(setUser({
                username:user_name,
                password:pwd,
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
        axios.post('http://spt-prac.shop/user/login', {
            username: user_name,
            password: pwd,
          })
          .then(function (response) {
            console.log(response);
            dispatch(setUser({
                username:user_name,
                password:pwd,
              }))
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
            draft.user = action.payload.user
            draft.is_login=true;
        }),
        [LOG_OUT]:(state,action)=>
        produce(state,(draft)=>{
            deleteCookie("is_login");
           draft.user=null;
           draft.is_login=false;
          
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