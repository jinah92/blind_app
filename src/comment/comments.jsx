import React, { Component } from "react";
import axios from "axios";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import CommentItem from "./commentItem";
import $ from "jquery";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    this.ShowComments();
  }
  ShowComments = async () => {
    const commentId = this.props.postId;
    const send_param = { commentId, headers };
    try {
      const result = await axios.post("http://localhost:9090/comment/allcomments", send_param);
      if (result.data.comments) {
        this.setState({
          comments: result.data.comments
        });
      }
    } catch (err) {
      console.log(this.result);
      console.log(err);
    }
  };
  comment_insert = async () => {
    const send_param = {
      headers,
      comment: this.commentE.value,
      postId: this.props.postId,
      memberId: $.cookie("login_id")
    };
    try {
      await axios.post("http://localhost:9090/comment/insert", send_param).then(returnData => {
        if (returnData.data.message) {
          alert("댓글 등록완료");
          this.ShowComments();
        } else {
          alert("댓글 등록실패");
        }
        this.commentE.value = "";
        this.commentE.focus();
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div>
        <InputGroup size="sm" className="mb-3">
          <FormControl
            ref={ref => (this.commentE = ref)}
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
          <Button onClick={this.comment_insert} size="sm" variant="outline-dark">
            댓글 등록
          </Button>
        </InputGroup>
        <CommentItem
          entries={this.state.comments}
          postId={this.props.postId}
          ShowComments={this.ShowComments}
        />
      </div>
    );
  }
}

export default Comments;
