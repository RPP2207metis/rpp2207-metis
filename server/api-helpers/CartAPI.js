let axios = require('axios');

const optionsGet = {
  method: 'GET',
  url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart`,
  headers: { Authorization: process.env.AUTH_SECRET },
};

exports.getCart = (req, res) => {

  // console.log('Cart Pinged Server')
  axios(optionsGet)
    .then((result) => {
      res.status(200).send(result.data)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err)
    })
}

exports.deleteCart = (req, res) => {

  const optionsDelete = {
    method: 'DELETE',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart`,
    headers: { Authorization: process.env.AUTH_SECRET }
  };

  axios(optionsDelete)
    .then(results => {
      // var data = JSON.parse(JSON.stringify(results.data));

      axios(optionsGet)
        .then((result) => {
          res.status(200).send(result.data)
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err)
        })

    })
    .catch(err => {
      console.log('Server error Delete cart:', err);
      res.status(500).send(err);
    })
}

exports.postAddToCart = (req, res) => {

  var cartData = req.body.params;

  var optionsPost = {
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart',
    method: 'POST',
    headers: { Authorization: process.env.AUTH_SECRET },
    "Content-Type": 'application/json',
    data: cartData
  };

  axios(optionsPost)
    .then((results) => {
      // var cartSuccess = JSON.parse(JSON.stringify(results.data));

      axios(optionsGet)
        .then((result) => {
          res.status(200).send(result.data)
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err)
        })

    })
    .catch((error) => {
      console.log('failure in the api add to cart: ', error);
      res.status(500).send(error);
    });
}