import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import axios from 'axios';
import { setToken, delToken} from "../../shared/token";


//1)액션 타입을 만든다
const SET_USER ="SET_USER";
const LOG_OUT ="LOG_OUT";
const GET_USER ="GET_USER";
const ID_DUP_CHECK ="ID_DUP_CHECK";

//2)액션 생성 함수를 만든다
const setUser = createAction(SET_USER,(user)=>({user}));
const logOut = createAction(LOG_OUT,(user)=>({user}));
const getUser = createAction(GET_USER,(user)=>({user}));
const idDupCheck =createAction(ID_DUP_CHECK,(user)=>({user}));



//3)initialState 만든다
const initialState ={
    userInfo:{
        username:"godnjs1234",
        nickname:"권핑키"
    },
    isIdDupChecked:false,
    isNickDupChecked:false,
};
const idDupCheckDB=(user_name)=>{
  return function(dispatch,getState,{history}){
     axios
    .get(`http://spt-prac.shop/user/idCheck/${user_name}`)
    .then((response)=>{
      if(response.data.result===false){
        window.alert("사용가능한 아이디입니다.");
      }else{
        window.alert("사용불가능한 아이디입니다.");
      }
    })
    .catch((err)=>{
      console.log(("err확인"+err))
      window.alert("서버 오류입니다.")
    })
  }
}

const NickDupCheck=(nick_name)=>{
  return function(dispatch,getState,{history}){
    axios
    .get(`http://spt-prac.shop/user/nicknameCheck/${nick_name}`)
    .then((response)=>{
      if(response.data.result===false){
        window.alert("사용가능한 닉네임입니다.");
      }else{
        window.alert("사용불가능한 닉네임입니다.");
      }
    })
    .catch((err)=>{
      console.log(("err확인"+err))
      window.alert("서버 오류입니다")
    })
  }
}



const signupDB = (user_name, pwd,nick_name,pwd_check) => {
  return function (dispatch, getState, {history}){
    axios
    .post(
      'http://spt-prac.shop/user/signup',{
      "username": user_name,
      "password": pwd,
      "nickname": nick_name ,
      "passwordCheck":pwd_check
    })
    .then((res) => {
      window.alert("회원가입이 완료되었습니다!");
      history.replace('/login');
    })
    .catch((err) => {
      window.alert(err.response.data.errorMessage);
    })
  }
}

const loginCheckDB = () => {
  const token = sessionStorage.getItem("token");
  return function (dispatch, getState, {history}) {
    axios.post("http://spt-prac.shop/islogin", {}, {
      headers: { 
        "content-type": "applicaton/json;charset=UTF-8", 
        "accept": "application/json", 
        "Authorization": `${token}`, 
      },
    })
    .then((res) => {
      console.log(res)
        dispatch(setUser({
          username:res.data.username,
          nickname:res.data.nickname.split("_")[1]
        })
        );
    })
    .catch((err) => {
      console.log("로그인 확인 실패", err)
    })
    
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
        dispatch(setUser(
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
  history.replace('/login');
}


//4)리듀서 만든다(feat.immer)
export default handleActions(
    {
        [SET_USER]:(state,action)=>
        produce(state,(draft)=>{
            setCookie("is_login","success");
            draft.userInfo = action.payload.user
            draft.is_login=true;
        }),
        // [ID_DUP_CHECK]:(state,action)=>
        // produce(state,(draft)=>{
        //   console.log(draft)
        //     draft.isIdDupChecked=true;
        // }),

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
    signupDB,
    idDupCheckDB,
    NickDupCheck,
    setUser,
};

export {actionCreators};