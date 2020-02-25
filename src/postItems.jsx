import React, {Component} from 'react';
import axios from "axios";
import {Form, Badge, Col, Button} from 'react-bootstrap';
import {Timeline, TimelineEvent} from 'react-event-timeline';
import Comments from './comments';
import SendMessage from './sendmessage';

axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

class PostItems extends Component {
    render(){
        let posts = this.props.entries.map((post)=>{
            return <Col md={{ span: 6, offset: 3 }}>
                    <Timeline>
                            <TimelineEvent key={post.id} createdAt={post.createdAt} >
                                <Form>
                                    <Form.Group>
                                        <Form.Label as="textarea" rows="2">
                                            <h6>
                                            <Badge variant="light" >작성자: {post.member.nickname}</Badge><SendMessage user={post.member}/>
                                            </h6>
                                           
                                                
                                                {/* <Button variant="info" size="sm" onClick={this.sendMessage}>쪽지보내기</Button> */}
                                             
                                        </Form.Label>
                                        <h5>{post.content} </h5>
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