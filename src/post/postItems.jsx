import React, { Component } from "react";
import axios from "axios";
import { Form, Badge, Col, Button, ButtonGroup } from "react-bootstrap";
import { Timeline, TimelineEvent } from "react-event-timeline";
import Moment from "react-moment";
import Comments from "../comment/comments";
import SendMessage from "../message/sendmessage";
import Like from "../user/like";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class PostItems extends Component {
  state = {
    message: ""
  };

  render() {
    const like_btn = {
      float: "right"
    };
    const nick_style = {
      float: "left"
    };
    let posts = this.props.entries.map(post => {
      if (!post.member) {
        post.member = [];
        post.member.nickname = "탈퇴한 사용자";
      } else {
        console.log(post.member);
      }
      return (
        <Col md={{ span: 6, offset: 3 }}>
          <Timeline>
            <TimelineEvent key={post.id}>
              <Form>
                <Form.Label as="textarea" rows="2" style={nick_style}>
                  <h6>
                    <strong>{post.member.nickname}</strong>
                    &nbsp;
                    <SendMessage
                      user={post.member.nickname}
                      userId={post.member.id}
                      message={this.state.message}
                    />
                  </h6>
                </Form.Label>
                &nbsp; &nbsp; &nbsp; &nbsp; 생성일:{" "}
                <Moment format="YYYY-MM-DD HH:mm">{post.createdAt}</Moment>&nbsp; &nbsp; 수정일:{" "}
                <Moment format="YYYY-MM-DD HH:mm">{post.updatedAt}</Moment>
                <ButtonGroup style={like_btn}>
                  <Like
                    post={post.id}
                    user={post.member.id}
                    like={post.like}
                    show={this.props.show}
                  />
                </ButtonGroup>
                <hr />
                <h6> {post.content} </h6>
              </Form>
              <Form>
                <Comments postId={post.id} />
              </Form>
            </TimelineEvent>
          </Timeline>
        </Col>
      );
    });
    console.log(posts);

    return <ul className="thePost">{posts}</ul>;
  }
}

export default PostItems;
