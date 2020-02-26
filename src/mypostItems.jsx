import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Button, InputGroup, FormControl} from 'react-bootstrap';

class MyPostItems extends Component {
    state={
        myposts: this.props.entries,
        update_style: "none",
        default_style: ""
    }
    update_post_final= async ()=>{
        const post_id=this.props.id;
        const content=this.updated_content.value;
        const send_param = {post_id, content};
        try{
            const result=await axios.post('http://localhost:9090/post/update', send_param);
            if(result.data.result){
                alert('수정 완료');
                this.setState({
                    myposts: result.data.result,
                    update_style: "none",
                    default_style: ""
                });
                this.props.showPosts();
            }else{
                alert('수정 오류');
            }
        }catch(err){
            console.log(err);
            alert('시스템 오류');
        }        
    }
    update_post=()=>{
        this.setState({
            update_style: "",
            default_style: "none"
        });
    }
    update_cancel=()=>{
        this.setState({
            update_style: "none",
            default_style: ""
        });
    }
    render(){
        const update_style={
            display: this.state.update_style
        }
        const default_style={
            display: this.state.default_style
        }
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.nickname}</TableCell>
                <TableCell>{this.props.createDate}</TableCell>
                <TableCell>{this.props.updateDate}</TableCell>
                <TableCell ref={ref=>this.default=ref} style={default_style}>{this.props.content}</TableCell>
                <InputGroup className="mb-3" ref={ref=>this.update=ref} style={update_style}>
                    <FormControl as="textarea" aria-label="With textarea" ref={ref=>this.updated_content=ref}>{this.props.content}</FormControl>
                </InputGroup>
                <TableCell style={default_style}><Button variant="outline-warning" onClick={this.update_post}>수정</Button></TableCell>
                <TableCell style={update_style}>
                    <Button variant="light" onClick={this.update_cancel}>취소</Button>
                    <Button variant="success" onClick={this.update_post_final}>수정완료</Button>
                </TableCell>
                <TableCell><Button variant="outline-danger" onClick={this.props.superDelete.bind(null, this.props.id)}>삭제</Button></TableCell>
            </TableRow>
        );
    }
}

export default MyPostItems;