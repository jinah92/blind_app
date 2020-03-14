import React, { Component } from "react";
import { NavLink, Route, HashRouter } from "react-dom";
import { Form, Button, ButtonToolbar } from "react-bootstrap";
import $ from "jquery";
import {} from "jquery.cookie";
import axios from "axios";
require("dotenv").config();

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Login extends Component {
  state = {
    login_nick: this.props.nick,
    loginStyle: "inline-block",
    logoutStyle: "none",
    registerStyle: "none",
    value: ""
  };
  logout = () => {
    axios.post("http://localhost:9090/member/logout", { headers }).then(returnData => {
      if (returnData.data.message) {
        $.removeCookie("login_nick");
        $.removeCookie("login_id");
        this.setState({
          loginStyle: "inline-block",
          logoutStyle: "none"
        });
      }
      this.emailE.value = "";
      this.pwdE.value = "";
    });
  };
  login = () => {
    const send_param = {
      headers,
      email: this.emailE.value,
      pwd: this.pwdE.value
    };
    axios.post("http://localhost:9090/member/login", send_param).then(returnData => {
      console.log(returnData.data);
      if (returnData.data.result.nickname) {
        const nickname = returnData.data.result.nickname;
        alert(nickname + "님, 환영합니다!");
        $.cookie("login_nick", returnData.data.result.nickname);
        $.cookie("login_id", returnData.data.result.id);
        this.setState({
          login_nick: returnData.data.result.nickname,
          loginStyle: "none",
          logoutStyle: "inline-block"
        });
      } else {
        alert("로그인 실패");
      }
    });
  };
  user_insert = () => {
    const send_param = {
      nickname: this.new_nickE.value,
      email: this.new_emailE.value,
      pwd: this.new_pwdE.value,
      company: this.new_companyE.value
    };
    $.post("http://localhost:9090/member/insert", send_param).then(returnData => {
      var nickname = returnData.member.nickname;
      if (returnData.member) {
        alert(nickname + "님, 가입 성공");
        this.setState({
          loginStyle: "inline-block",
          registerStyle: "none"
        });
      } else {
        alert("insert member denied");
      }
    });
  };
  register = () => {
    this.setState({
      loginStyle: "none",
      logoutStyle: "none",
      registerStyle: "inline-block"
    });
    this.new_emailE.value = "";
    this.new_nickE.value = "";
    this.new_companyE.value = "";
    this.new_pwdE.value = "";
  };
  loginHome = () => {
    this.setState({
      loginStyle: "inline-block",
      registerStyle: "none"
    });
  };
  userInfo = () => {
    alert($.cookie("login_nick"));
  };
  render() {
    const loginStyle = {
      display: this.state.loginStyle,
      width: "30%",
      position: "fixed",
      top: 100,
      right: 0,
      bottom: 0,
      left: 0,
      margin: "auto",
      textAlign: "center"
    };
    const logoutStyle = {
      display: this.state.logoutStyle,
      width: "30%",
      position: "fixed",
      top: 100,
      right: 0,
      bottom: 0,
      left: 0,
      margin: "auto",
      textAlign: "center"
    };
    const registerStyle = {
      display: this.state.registerStyle,
      width: "30%",
      position: "fixed",
      top: 100,
      right: 0,
      bottom: 0,
      left: 0,
      margin: "auto",
      textAlign: "center"
    };
    let login_nick;
    if ($.cookie("login_nick")) {
      login_nick = $.cookie("login_nick");
      loginStyle.display = "none";
      logoutStyle.display = "inline-block";
    }
    return (
      <div>
        <div style={loginStyle}>
          <h2>로그인</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={ref => (this.emailE = ref)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              ref={ref => (this.pwdE = ref)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.login}>
            로그인
          </Button>
          <Button variant="success" type="submit" onClick={this.register}>
            회원가입
          </Button>
        </div>

        <div style={logoutStyle}>
          {login_nick} 님, 접속
          <ButtonToolbar>
            <Button variant="warning" type="submit" onClick={this.logout}>
              로그아웃
            </Button>
            <Button onClick={this.userInfo}>회원정보</Button>
          </ButtonToolbar>
        </div>

        <div style={registerStyle}>
          <h2>회원가입</h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="이메일"
              ref={ref => (this.new_emailE = ref)}
              required
            />
            <br />
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                ref={ref => (this.new_pwdE = ref)}
                required
              />
              <br />
            </Form.Group>
            <Form.Control
              type="text"
              placeholder="닉네임"
              ref={ref => (this.new_nickE = ref)}
              required
            />
            <br />
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
            <Form.Control
              type="text"
              placeholder="회사명"
              ref={ref => (this.new_companyE = ref)}
              required
            />
            <br />
          </Form.Group>
          <ButtonToolbar>
            <Button variant="primary" type="submit" onClick={this.user_insert}>
              제출
            </Button>
            <Button variant="warning" type="submit" onClick={this.loginHome}>
              돌아가기
            </Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

export default Login;
