import React, {Component} from 'react';
import Home from "./home";
import Login from './login';
import Timeline from './timeline';
import UploadPost from './upload_post';
import Contact from './contact';
import MyPost from './mypost';
import MyInfo from './myinfo';
import $ from 'jquery';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class MainContainer extends Component {
    state={
        nickname: $.cookie("login_nick")
    }
    /* state={
        login_nick: "",
        defaultStyle: "inline-block",
        loginStyle: "none",
        logoutStyle: "none",
        registerStyle: "none",
    } */
    render(){
        /* const defaultStyle = {
            display: this.state.defaultStyle
        }
        const loginStyle = {
            display: this.state.loginStyle
        } */
        return(
            <div>
                <HashRouter>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand exact to ="/">우리들의 Blind</Navbar.Brand>
                        <Nav className="mr-auto" /* style={loginStyle} */>
                            <NavLink exact to='/'><Button>홈으로</Button></NavLink>
                            <Nav.Link><NavLink to='/timeline'>타임라인</NavLink></Nav.Link>
                            <NavDropdown title="내 포스트" id="basic-nav-dropdown">
                            <NavDropdown.Item><NavLink to="/post">신규 등록</NavLink></NavDropdown.Item>
                            <NavDropdown.Item><NavLink to="/mypost">포스트 조회 및 수정</NavLink></NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="회원정보" id="basic-nav-dropdown">
                                <NavDropdown.Item><NavLink to="/myinfo">회원정보 조회 및 수정</NavLink></NavDropdown.Item>
                                <NavDropdown.Item>쪽지함</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link><NavLink to='/contact'>Contact</NavLink></Nav.Link>
                           
                        </Nav>
                        {/* <Nav className="mr-auto">
                            <Nav.Link><NavLink to='/login'>Enjoy</NavLink></Nav.Link>
                        </Nav> */}
                        <Form inline>
                            <Navbar.Text>{this.state.nickname}</Navbar.Text>
                        </Form>

                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-info">Search</Button>
                        </Form>
                    </Navbar>
                        <div className="content">
                            <Route exact path='/' component={Home} />
                            <Route path='/post' component={UploadPost}/>
                            <Route path='/timeline' component={Timeline} />
                            <Route path='/login' component={Login} nick={this.state.nickname}/>
                            <Route path='/contact' component={Contact} />
                            <Route path='/mypost' component={MyPost} />
                            <Route path='/myinfo' component={MyInfo}/>
                        </div>
                </HashRouter>
            </div>
        );
    }
}

export default MainContainer;
