import React, {Component} from 'react';
import OpenMenu from './openMenu';
import Main from './main';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/title.css";

class Root extends Component {
    constructor(props){
        super(props);
        this.state={
            visible: false
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    handleMouseDown(e){
        this.toggleMenu();

        console.log("clicked");
        e.stopPropagation();
    }
    toggleMenu(){
        this.setState({
            visible: !this.state.visible
        });
    }
    
    render(){
        return(
            <div>
                {/* 메뉴 */}
                <nav>
                    {/* 숨김 메뉴 */}
                    <OpenMenu handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible}/>
                  
                    {{/* 타이틀 */}}
                    <div>
                        <section className="section intro">
                        <div className="container">
                        <h1>Blind</h1>
                        </div>
                        </section>
                    </div>
                </nav>
                <Main />    {{/* 본문 */}}
            </div>
        );
    }
}   

export default Root;