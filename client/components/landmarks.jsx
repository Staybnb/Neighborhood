import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

class Landmarks extends React.Component {
  constructor(props) {
    super(props);
  }

  distanceFormatter(cell) {
    return (
      <span>
        {Math.round(cell * 10) / 10} mi
      </span>
    );
  }
  
  render() {
    const columns = [
      {
        dataField: 'landmarkName',
        text: 'Landmark'
      } , {
        dataField: 'distance',
        text: 'Distance from Staybnb',
        formatter: this.distanceFormatter
      }
    ]

    return (
      <div id="landmarks-section">
        <h3>Nearby landmarks</h3>
        <div className="landmarks-table" style={{"width": "700px"}}>
          <BootstrapTable 
            keyField='landmarkName' 
            bordered={false}
            striped
            hover 
            data={this.props.nearbyLandmarks} 
            columns={columns}
          />
        </div>
      </div>
    )
  }
}

export default Landmarks;
