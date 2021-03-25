const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const {cmc, cc} = require('./cmcapi.js');
app.use(express.static('public'));

app.get('/', (req, res) => {

})

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/price/:crypto', (req, res) => {
  const crypto = req.params.crypto;
  axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
  {
    headers: {
      'X-CMC_PRO_API_KEY': cmc
    },
    params: {
      id: 1,
    }
  }
  )
  .then((data) => {
    const price = Math.ceil(data.data.data['1'].quote['USD']['price']);
    res.send({price: price})
  })
  .catch((err) => {
    console.log(err);
    res.send(err).status(404);
  })
})

app.get('/marketprice/:crypto', (req,res) => {
  axios.get('https://min-api.cryptocompare.com/data/v2/histoday',
  {
    params: {
      fsym: req.params.crypto,
      tsym: 'USD',
      limit: 30
    }
  }
  )
  .then((data) => {
    try {
      var convertedData = data.data.Data.Data.map(data => {
        data.time = timeConverter(data.time);
        return data;
      });
      console.log('success')
      res.send(convertedData);

    } catch (err) {
      res.send('err').status(400);
    }
  })
  .catch((err) => {
    console.log(err);
    res.send.status(500)(err);
  })
})
// curl -H "X-CMC_PRO_API_KEY: 11a9aa2e-fc7f-4d61-b6c5-ea8c77d556f5" -H "Accept: application/json" -d "start=1&limit=5000&convert=USD" -G https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest