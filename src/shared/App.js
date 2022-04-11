import './App.css';
import PostList from '../pages.js/PostList';
import {BrowserRouter, Route} from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configstore';
import Header from './Header';
import Login from '../pages.js/Login';
import Signup from '../pages.js/Signup';
import styled from 'styled-components';
import WriteBucket from '../pages.js/WriteBucket';
import BucketDetail from "../pages.js/BucketDetail";
import EditComment from '../pages.js/EditComment';

function App() {
  return (
    <AppWrap>
      <ConnectedRouter history={history}>
      <Header/>

        <Route path="/" exact>
          <PostList/>
        </Route>

        <Route path="/login" exact>
          <ModalWrap/>
          <Login/>
        </Route>

        <Route path="/signup" exact>
          <ModalWrap/>
            <Signup/>
        </Route>

        <Route path="/edit/:id" exact>
          <ModalWrap/>
          <EditComment/>
        </Route>

        <Route path="/write" exact component={WriteBucket}/>
        <Route path="/bucket/:id" exact component={BucketDetail}/>
      </ConnectedRouter>
    </AppWrap>
  );
}

const AppWrap=styled.div`
width:100%;
scroll-height:100%;
`

const ModalWrap=styled.div`
margin:0 auto;
width:100%;
height:100%;
background:rgba(0,0,0,0.6);
position:fixed;
top:0;
left:0;
z-index:3;
`
export default App;
