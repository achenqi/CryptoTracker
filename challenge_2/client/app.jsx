import React from 'react';
import ReactDOM from 'react-dom';
import ReactChart from './components/chart.jsx';
import Chart from "chart.js";

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ctx: undefined
    }
  }

  componentDidMount() {
    this.setState({
      ctx: document.getElementById.bind(document)('myChart').getContext('2d')
    }, () => {
        new Chart(this.state.ctx, {
          // The type of chart we want to create
          type: 'line',

          // The data for our dataset
          data: {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [{
                  label: 'My First dataset',
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: [0, 10, 5, 2, 20, 30, 45]
              }]
          },

          // Configuration options go here
          options: {}
      })
    })
  }
   render() {

    return (
    <div>
      <h1>BTC Price History</h1>
      <ReactChart/>
    </div>
    )
  }
}


ReactDOM.render(<Index/>,document.getElementById('root'))