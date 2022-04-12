import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {actionCreator as imageActions} from "../redux/modules/image";
import { actionCreators as imageAction } from "../redux/modules/image";

const Upload = (porps) => {
    
        const dispatch = useDispatch();
        const is_uploading = useSelector(state => state.image.uploading); 
        const fileInput = React.useRef();
    
        const selectFile = (e) => {     
            const reader = new FileReader();     
            const file = fileInput.current.files[0];
            reader.readAsDataURL(file);  

            reader.onloadend = () => { 
                dispatch(imageActions.setPreview(reader.result));
            }

            let image = fileInput.current.files[0];
            dispatch(imageActions.uploadDB(image));
            
            }
    
        // const uploadDB = () => {
        //     let image = fileInput.current.files[0];
        //     dispatch(imageActions.uploadDB(image));
        // }
    
    
        return (
            <React.Fragment>
                <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
                {/* <button onClick={uploadDB}>업로드하기</button> */}
            </React.Fragment>
        )
    }





export default Upload;