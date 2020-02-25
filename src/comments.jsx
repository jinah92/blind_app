import React, {Component} from 'react';
import axios from "axios";
import $ from 'jquery';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import CommentItem from './commentItem';

axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

class Comments extends Component {
    state={
        comments: []
    }
    comment_insert = async()=>{
        const send_param ={
            headers,
            comment: this.commentE.value,
            postId: this.props.postId
        }
        try{
            await axios.post('http://localhost:9090/comment/insert', send_param)
            .then((returnData)=>{
                if(returnData.data.message){
                    alert("댓글 등록완료");
                }else{
                    alert("댓글 등록실패");
                }
                this.commentE.value="";
                this.commentE.focus();
            });
        }catch(err){
            console.log(err);
        }
    }     
    render(){
        return(
            <div>
                <InputGroup size="sm" className="mb-3">
                    <FormControl ref={ref=>this.commentE=ref} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    <Button onClick={this.comment_insert} variant="link">댓글 등록</Button>
                </InputGroup>
                    {/* <CommentItem entries={this.state.comments} postId={this.props} /> */}
            </div>
        );
    }
}

export default Comments;