import React, {Component} from 'react';

class Username extends Component {
    render(){
        return(
            <div>
                접속유저: {this.props.nickname}
            </div>
        );
    }
}

export const MemoizedNickname = React.memo(Username);