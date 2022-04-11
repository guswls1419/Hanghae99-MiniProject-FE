import { createAction, handleActions } from "redux-actions";
import {produce} from "immer";
import { bindActionCreators } from "redux";
import axios from 'axios';


// *** 액션 타입
const CREATE_BUCKET = "CREATE_BUCKET";
const ADD_BUCKET = "ADD_BUCKET";
const LODE_BUCKET = "LODE_BUCKET";
const UPLODE_BUCKET = "UPLODE_BUCKET";
const DELETE_BUCKET = "DELETE_BUCKET";

// *** 액션 생성 함수
const createBucket = createAction(CREATE_BUCKET,(bucket) => ({bucket}));
const addBucket = createAction(ADD_BUCKET,(bucket) => ({bucket}));
const lodeBucket = createAction(LODE_BUCKET,(bucket_list) => ({bucket_list}));
const uplodeBucket = createAction(UPLODE_BUCKET,(bucket_id,bucket) => ({bucket_id,bucket})); 
const deldteBucket = createAction(DELETE_BUCKET,(bucket_id) => ({bucket_id})); 



// *** 초기값
const initialState = {
    list:[{title: "제목입니다",
    imageUrl:"/images/cancle.png",
    todolist:[{content: "반가워요", done : 0}]}]
}

// const initialPost = {
//   title: "제목입니다",
//     imageUrl:"/images/cancle.png",
//   todolist:[{content: "반가워요", done : 0}]
// }

// *** 미들웨어
const LodeBucketDB = () => {
  return function (dispatch, getState, { history }) {
       axios
        .get("http://localhost:3001/bucket")
        .then((result) => {
          console.log(result.data)
          dispatch(lodeBucket(result.data))
        })
        .catch((err) => {
          console.log("내가 작성한 게시물 조회 실패", err);
        });
  };
};

// *** 리듀서
export default handleActions(
  {
  [CREATE_BUCKET] : (state, action) => produce(state, (draft) => {
    draft.list=action.payload.bucket;
    //console.log(draft.list)
  }), 
  [ADD_BUCKET] : (state, action) => produce(state, (draft) => {
    draft.data=action.payload.bucket
   //  console.log()
  }), 
  [LODE_BUCKET] : (state, action) => produce(state, (draft) => {
    draft.list=action.payload.bucket_list
    //console.log(draft)
  }),
  [UPLODE_BUCKET] : (state, action) => produce(state, (draft) => {
      
  }),
  [DELETE_BUCKET] : (state, action) => produce(state, (draft) => {
      
  }),
  }, initialState
);

const actionCreators = {
  createBucket,
  addBucket,
  lodeBucket,
  uplodeBucket,
  deldteBucket,
  LodeBucketDB,

}

export {actionCreators}