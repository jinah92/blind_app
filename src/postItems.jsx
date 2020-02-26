import React, {Component} from 'react';
import axios from "axios";
import {Form, Badge, Col, Button, ButtonGroup} from 'react-bootstrap';
import {Timeline, TimelineEvent} from 'react-event-timeline';
import Moment from 'react-moment';
import Comments from './comments';
import SendMessage from './sendmessage';
import Like from './like';

axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

class PostItems extends Component {
    state={
        message: ""
    };
    render(){
        const like_btn={
            float: "right"
        }
        const nick_style={
            float: "left"
        }
        let posts = this.props.entries.map((post)=>{
            return <Col md={{ span: 6, offset: 3 }}>
                    <Timeline>
                            <TimelineEvent key={post.id}>
                                <Form>
                                        <Moment format="YYYY-MM-DD HH:mm">{post.createdAt}</Moment>
                                    <Form.Group>
                                        <Form.Label as="textarea" rows="2" style={nick_style}>
                                            <h6><strong>{post.member.nickname}</strong>
                                            <SendMessage user={post.member.nickname} message={this.state.message}/></h6>
                                        </Form.Label>
                                        <ButtonGroup style={like_btn}>
                                            <Like post={post.id} />
                                        </ButtonGroup>
                                        <h6> <br/><br/><br/>{post.content} </h6>
                                    </Form.Group> 
                                </Form>
                                <Form>
                                    <Comments postId={post.id}/>
                                </Form>
                            </TimelineEvent>
                    </Timeline>
                    </Col>
            
                    {/* <div key={post.id} */} /* onClick={this.props.superDelete.bind(null, post.id)}>/*}
                    {/* <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Text>
                                {post.content} {post.id}
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                        <Button onClick={this.props.superDelete.bind(null, post.id)}>삭제하기</Button> 
                        <Comments />
                    </Card>
                    <br />
                    </div> */});
       /*  }); */
        console.log(posts);

        return(
            <ul className="thePost">
                {posts}
            </ul>
        );
    }
}

export default PostItems;