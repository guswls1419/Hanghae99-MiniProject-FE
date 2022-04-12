import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {actionCreator as imageActions} from "../redux/modules/image";

const Upload = (porps) => {


    const dispatch = useDispatch();
    const fileInput = React.useRef();

        const encodeFileToBase64 = (fileBlob) => {
             const reader = new FileReader();
             reader.readAsDataURL(fileBlob);
              return new Promise((resolve) => {
                   reader.onload = () => {
                    dispatch(imageActions.setPreview(reader.result));
                        resolve(); 
                    }; 
                }); 
            };


    return (
        <React.Fragment>
                <input type="file" onChange={(e) => { encodeFileToBase64(e.target.files[0]); }}/>
        </React.Fragment>
    )
}

export default Upload;