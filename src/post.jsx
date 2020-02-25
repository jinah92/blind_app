import React, {Component} from 'react';
import axios from "axios";
import $ from 'jquery';
import PostItems from './postItems';
import {Button, Form} from 'react-bootstrap';

axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

class Post extends Component {
    constructor(props){
        super(props);
        this.state={
            posts: []
        };
    }
    componentDidMount(){
        this.ShowPosts();
    }
    ShowPosts=async ()=>{
        try{
            const result = await axios.post('http://localhost:9090/post/allpost', headers);
            if(result.data.posts){
                this.setState({
                    posts: result.data.posts
                });
            }
            console.log(result);
        }catch(err){
            console.log(err);
        }
    }
    
    render(){
        const PostStyle={
            width: "300"
        }
        return(
            <div>
                <div style={PostStyle}>
                    <PostItems entries={this.state.posts} />   
                </div>
            </div>
        );
    }
}

export default Post;