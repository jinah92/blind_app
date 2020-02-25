import React, {Component} from 'react';
import "./css/main.css";
import Contact from "./contact";

class Main extends Component {
    render(){
        return(
            <div className="container">
                <Contact />
            </div>
        );
    }    
}  

export default Main;