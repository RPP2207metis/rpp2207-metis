const axios = require('axios')

exports.redirectFromHome = (req, res) => {
  res.redirect('/ip/71704')
}

let SingleProductGet = async (id) => {
  const options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`,
    headers: { Authorization: process.env.AUTH_SECRET },
  };
  try {
    let current = await axios(options);
    return current.data;
  }
  catch (err) {
    console.log('err in single product get', err);
  }
}

let Styles = async (id) => {
  const options2 = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`,
    headers: { Authorization: process.env.AUTH_SECRET },
  };
  try {
    let styles = await axios(options2);
    return styles.data;
  }
  catch (err) {
    console.log('err in styles get', err);
  }
}

let Similar = async (id) => {
  const options3 = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/related`,
    headers: { Authorization: process.env.AUTH_SECRET },
  };
  try {
    let similar = await axios(options3);
    return similar.data;
  }
  catch (err) {
    console.log('err in similar products get', err);
  }
}
exports.overviewData = async (req, res) => {

  var incomingParamProductId = req.query.id;
  var currentProductCardData = {};

  try {
    let productDetails = {};

    let selectedProduct = await SingleProductGet(incomingParamProductId);
    let selectedStyles = await Styles(incomingParamProductId);
    let selectedRelated = await Similar(incomingParamProductId);

    currentProductCardData['current_name'] = selectedProduct.name;
    currentProductCardData.current_category = selectedProduct.category;
    currentProductCardData.current_price = selectedProduct.default_price;
    currentProductCardData.current_id = selectedProduct.id;
    currentProductCardData.current_features = selectedProduct.features;

    productDetails.product = selectedProduct;
    productDetails.styles = selectedStyles;
    productDetails.related = selectedRelated;
    productDetails.current = currentProductCardData;

    res.send(productDetails);
    // return productDetails;
  }
  catch (err) {
    console.log('err in current product get details', err);
  }
}

exports.getProductStylesControl = (req, res) => {

  var incomingParamProductId = req.query.id;

  const options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${incomingParamProductId}/styles`,
    headers: { Authorization: process.env.AUTH_SECRET },
  };
  axios(options)
    .then((result) => {
      res.status(200).send(result.data)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err)
    })
}

exports.getRelatedProductCardControl = (req, res) => {

  var incomingParamProductId = req.query.id;

  const options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${incomingParamProductId}`,
    headers: { Authorization: process.env.AUTH_SECRET },
  };

  axios(options)
    .then((result) => {
      res.status(200).send(result.data)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err)
    })
}