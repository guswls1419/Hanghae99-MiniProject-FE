import React from "react";
import Post from "../components/Post";
import {actionCreators as BucketAction} from "../redux/modules/bucket";
import {useSelector, useDispatch} from "react-redux";
import InfinityScroll from "../shared/InfinityScroll";

const PostList =(props)=>{
  const dispatch = useDispatch();
  const paging = useSelector((state) => state.bucket.paging);
  const is_loading = useSelector((state)=>state.bucket.is_loading);
  const bucket_list = useSelector((state)=>state.bucket.list)
  console.log(bucket_list);
  console.log(paging);
  console.log(is_loading);

  React.useEffect(()=>{
    if(bucket_list.length===0){
      dispatch(BucketAction.LodeBucketDB());
    }
},[]);

    return(
 <React.Fragment>
   <div style={{width:"80%",margin:"0 auto", display:"flex",flexWrap:"wrap", marginTop:"80px"}}>
 <InfinityScroll
            callNext={() => {console.log("callnext제발"); dispatch(BucketAction.LodeBucketDB(paging.page));}}
            is_next={paging.page ? true : false}
            loading={is_loading}>
                  {bucket_list.map((b,i)=>{
                return <Post key={i} {...b} />})}   
          </InfinityScroll>
          </div>
 </React.Fragment> 
      ) 
}

export default PostList;