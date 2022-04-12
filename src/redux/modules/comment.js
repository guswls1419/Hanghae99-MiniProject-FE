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



const setComment = createAction(SET_COMMENT, (comment_list) => ({comment_list}));
const addComment = createAction(ADD_COMMENT, (comment_id, comment) => ({comment_id, comment}));
const getComment = createAction(GET_COMMENT, (comment_id, comment) => ({comment_id, comment}));
const deleteComment = createAction(DELETE_COMMENT, (comment_id,bucket_id) => ({comment_id,bucket_id}));

const initialState =  {list:{}}



//댓글작성 미들웨어(수정필요)
// const setCommentDB = (comment,username) => {
//     return async function (dispatch, getState, { history }) {
//      await axios
//         .post(
//             '   ',
//           { comment:comment,
//             username:username
//          },
//         //   {
//         //     headers: {
//         //       Authorization: cookie,
//         //     },
//         //   }
//         )
//         .then((res) => {
//           dispatch(setComment(comment, username))
//         })
//         .catch((err) => {
//             console.log("댓글 작성 실패", err);
//           });
//       //history.push('/')
//     }
//   }

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
        draft[action.payload.bucket_id] = action.payload.comment_list;
        //console.log(state, action)
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.bucket_id].unshift(action.payload.comment);
        //console.log(action.payload.comment)
        }), 

      [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex(
        (p) => p.comment_id === action.payload.comment_id
        );
        draft.list.splice(idx, 1); //삭제할 게시글의 index를 찾아서 splice로 지운다.
        }),
      [GET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.bucket_id] = action.payload.comment_list
      })
    },
        initialState
    );


const actionCreators = {
  //setCommentDB,
  setComment,
  addComment,
 deleteComment,
//deleteCommentDB,
getCommentDB,
getComment
};

export { actionCreators };