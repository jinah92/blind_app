import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Moment from "react-moment";
import { Button, InputGroup, FormControl } from "react-bootstrap";

class SentMsg extends Component {
  state = {
    sent_msg: this.props.entries,
    update_style: "none",
    default_style: ""
  };
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell>{this.props.receiver_nick}</TableCell>
        <TableCell>
          <Moment format="YYYY-MM-DD HH:mm">{this.props.createDate}</Moment>
        </TableCell>
        <TableCell>
          <Moment format="YYYY-MM-DD HH:mm">{this.props.updateDate}</Moment>
        </TableCell>
        <TableCell ref={ref => (this.default = ref)}>{this.props.message}</TableCell>
        {/* <InputGroup className="mb-3" ref={ref=>this.update=ref}>
                    <FormControl as="textarea" aria-label="With textarea" ref={ref=>this.updated_content=ref}>{this.props.content}</FormControl>
                </InputGroup> */}
        {/* <TableCell style={default_style}><Button variant="outline-warning" onClick={this.update_post}>수정</Button></TableCell>
                <TableCell style={update_style}>
                    <Button variant="light" onClick={this.update_cancel}>취소</Button>
                    <Button variant="success" onClick={this.update_post_final}>수정완료</Button>
                </TableCell>
                <TableCell><Button variant="outline-danger" onClick={this.props.superDelete.bind(null, this.props.id)}>삭제</Button></TableCell> */}
      </TableRow>
    );
  }
}

export default SentMsg;
