import { createAction, handleActions } from "redux-actions";
import {produce} from "immer";
import { bindActionCreators } from "redux";
import axios from 'axios';
import { useSelector } from "react-redux";


// *** 액션 타입
const CREATE_BUCKET = "CREATE_BUCKET";
//const ADD_BUCKET = "ADD_BUCKET";
const LODE_BUCKET = "LODE_BUCKET";
const GET_BUCKET = "GET_BUCKET";
const UPLODE_BUCKET = "UPLODE_BUCKET";
const DELETE_BUCKET = "DELETE_BUCKET";

const PG_UPDATE_BUCKET = "PG_UPDATE_BUCKET";

// *** 액션 생성 함수
const createBucket = createAction(CREATE_BUCKET,(bucket) => ({bucket}));
//const addBucket = createAction(ADD_BUCKET,(bucket) => ({bucket}));//버킷추가
const lodeBucket = createAction(LODE_BUCKET,(bucket_list) => ({bucket_list}));
const getBucket = createAction(LODE_BUCKET,(postlist) => ({postlist}));
const uplodeBucket = createAction(UPLODE_BUCKET,(bucket_id,bucket) => ({bucket_id,bucket})); 
const deldteBucket = createAction(DELETE_BUCKET,(bucket_id) => ({bucket_id})); 

const PG_updateBucket = createAction(PG_UPDATE_BUCKET,(bucket_idx) => ({bucket_idx})); 



// *** 초기값
const initialState = {
    list:[
        {
      id : 1,
      title: "",
      imageUrl:"",
      todo:[{ content: null, done : 0}]}
  ]
}

// const initialPost = {
//   title: "제목입니다",
//     imageUrl:"/images/cancle.png",
//   todolist:[{content: "반가워요", done : 0}]
// }

// *** 미들웨어
const LodeBucketDB = () => {
  return async function (dispatch, getState, { history }) {
    const token = sessionStorage.getItem("token");
    const user = getState().user
    await axios
        .get(`http://13.125.254.246/api/posts`, {
          headers: { Authorization: token },})
        .then((result) => {
         // console.log(result.data)
          dispatch(lodeBucket(result.data))
          console.log(result.data)
        })
        .catch((err) => {
          console.log(" 게시물 조회 실패", err);
        });
  };
};

//하나의 게시글 가져오기
const getBucketDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    const token = sessionStorage.getItem("token");
    console.log(postId)
    await axios
        .get(`http://13.125.254.246/api/post/${postId}`, {
          headers: { Authorization: token },})
        .then((response) => {
          console.log(response.data)
         dispatch(getBucket(response.data));
        })
        .catch((err) => {
          console.log("내가 작성한 게시물 조회 실패", err);
        });
  };
};


const createBucketDB = (bucket) => {
  return async function (dispatch, getState, { history }) {
    const token = sessionStorage.getItem("token");
    console.log(bucket)
await axios
        .post("http://spt-prac.shop/api/post",
        {  "title": bucket.title,
           "imageUrl":bucket.imgFile,
           "todo": bucket.contentList
          },
           {
            headers: { 
              "Authorization": `${token}`, 
            },
          })
       
          
          
        .then((response) => {
         // console.log(response)
          dispatch(createBucket(bucket))
          //history.replace("/bucket/${id}");
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
    draft=action.payload.bucket;
    //console.log(action.payload.bucket_list)
  }), 
  // [ADD_BUCKET] : (state, action) => produce(state, (draft) => {//버킷추가
  //  draft.list.unshift(action.payload.bucket)
  // console.log(action,state)
  // }), 
  [LODE_BUCKET] : (state, action) => produce(state, (draft) => {
    draft.list=action.payload.bucket_list
   console.log(action.payload.bucket_list)
  }),
  [GET_BUCKET] : (state, action) => produce(state, (draft) => {
    draft=action.payload.bucket_list
   console.log(draft)
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

  //console.log(bk_todolist.done)
  //console.log(draft.list[bk_idxd])
     
  }),
  }, initialState
);

const actionCreators = {
  createBucket,
  createBucketDB,
  //addBucket,
  lodeBucket,
  getBucket,
  getBucketDB,
  uplodeBucket,
  deldteBucket,
  LodeBucketDB,
  PG_updateBucket,

}

export {actionCreators}