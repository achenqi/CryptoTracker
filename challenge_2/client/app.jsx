import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import ReactChart from './components/chart.jsx';
import Chart from 'chart.js';
import axios from 'axios';
import Search from './components/search.jsx';

function Index() {
  const[labels, setLabels] = useState([]);
  const[data, setData] = useState();
  const[ctx, setCtx] = useState();
  const[localOnly, setLocal] = useState(true);
  const[crypto, useCrypto] = useState('eth');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [chart, setChart] = useState();
  const storage = window.localStorage;

  useEffect(()=> {
      setCtx(document.getElementById('myChart').getContext('2d'));
  }, [])

  useEffect(() => {
    if (localOnly === true) {
      if (storage.getItem(crypto)) {
        const localInfo = JSON.parse(storage.getItem(crypto));
        setLabels(localInfo.labels);
        setData(localInfo.data);
      }
    }
    if (localOnly === false) {
      apiRequest();
    }
  }, [crypto, localOnly]);

  function handleSearch(e) {
    setSearchValue(e.target.value);
  }

  useEffect(()=> {
    if (searchValue !== '') {
      axios.get(`http://localhost:3001/crypto?q=${searchValue}&_limit=5`)
      .then((data) => {
        setSearchResults(data.data);
      })
    } else {
      setSearchResults([]);
    }

  },[searchValue])


  useEffect(()=> {
    if (data !== undefined && labels.length > 0 && ctx !== undefined) {
      renderChart();
      storage.setItem(crypto, JSON.stringify({labels: labels, data: data }));
    }
  },[data,labels, ctx])

  function apiRequest() {
      axios.get(`http://localhost:3000/marketprice/${crypto}`)
      .then(data => {
        console.log(data);
        setLabels(data.data.map((time)=> time.time));
        setData(data);
        //storage.setItem(crypto, JSON.stringify({labels: Object.keys(data.data.bpi), data: data }));
      })
      .catch((err) => window.alert('Not a Valid Crypto :('))
  }

  function onCacheClick() {
    setLocal(!localOnly);
  }

  function onSearchClick(e) {
    chart.clear();
    const value = e.target.getAttribute('data-tag');
    useCrypto(value);
  }

  function renderChart() {
    if (chart !== undefined) {
      chart.destroy();
      setCtx(document.getElementById('myChart').getContext('2d'));
    }
    setChart (new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels:labels,
          datasets: [{
              label: `${crypto} Price`,
              backgroundColor: 'rgb(242, 169, 0)',
              borderColor: 'rgb(242, 169, 0)',
              data: Object.values(data.data.map((price)=> price.close)),
              pointBackgroundColor:'rgb(77, 77, 78)',
              pointBorderColor:'rgb(0, 0, 0)'
          },]
      },

      // Configuration options go here
      options: {
        z: 0,
        scales: {
          yAxes: [{
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                      return '$' + value;
                  }
              }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltip) => {
              return '$' + tooltip.yLabel;
            }
          }
        }
      }
    })
    )
  }


  return (
    <div>
      <div className="logo-container">
      <img src='other-coins.png' className='logo'></img><span className='logo-name'>{(crypto.toLowerCase() === 'btc') ? 'bitcoin':'not bitcoin'}</span>
      </div>
      <a className="cacheButton" onClick = {onCacheClick}>{localOnly ? "Search new info" : "Use Cache"}</a>
      <Search search= {handleSearch} results ={searchResults} click ={onSearchClick}/>
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