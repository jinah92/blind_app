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
      </TableRow>
    );
  }
}

export default SentMsg;
