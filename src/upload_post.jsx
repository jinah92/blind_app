import React, {Component} from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from "axios";
import $ from 'jquery';

axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

class UploadPost extends Component {
    upload_post = async()=>{
        if($.cookie("login_id")){
            const send_param ={
                headers,
                content: this.postContent.value,
                memberId: $.cookie("login_id")
            }
            try{
                await axios.post('http://localhost:9090/post/upload', send_param)
                .then((returnData)=>{
                    if(returnData.data.message){
                        alert("Post 등록완료");
                    }else{
                        alert("Post 등록실패");
                    }
                    this.postContent.value="";
                    this.postContent.focus();
                });
            }catch(err){
                console.log(err);
            }
        }else{
            alert('로그인이 필요합니다');
        }        
    }     
    render(){
        const upload_form={
            width: "50%",
            height: "80%",
            position:"fixed",
            top:100,
            right:0,
            bottom:0,
            left:0,
            margin:"auto",
            textAlign: "center"
        }
        return(
            <div className="comment_form" style={upload_form}>
                <h2>여러분의 소식을 들려주세요</h2><hr />
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows="5" cols="10" placeholder="포스트 내용" ref={ref=>this.postContent=ref}/>
                    </Form.Group>
                <Button onClick={this.upload_post}>글 등록</Button>
                </Form>
            </div>
        );
    }
}

export default UploadPost;