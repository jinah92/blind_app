/* import React, {Component} from 'react';
import "./css/menu.css";
import Button from 'react-bootstrap/Button';
import {Route, NavLink, HashRouter} from 'react-dom';


class openMenu extends Component {
    openNav=()=>{
        document.getElementById('mysidenav').style.width = '250px';
    }
    closeNav=()=>{
        document.getElementById('mysidenav').style.width = '0';
    }
    render(){
        return(
            <div>
                <div id="mysidenav" className="sidenav">
                    <ul>
                        <Button className="closebtn" variant="dark" onClick={this.closeNav}>Close</Button>
                        <li>잔소리하기</li>
                        <li>토픽</li>
                        <li>Contact</li>
                    </ul>
                <div className="body">
                    </div>
                </div>
                <span className="openmenu" onClick={this.openNav}>
                    <Button variant="outline-danger">Open</Button>
                </span>
            </div>
        );
    }
}

export default openMenu; */