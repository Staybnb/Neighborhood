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
      <div id="transit-checkbox">
        <input type="checkbox" onChange={this.props.toggleTransit} className="checkbox"/> 
        <label htmlFor="ShowTransit">Show Transit</label>
      </div>
    )
  }
}

export default TransitCheckbox;
