import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { actionCreators as bucketActions } from "./bucket"
import bucket from "./bucket";
import axios from "axios";


const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const GET_COMMENT = "GET_COMMENT";


const setComment = createAction(SET_COMMENT, (comment_list) => ({comment_list}));
const addComment = createAction(ADD_COMMENT, (commentId, comment) => ({commentId, comment}));
const getComment = createAction(GET_COMMENT, (postId,commentsList) => ({postId,commentsList}));
const deleteComment = createAction(DELETE_COMMENT, (commentId,postId) => ({commentId,postId}));

const initialState =  {list:[{
  Id: "",
comments: "",
imageUrl: "",
userInfo:{
nickname: "",
username: ""}
}]}



//댓글작성 미들웨어
const setCommentDB = (comment_list) => {
  console.log(comment_list)
    return async function (dispatch, getState, { history }) {
      const token = sessionStorage.getItem("token");
    //   const postId = getState().bucket.list[0].id;
   // console.log(comment_list)
      const postId = comment_list.Id
      const comment = comment_list.comments
      const username = comment_list.userInfo.username
      //console.log(postId,comment,username)
     await axios
        .post(`http://spt-prac.shop/api/post/${postId}/comment`,
          {
            "comment" : comment,
            "username" :username
          },
          {
           headers: {
            "Authorization": `${token}`, 
            },
          }
        )

        .then((res) => {
          dispatch(setComment(comment_list))
        })
        .catch((err) => {
            console.log("댓글 작성 실패", err);
          });
      //history.push('/')
    }
  }

//댓글삭제
const deleteCommentDB = (postId,commentId) => {
    return async function (dispatch, getState, { history }) {
      const token = sessionStorage.getItem("token");
      const postIds = parseInt(postId);
      const commentIds = parseInt(commentId);

      await axios
        .delete(`http://spt-prac.shop/api/post/${postIds}/${commentIds}`, {
          headers: {
            "Authorization": `${token}`, 
          },
        })
        .then((res) => {
          dispatch(deleteComment(postId,commentId))
        })
        .catch((err) => {
        console.log("댓글 삭제 실패", err);
        });
//        history.push('/')
    }
  }

const getCommentDB = (postId) => {
    return async function (dispatch, getState, { history }) {
      console.log(postId)
       await axios
       .get(`http://spt-prac.shop/api/post/${postId}`)
       .then((response) => {
        const commentsList = response.data.comment_list
        console.log(commentsList)
        dispatch(getComment(commentsList,postId))
      })
      .catch((err) => {
        console.log("댓글불러오기 실패", err);
      });
    }
}



export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
       console.log(state,action)
       draft.list=draft.list.push(action.payload.comment_list);
        
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.postId].unshift(action.payload.comment);
        //console.log(action.payload.comment)
        }), 

      [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex(
        (p) => p.commentId === action.payload.commentId
        );
        draft.list.splice(idx, 1); 
        }),

      [GET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list= action.payload.comment
        console.log(state, action)
      })
    },
        initialState
    );


const actionCreators = {
  setCommentDB,
  setComment,
  addComment,
 deleteComment,
deleteCommentDB,
getCommentDB,
getComment
};

export { actionCreators };