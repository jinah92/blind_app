import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';

class Contact extends Component {
    render(){
        const ContactStyle ={
            width: "30%",
            position:"fixed",
            top:100,
            right:0,
            bottom:0,
            left:0,
            margin:"auto",
            textAlign: "center"
        }
        return(
            <div>
                <div style={ContactStyle}>
                    <h2>Contact</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" ref={ref=>this.emailE=ref} required/>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control as="textarea" rows="5" cols="15"  placeholder="Enter comment" ref={ref=>this.commentE=ref} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.login}>제출하기</Button>
                </div>
            </div>
        );
    }
}

export default Contact;