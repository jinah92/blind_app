import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

class Like extends Component {
    likePost=async()=>{
        const post_id=this.props.post;
        const send_param={post_id, headers};
        const result = await axios.post('http://localhost:9090/post/like', send_param);
        if(result.data.message){
            alert('좋아요 성공');
            this.props.ShowPost();
        }else{
            alert('좋아요 오류');
        }
    }
    render(){
        return(
            <Button size="sm" onClick={this.likePost}>좋아요</Button>
        );
    }
}

export default Like;