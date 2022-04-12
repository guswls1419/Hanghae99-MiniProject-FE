import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import axios from 'axios';
import { setToken, delToken} from "../../shared/token";


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
        username:"godnjs1234",
        nickname:"권핑키"
    },
    nick_name_dupcheck:false,
    user_name_dupCheck:false,
};
const loginCheckDB = () => {
  console.log("로그인유지")
  const token = sessionStorage.getItem("token");
  return function (dispatch, getState, {history}) {
    console.log(token) ;
    }
    
  }


const signupFB=(username,pwd,nickname,pwd_check)=>{
    return async function(dispatch,getState,{history}){
        await axios.post('http://spt-prac.shop/user/signup', {
            username:username,
            password:pwd,
            nickname:nickname,
            pwdCheck:pwd_check
          })
          .then(function (response) {
              console.log(response)
              dispatch(setUser({
                username:username,
                password:pwd,
                nickname:nickname,
                pwdCheck:pwd_check
              }))
              history.push("/");
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}
const nicknameDupCheckFB=(nickname)=>{
    return function(dispatch,getState,{history}){
        console.log(nickname)
    }
}
const usernameDupCheckFB=(username)=>{
    return function(dispatch,getState,{history}){
        console.log(username)
    }
}
const loginFB = (username, password) => {
    return function (dispatch, getState, { history }) {
      axios
      .post('http://spt-prac.shop/user/login',{
        username: username,
        password: password,
      })
      .then((res) => {
        const user_info=res.config.data
        const token_res = res.headers.authorization;
        setToken(token_res);
        return user_info
      }).then((res)=>{
            const username=JSON.parse(res).username
          dispatch(setUser(username))  
      })
        .catch((err) => {
          console.log("로그인 확인 실패", err)
        })
        history.replace('/')
      .catch((err) => {
        window.alert("이메일이나 패스워드를 다시 확인해주세요!")
      })
    };
  };
const logOutDB =(dispatch,getState,{history})=>{
  console.log("로그아웃")
  dispatch(logOut());
  const token = sessionStorage.getItem("token");
  delToken(token);
  window.location.reload();
}


//4)리듀서 만든다(feat.immer)
export default handleActions(
    {
        [SET_USER]:(state,action)=>
        produce(state,(draft)=>{
            setCookie("is_login","success");
            draft.user.username = action.payload.user
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
    loginFB,
    logOutDB,
    loginCheckDB,
    signupFB,
    nicknameDupCheckFB,
    usernameDupCheckFB
};

export {actionCreators};