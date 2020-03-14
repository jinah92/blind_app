import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import $ from "jquery";
import axios from "axios";
import ReceivedMsg from "./ReceivedMsg";
import SentMsg from "./SentMsg";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class MyMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent_msg: [],
      received_msg: [],
      update_form: "none",
      visible: "visible"
    };
  }
  componentDidMount() {
    this.ShowMessages();
  }
  ShowMessages = async () => {
    const user_id = $.cookie("login_id");
    console.log(user_id);
    const send_param = { user_id, headers };
    if (user_id) {
      try {
        const result = await axios.post("http://localhost:9090/message/allmessages", send_param);
        if (result.data.received_msg) {
          this.setState({ received_msg: result.data.received_msg });
        }
        if (result.data.sent_msg) {
          this.setState({ sent_msg: result.data.sent_msg });
        }
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  render() {
    const myPostList = {
      visibility: this.state.visible
    };
    const form = {
      margin: "auto"
    };
    return (
      <div>
        <div style={form}>
          <div>받은 쪽지함</div>
          <div style={myPostList}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>쪽지번호</TableCell>
                  <TableCell>발신인</TableCell>
                  <TableCell>생성일</TableCell>
                  <TableCell>수정일</TableCell>
                  <TableCell>내용</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.received_msg.map(message => {
                  return (
                    <ReceivedMsg
                      key={message.id}
                      id={message.id}
                      sender_nick={message.sender_nick}
                      createDate={message.createdAt}
                      updateDate={message.updatedAt}
                      message={message.message}
                      /* superDelete={this.delete_post} superUpdate={this.update_post}  */ entries={
                        this.state.received_msg
                      }
                      showMessages={this.ShowMessages}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        <br />
        <br />
        <div style={form}>
          <div>보낸 쪽지함</div>
          <div style={myPostList}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>쪽지번호</TableCell>
                  <TableCell>수신인</TableCell>
                  <TableCell>생성일</TableCell>
                  <TableCell>수정일</TableCell>
                  <TableCell>내용</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.sent_msg.map(message => {
                  return (
                    <SentMsg
                      key={message.id}
                      id={message.id}
                      receiver_nick={message.member.nickname}
                      createDate={message.createdAt}
                      updateDate={message.updatedAt}
                      message={message.message}
                      /* superDelete={this.delete_post} superUpdate={this.update_post}  */ entries={
                        this.state.sent_msg
                      }
                      showMessages={this.ShowMessages}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default MyMessage;
