import React, { Component } from "react";
import { Button, Badge } from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import "../css/btn_style.css";
import HeartImg from "../img/heart.png";
import HeartImg_disbaled from "../img/heart_disabled.png";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Like extends Component {
  state = {
    liked: 0,
    heart: "none",
    heart_disabled: ""
  };
  likePost = async user_id => {
    $(".heart").on("click", () => {
      $(this).toggleClass("heart-blast");
    });
    const post_id = this.props.post;
    const send_param = { post_id, user_id, headers };
    if (!this.state.liked) {
      const result = await axios.post("http://localhost:9090/post/like", send_param);
      if (result.data.message) {
        alert("좋아요!");
        this.setState({ liked: 1, heart: "", heart_disabled: "none" });
        this.props.show();
      } else {
        alert("시스템 에러(좋아요)");
      }
    } else {
      const result = await axios.post("http://localhost:9090/post/unlike", send_param);
      if (result.data.message) {
        alert("좋아요 취소!");
        this.setState({ liked: 0, heart: "none", heart_disabled: "" });
        this.props.show();
      } else {
        alert("시스템 에러(좋아요 취소)");
      }
    }
  };
  render() {
    const heartStyle = {
      display: this.state.heart
    };
    const heartStyle_disabled = {
      display: this.state.heart_disabled
    };
    return (
      <div>
        <Button
          variant="light"
          size="sm"
          onClick={() => {
            this.likePost(this.props.user);
          }}
        >
          <img style={heartStyle} src={HeartImg} width="15" height="15" />
          <img style={heartStyle_disabled} src={HeartImg_disbaled} width="15" height="15" />
        </Button>
        <Button variant="light" size="sm" disabled={this.state.liked}>
          <Badge variant="light">{this.props.like}</Badge>
        </Button>
      </div>
    );
  }
}

export default Like;
