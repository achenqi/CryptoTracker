import React from 'react';

class ReactChart extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (<canvas id='myChart'>CHART GOES HERE</canvas>)
  }
}

export default ReactChart;