import React from 'react'
import {Grid, Image, Text, Button, Input} from "../elements";
import Upload from '../shared/Upload';

export const WriteBK_img = () => {

    return (
        <React.Fragment>
          <Grid width="60%" margin="0 auto">
            <Grid>
                <Text>버킷리스트 미리보기 이미지를 등록해주세요.</Text>
                <Upload></Upload>
            </Grid>
            <Grid>
                <Image rectangle="rectangle"/>
            </Grid>
            <Grid>
                <Text>버킷리스의 이름을 등록해주세요.</Text>
                <Input/>
            </Grid>
          </Grid>
        </React.Fragment>
    )
}

export default WriteBK_img;
