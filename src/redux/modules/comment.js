import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
//import { firestore } from "../../shared/firebase";
//import "moment";
//import moment from "moment";
//import firebase from "firebase";
import { actionCreators as bucketActions } from "./bucket"
import bucket from "./bucket";
import axios from "axios";


const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const GET_COMMENT = "GET_COMMENT";



const setComment = createAction(SET_COMMENT, (comment,userInfo) => ({comment,userInfo}));
const addComment = createAction(ADD_COMMENT, (commentId, comment) => ({commentId, comment}));
const getComment = createAction(GET_COMMENT, (commentId, comment) => ({commentId, comment}));
const deleteComment = createAction(DELETE_COMMENT, (commentId,postId) => ({commentId,postId}));

const initialState =  {list:{
  id : 1,
  comment: '오아', 
  username: 'ssss',
  createdAt: '1시간전',
  editCheck : false
}}



//댓글작성 미들웨어(수정필요)
const setCommentDB = (comment,userInfo) => {
    return async function (dispatch, getState, { history }) {
      const token = sessionStorage.getItem("token");
    //   const postId = getState().bucket.list[0].id;
    console.log(userInfo)

     await axios
        .post("http://13.125.254.246/api/post/22/comment",
          {
            "comment" : comment,
            "username" :userInfo.username
          },
          {
           headers: {
            "Authorization": `${token}`, 
            },
          }
        )

        .then((res) => {
          dispatch(setComment(comment,userInfo.username))
        })
        .catch((err) => {
            console.log("댓글 작성 실패", err);
          });
      //history.push('/')
    }
  }

//댓글삭제
// const deleteCommentDB = (comment_id,bucket_id) => {
//     return async function (dispatch, getState, { history }) {
//       await axios
//         .delete("", {
//         //   headers: {
//         //     Authorization: cookie,
//         //   },
//         })
//         .then((res) => {
//           dispatch(deleteComment(comment_id,bucket_id))
//         })
//         .catch((err) => {
//         console.log("댓글 삭제 실패", err);
//         });
//         history.push('/')
//     }
//   }

const getCommentDB = () => {
    return async function (dispatch, getState, { history }) {
       await axios
       .get("http://localhost:3001/comment_list")
       .then((result) => {
        dispatch(getComment(result.data))
      })
      .catch((err) => {
        console.log("댓글작성 실패", err);
      });
    }
}

export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        console.log(action.payload.postId)
        draft[action.payload.postId] = action.payload.comment;
        
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.postId].unshift(action.payload.comment);
        //console.log(action.payload.comment)
        }), 

      [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex(
        (p) => p.commentId === action.payload.commentId
        );
        draft.list.splice(idx, 1); //삭제할 게시글의 index를 찾아서 splice로 지운다.
        }),
      [GET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.commentId] = action.payload.comment_list
      })
    },
        initialState
    );


const actionCreators = {
  setCommentDB,
  setComment,
  addComment,
 deleteComment,
//deleteCommentDB,
getCommentDB,
getComment
};

export { actionCreators };