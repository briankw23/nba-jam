import React from 'react';
import { Button, Modal, Media } from "react-bootstrap";

import './PlayerOne.css';

class PlayerOne extends React.Component {
  render () {
    const { details } = this.props;
    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          key={details.id}
          onClick={this.handleShow}
        >
          <Media>
            <Media.Left>
              <img width={64} height={64} src={details.image} alt="thumbnail" />
            </Media.Left>
            <Media.Body>
              <Media.Heading>{details.name}</Media.Heading>
            </Media.Body>
          </Media>
        </Button>
      </div>
    );
  }
};

export default PlayerOne;
