import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import ReactChart from './components/chart.jsx';
import Chart from 'chart.js';
import axios from 'axios';

function Index() {
  const[labels, setLabels] = useState([]);
  const[data, setData] = useState();
  const[ctx, setCtx] = useState();
  const[init, setInit] = useState(false);

  useEffect(()=> {
    if (init === false) {
      apiRequest();
      setInit(true);
    }
  }, [init])

  function apiRequest() {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(data => {
        setLabels(Object.keys(data.data.bpi));
        setData(data);
        setCtx(document.getElementById('myChart').getContext('2d'))
      })
      .catch((err) => console.log(err))
  }

  useEffect(()=> {
    if (data !== undefined && labels.length > 0 && ctx !== undefined) {
      (() => {
        new Chart(ctx, {
          // The type of chart we want to create
          type: 'line',

          // The data for our dataset
          data: {
              labels:labels,
              datasets: [{
                  label: 'BTC Price',
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: Object.values(data.data.bpi)
              }]
          },

          // Configuration options go here
          options: {}
        })
      })();
    }
  },[data,labels, ctx])

  return (
    <div>
      <h1>BTC Price History</h1>
      <ReactChart/>
    </div>
    )

}

ReactDOM.render(<Index/>,document.getElementById('root'))

/*class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ctx: undefined,
      data: undefined,
      labels: []
    }
    this.apiRequest = this.apiRequest.bind(this);
  }

  apiRequest() {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(data => {
        this.setState({
            data: data, labels: Object.keys(data.data.bpi), ctx: document.getElementById.bind(document)('myChart').getContext('2d')
          }, () => {
            new Chart(this.state.ctx, {
              // The type of chart we want to create
              type: 'line',

              // The data for our dataset
              data: {
                  labels: this.state.labels,
                  datasets: [{
                      label: 'BTC Price',
                      backgroundColor: 'rgb(255, 99, 132)',
                      borderColor: 'rgb(255, 99, 132)',
                      data: Object.values(data.data.bpi)
                  }]
              },

              // Configuration options go here
              options: {}
          })
        },()=> {console.log(this.state)});
      })
      .catch((err) => console.log(err))
  }
  componentDidMount() {
    this.apiRequest();
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


ReactDOM.render(<Index/>,document.getElementById('root'))*/