import React, { Component } from "react";
import { Button, Badge, Form } from "react-bootstrap";
import axios, { post } from "axios";
import $ from "jquery";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  hidden: {
    display: "none"
  }
});

class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      message: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
      show: "visible"
    };
    /* this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.addCustomer = this.addCustomer.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this); */
  }
  handleValueChange = e => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };
  sendMessage = async () => {
    const sendee_id = this.props.userId;
    const sender_id = $.cookie("login_id");
    const sender_nick = $.cookie("login_nick");
    const message = this.text.value;
    console.log(message);
    const send_param = { sendee_id, sender_id, sender_nick, message };
    try {
      const result = await axios.post("http://localhost:9090/message/send", send_param);
      if (result.data.message) {
        alert("쪽지보내기 성공");
        this.handleClose();
      } else {
        alert("쪽지보내기 실패");
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      file: null,
      message: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false
    });
  };
  componentDidMount() {
    this.ShowMessage();
  }
  ShowMessage = () => {
    let nick = this.props.user;
    if ($.cookie("login_nick") === nick) {
      this.setState({ show: "hidden" });
    } else {
      this.setState({ show: "visible" });
    }
  };
  render() {
    const div_style = {
      visibility: this.state.show,
      float: "right"
    };
    return (
      <div style={div_style}>
        <Badge variant="info" onClick={this.handleClickOpen}>
          쪽지
        </Badge>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>쪽지 보내기</DialogTitle>
          <DialogContent>
            <Form.Control
              label="보내실 내용"
              as="textarea"
              rows="10"
              cols="50"
              ref={ref => (this.text = ref)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="dark" size="sm" onClick={this.sendMessage}>
              보내기
            </Button>
            <Button variant="dark" size="sm" onClick={this.handleClose}>
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(SendMessage);
