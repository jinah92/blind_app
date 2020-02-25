import React, {Component} from 'react';
import Home from "./home";
import Member from './member';
import Timeline from './timeline';
import UploadPost from './upload_post';
import Contact from './contact';
import MyPost from './mypost';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class MainContainer extends Component {
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
                                <NavDropdown.Item><NavLink to="#">회원정보 조회 및 수정</NavLink></NavDropdown.Item>
                                <NavDropdown.Item>쪽지함</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link><NavLink to='/contact'>Contact</NavLink></Nav.Link>
                        </Nav>
                        <Nav className="mr-auto" /* style={defaultStyle} */>
                            <Nav.Link><NavLink to='/member'>Enjoy</NavLink></Nav.Link>
                        </Nav>
                        <Navbar.Text>{/* {this.state.nick} */}</Navbar.Text>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-info">Search</Button>
                        </Form>
                    </Navbar>
                        <switch className="content">
                            <Route exact path='/' component={Home} />
                            <Route path='/post' component={UploadPost}/>
                            <Route path='/timeline' component={Timeline} />
                            <Route path='/member' component={Member} />
                            <Route path='/contact' component={Contact} />
                            <Route path='/mypost' component={MyPost} />
                        </switch>
                    
                </HashRouter>
            </div>
        );
    }
}

export default MainContainer;
