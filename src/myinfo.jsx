import React, {Component} from 'react';
import {NavLink, Route, HashRouter} from 'react-dom';
import {ListGroup, Col, Button, Form, ButtonToolbar} from 'react-bootstrap';
import $ from 'jquery';
import axios from 'axios';

axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

class MyInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            mainStyle: "visible",
            registerStyle: "hidden"
        };
    }
    deleteMember=()=>{
        const user_id=$.cookie('login_id');
        const send_param={user_id};
        const check = window.confirm('계정을 삭제하시겠습니까?');
        if(check){
            $.post('http://localhost:9090/member/delete', send_param, (returnData)=>{
                if(returnData.message){
                    alert('계정삭제 완료');
                    $.removeCookie("login_nick");
                    $.removeCookie("login_id");
                }else{
                    alert('계정삭제 오류');
                }
            });
        }
    }
    user_update=async()=>{
        const user_id=$.cookie("login_id");
        const new_pw=this.new_pwdE.value;
        const new_nick=this.new_nickE.value;
        const new_company=this.new_companyE.value;
        console.log(user_id);
        const send_param={user_id, new_pw, new_nick, new_company, headers};
        try{
            const result = await axios.post('http://localhost:9090/member/update', send_param);
            if(result.data.result){
                alert('회원정보 수정 성공');
                $.cookie("login_nick", result.data.result.nickname);
                this.setState({
                    mainStyle: "visible",
                    registerStyle: "hidden"
                });
            }
            console.log(result.data);
        }catch(err){
            console.log(err);
        }
    }
    user_default=()=>{
        this.setState({
            mainStyle: "visible",
            registerStyle: "hidden"
        });
    }
    updateMember=async()=>{
        this.setState({
            mainStyle: "hidden",
            registerStyle: "visible"
        });
    }

    render(){
        const div_style={
            margin: 50
        }
        const mainStyle ={
            visibility: this.state.mainStyle
        }
        const registerStyle = {
            visibility: this.state.registerStyle,
            width: "30%",
            position:"fixed",
            top:100,
            right:0,
            bottom:0,
            left:0,
            margin:"auto",
            textAlign: "center"
        }
        return(
            <div style={div_style}>
                <Col md={{ span: 6, offset: 3 }} style={mainStyle}>
                    <ListGroup>
                        <ListGroup.Item>나의 게시글</ListGroup.Item>
                        <ListGroup.Item>관심 게시글</ListGroup.Item>
                        <ListGroup.Item>관심 토픽</ListGroup.Item>
                        <ListGroup.Item><Button variant="warning" onClick={this.updateMember}>회원정보 수정</Button><Button variant="danger" onClick={this.deleteMember}>회원 탈퇴</Button></ListGroup.Item>
                    </ListGroup>
                </Col>
                <div style={registerStyle}>
                    <h2>회원정보 수정</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="이메일" disabled >{}</Form.Control><br />
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Enter Password" ref={ref=>this.new_pwdE=ref} required/><br />
                        </Form.Group>
                        <Form.Control type="text" placeholder="닉네임" ref={ref=>this.new_nickE=ref} required/><br />
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select" value={this.state.value} onChange={this.handleChange}>
                                <option>회사의 산업분야</option>
                                <option value="agriculture">농업, 임업 및 어업</option>
                                <option value="mining">광업</option>
                                <option value="manufacturing">제조업</option>
                                <option value="electronic">전기 공급업</option>
                                <option value="water">수도, 하수 및 폐기물 처리</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Control type="text" placeholder="회사명" ref={ref=>this.new_companyE=ref} required/><br />
                    </Form.Group>
                    <ButtonToolbar>
                        <Button variant="primary" type="submit" onClick={this.user_update}>수정하기</Button>
                        <Button variant="warning" type="submit" onClick={this.user_default}>돌아가기</Button>
                    </ButtonToolbar>
                </div>
            </div>
        );
    }
}

export default MyInfo;