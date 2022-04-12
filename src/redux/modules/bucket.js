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

const PG_UPDATE_BUCKET = "PG_UPDATE_BUCKET";

// *** 액션 생성 함수
const createBucket = createAction(CREATE_BUCKET,(bucket) => ({bucket}));
const addBucket = createAction(ADD_BUCKET,(buckets) => ({buckets}));//버킷추가
const lodeBucket = createAction(LODE_BUCKET,(bucket_list) => ({bucket_list}));
const uplodeBucket = createAction(UPLODE_BUCKET,(bucket_id,bucket) => ({bucket_id,bucket})); 
const deldteBucket = createAction(DELETE_BUCKET,(bucket_id) => ({bucket_id})); 

const PG_updateBucket = createAction(PG_UPDATE_BUCKET,(bucket_idx) => ({bucket_idx})); 




// *** 초기값
const initialState = {
    list:[{
    id : 1,
    title: "제목입니다",
    imageUrl:"/images/cancle.png",
    todo:[{ id : 1, content: "반가워요", done : 0}]}]
}

// const initialPost = {
//   title: "제목입니다",
//     imageUrl:"/images/cancle.png",
//   todolist:[{content: "반가워요", done : 0}]
// }

// *** 미들웨어
const LodeBucketDB = () => {
  return async function (dispatch, getState, { history }) {
    await axios
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

const createBucketDB = (title,imageUrl,content) => {
  return async function (dispatch, getState, { history }) {
    //const token = localStorage.getItem("user_token");
    await axios
        .post("http://localhost:3001/bucket",
        {  title: title,
           imageUrl:imageUrl,
           todo:[{content: content , done : 0}]},
        {
         // headers: { Authorization: token },
        }
        )
        .then((response) => {
          console.log(response)
          dispatch(createBucket(title,imageUrl,content))
          history.replace("/bucket/${id}");
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
  [ADD_BUCKET] : (state, action) => produce(state, (draft) => {//버킷추가
    draft.list=action.payload
  console.log(action.payload)
  }), 
  [LODE_BUCKET] : (state, action) => produce(state, (draft) => {
    draft.list=action.payload.bucket_list
    //console.log(draft)
  }),
  [UPLODE_BUCKET] : (state, action) => produce(state, (draft) => {
      
  }),
  [DELETE_BUCKET] : (state, action) => produce(state, (draft) => {
      
  }),
  [PG_UPDATE_BUCKET] : (state, action) => produce(state, (draft) => {
 const bk_idxd =action.payload.bucket_idx.id
  const bk_todolist = action.payload.bucket_idx.todolist[0]
  const done =bk_todolist.done
  draft.list[bk_idxd] = {...bk_todolist, done : done === 0 ? 1 : (done===1 ? 0 : 1) }

  // draft.list[bk_idxd] = bk_todolist.done = 0
  // ? {...bk_todolist,   done : 1 }
  // : {...bk_todolist,   done : 0 }

  console.log(bk_todolist.done)
  console.log(draft.list[bk_idxd])
     
  }),
  }, initialState
);

const actionCreators = {
  createBucket,
  createBucketDB,
  addBucket,
  lodeBucket,
  uplodeBucket,
  deldteBucket,
  LodeBucketDB,
  PG_updateBucket,

}

export {actionCreators}