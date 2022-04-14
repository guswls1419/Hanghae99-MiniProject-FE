import { createAction, handleActions } from "redux-actions";
import {produce} from "immer";
import axios from 'axios';


// *** 액션 타입
const CREATE_BUCKET = "CREATE_BUCKET";
const LODE_BUCKET = "LODE_BUCKET";
const GET_BUCKET = "GET_BUCKET";
const UPLODE_BUCKET = "UPLODE_BUCKET";
const DELETE_BUCKET = "DELETE_BUCKET";
const PG_UPDATE_BUCKET = "PG_UPDATE_BUCKET";
const LOADING = "LOADING";
// *** 액션 생성 함수
const createBucket = createAction(CREATE_BUCKET,(bucket) => ({bucket}));
const lodeBucket = createAction(LODE_BUCKET,(bucket_list,paging) => ({bucket_list,paging}));
const getBucket = createAction(GET_BUCKET,(postlist) => (postlist));
const deleteTodo = createAction(DELETE_BUCKET,(bucket_idx) => ({bucket_idx})); 
const PG_updateBucket = createAction(PG_UPDATE_BUCKET,(bucket_idx) => ({bucket_idx})); 
const loading =createAction(LOADING,(is_loading)=>({is_loading}));
// *** 초기값
const initialState = {
    list:[],
    paging:{page:1, size:8},
    is_loading:false,
}

// *** 미들웨어
const LodeBucketDB = (page=1,size=8) => {
  return async function (dispatch, getState, { history }) {
    const _paging=getState().bucket.paging;
    if (!_paging.page) {
      return;
    }
    dispatch(loading(true));
    const token = sessionStorage.getItem("token");
    await axios
        .get(`http://spt-prac.shop/api/postsWithPage?page=${page}&size=8&sortBy=id&isAsc=true`,{
          headers: { Authorization: token },})
        .then((result) => {
          console.log(result);
          let paging={
            page:result.data.content.length===size?page+1:null,
            size:size,
          };
          let bucket_data =[];
          console.log(paging); //길이 일치하니까 page수가 하나 증가함
          result.data.content.forEach((singledata)=>{
            bucket_data.push({
              title:singledata.title,
              comment_cnt:singledata.commentsNum,
              image_url:singledata.imageURl,
              like_cnt:singledata.likesNum,
              post_id:singledata.postId,
              user_name:singledata.userNickname,
            });
        });
        console.log(paging);
        dispatch(lodeBucket(bucket_data,paging));
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
        .get(`http://spt-prac.shop/api/post/${postId}`, {
          headers: { Authorization: token },})
        .then((response) => {
          console.log(response)
         dispatch(getBucket(response.data));
        })
        .catch((err) => {
          console.log("내가 작성한 게시물 조회 실패", err);
        });
  };
};

//게시글 생성
const createBucketDB = (bucket) => {
  return async function (dispatch, getState, { history }) {
    const token = sessionStorage.getItem("token");
    console.log(bucket.imgFile)
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
//todo 삭제
const deleteTodoDB = (postId,todoNum) => {
  return async function (dispatch, getState, { history }) {
    const token = sessionStorage.getItem("token");
    if (!postId) {
      return;
    }
    const _bucket = getState().bucket.list;

   await axios
      .delete(`http://spt-prac.shop/api/post/${postId}/todo/${todoNum}`, {
        headers: { 
          "Authorization": `${token}`, 
        },
      })
      .then((res) => {
        const bucket_index = _bucket.findIndex((p) => {
          return parseInt(p.postId) === parseInt(postId);
        });

        dispatch(deleteTodo(bucket_index));
        history.replace("/");
      })
      .catch((err) => {
        console.log("게시글 삭제 실패!", err);
      });
  };
};



// *** 리듀서
export default handleActions(
  {
  [CREATE_BUCKET] : (state, action) => produce(state, (draft) => {
    draft=action.payload.bucket;
  }), 
  [LODE_BUCKET] : (state, action) => produce(state, (draft) => {
    console.log(action.payload);
    draft.list.push(...action.payload.bucket_list);
    draft.is_loading=false;
    if (action.payload.paging) {
      draft.paging = action.payload.paging;
    }
    
  }),
  [GET_BUCKET] : (state, action) => {
    console.log(action.payload.todo)
   return {
   list :[ ...state.list, action.payload]
  }
  },
  [DELETE_BUCKET] : (state, action) => produce(state, (draft) => {
    draft.list = state.list.filter((l, idx) => {
      return parseInt(action.payload.bucket_index) !== idx;
    });
  }),
  [PG_UPDATE_BUCKET] : (state, action) => produce(state, (draft) => {
 const bk_idxd =action.payload.bucket_idx.id
  const bk_todolist = action.payload.bucket_idx.todolist[0]
  const done =bk_todolist.done
  draft.list[bk_idxd] = {...bk_todolist, done : done === 0 ? 1 : (done===1 ? 0 : 1) }
  }),

  [LOADING]:(state,action)=>produce(state,(draft)=>{
            draft.is_loading=action.payload.is_loading;
        })
      },initialState
)


const actionCreators = {
  createBucket,
  createBucketDB,
  lodeBucket,
  getBucket,
  getBucketDB,
  deleteTodo,
  LodeBucketDB,
  PG_updateBucket,
  deleteTodoDB,

}

export {actionCreators}