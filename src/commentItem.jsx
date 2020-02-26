import React, {Component} from 'react';
import {Badge} from 'react-bootstrap';
import Moment from 'react-moment';
import $ from 'jquery';

class CommentItem extends Component {
    deleteComment=(commentId)=>{
        const send_param={commentId};
        console.log(send_param);
        $.post('http://localhost:9090/comment/delete', send_param, (returnData)=>{
            if(returnData.message){
                alert('댓글 삭제 성공');
                this.props.ShowComments();
            }else{
                alert('댓글 삭제 실패');
            }
        });
    }
    render(){
        const comments = this.props.entries.map((comment)=>{
            let commentId=comment.id;
            return <div key={comment.id}>
                       {comment.comment} <Moment format="YYYY-MM-DD HH:mm">{comment.createdAt}</Moment> <Badge variant="danger" size="sm" onClick={()=>{this.deleteComment(commentId)}}>댓글 삭제</Badge>
                    </div>
        });
        return(
            <ol>
                {comments}
            </ol>
        );  
    }
}

export default CommentItem;