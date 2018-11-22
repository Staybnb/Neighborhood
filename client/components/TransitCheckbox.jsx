import React from 'react';

class TransitCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.shouldShowTransit
    }
  }

  render() {
    return (
      <React.Fragment>
        <input type="checkbox" onChange={this.props.toggleTransit} id="transitCheckbox"/> 
        <label htmlFor="ShowTransit">Show Transit</label>
      </React.Fragment>
    )
  }
}

export default TransitCheckbox;
