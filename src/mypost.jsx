import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';
import MyPostItems from './mypostItems';
import {Col} from 'react-bootstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

class MyPost extends Component {
    constructor(props){
        super(props);
        this.state={
            myposts: [],
            update_form: "none"
        };
    }
    componentDidMount(){
        this.ShowPosts();
    }
    ShowPosts=async ()=>{
        const user_id=$.cookie("login_id");
        console.log(user_id);
        const send_param={user_id, headers};
        try{
            const result = await axios.post('http://localhost:9090/post/allpost_mine', send_param);
            if(result.data.myposts){
                this.setState({
                    myposts: result.data.myposts
                });
            }
            console.log(result.data);
        }catch(err){
            console.log(err);
        }
    }
    update_post=(post_id)=>{
        this.setState({
            update_form: "inline-block"
        });
        /* const user_id=$.cookie("login_id");
        const send_param={post_id, user_id};
        console.log(send_param);
        $.post('http://localhost:9090/post/update', send_param, (returnData)=>{
            if(returnData.result){
                alert("Post 수정완료");
            }else{
                alert("수정 오류");
            }
        }); */
    }
    delete_post=(post_id)=>{
        const user_id=$.cookie("login_id");
        const send_param={post_id, user_id};
        console.log(send_param);
        $.post('http://localhost:9090/post/delete', send_param, (returnData)=>{
            if(returnData.result){
                alert("Post 삭제완료");
                const filteredItems = this.state.myposts.filter((item)=>{
                    return item.key !== post_id
                });
                this.setState({
                    myposts: filteredItems
                });
            }else{
                alert("삭제 오류");
            }
        });
    }
/*     checkMyPost=()=>{
        if(this.state.myposts===[]){
            const result = '등록된 게시글이 없습니다.';
        }else{
            const result = this.state.myposts.map((post) => {
                return <MyPostItems key={post.id} id={post.id} nickname={post.member.nickname} createDate={post.createdAt} UpdateDate={post.updatedAt} content={post.content} />
                });
        }
        return {result};
    } */
   
    render(){
        return(
            <div>
                <Table>
                <TableHead>
                <TableRow>
                <TableCell>게시번호</TableCell>
                <TableCell>작성자</TableCell>
                <TableCell>생성일</TableCell>
                <TableCell>수정일</TableCell>
                <TableCell>내용</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.myposts.map((post) => {
                    return <MyPostItems key={post.id} id={post.id} nickname={post.member.nickname} createDate={post.createdAt} updateDate={post.updatedAt} content={post.content} 
                            superDelete={this.delete_post} superUpdate={this.update_post} entries={this.state.myposts}/>
                    })}
                    {this.checkMyPost}
                </TableBody>
                </Table>

            </div>
        );
    }
}

export default MyPost;