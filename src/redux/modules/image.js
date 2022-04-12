import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const UPLOAD_IMG = "UPLOAD_IMG";
const SET_PREVIEW = "SET_PREVIEW";

// action creators
const uploadImg = createAction(UPLOAD_IMG, (image) => ({ image }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// initialState
const initialState = {
  image: "",
  uploading: false,
  preview: null,
};

// const uploadDB = () => {
//     const formData = new FormData();
//     formData.append("file", files);
//     axios({
//       method: "post",
//       url: "",
//       data: formData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: localStorage.getItem("user_token"),
//       },
//     })
//       .then((response) => {
//         window.alert("사진이 업로드 되었습니다.");
//         setImgFile(response.data.imageUrl); // 서버에서 받아온 이미지url
//         setPreview(`${response.data.imageUrl}`); // 이미지url 변수에 저장
//       })
//       .catch((err) => {
//         window.alert("사진 업로드 실패");
//       });
//   };


//reducer
export default handleActions(
  {
    [UPLOAD_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.image = action.payload.image;
        draft.uploading = false;
        console.log(draft.image);
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
       draft.preview = action.payload.preview;

      }),
  },
  initialState
);

const actionCreator = {
  uploadImg,
 // uploadImgFB,
  setPreview,
//  deleteImgFB,
};

export { actionCreator };