// Quick Link to this API Doc: https://learn-2.galvanize.com/cohorts/3414/blocks/94/content_files/Front%20End%20Capstone/project-atelier/reviews.md
let axios = require('axios');
const cloudinary = require('../cloudinary');
const uploader = require('../multer');

exports.initReviewData = (req, res) => {
  var incomingParamProductId = req.query.id;

  const options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${incomingParamProductId}`,
    headers: { Authorization: process.env.AUTH_SECRET },
  };

  const options2 = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${incomingParamProductId}`,
    headers: { Authorization: process.env.AUTH_SECRET }
  };

  var combined = [];

  // Second Call for Meta Data of Reviews
  axios(options)
    .then((result) => {
      combined.push(result.data);

    axios(options2)
      .then((result) => {
        combined.push(result.data);
        res.status(200).send(combined);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
      })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err)
    })
};

exports.getProductReviewsControl = (req, res) => {

  var incomingParamProductId = req.query.id;

  const options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${incomingParamProductId}`,
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
};

exports.postReviewForm = (req, res) => {

  var incomingReview = req.body;
  // console.log('this is the incoming review: ', incomingReview);

  const options = {
    method: 'POST',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews`,
    headers: { Authorization: process.env.AUTH_SECRET },
    "Content-Type": 'application/json',
    data: incomingReview
  };
  axios(options)
  .then((results) => {
    var created = JSON.parse(JSON.stringify(results.data));
    res.status(201).send(created);
  })
  .catch((error) => {
    console.log('failure in the api server: ', error);
    res.status(500).send(error);
  });
}


exports.postImg = (req, res) => {
  var imgFile = req.files[0].path;

  cloudinary.v2.uploader.upload(imgFile)
  .then((results) => {
    var imgURL = results.url;
    console.log('success POST img url: ', imgURL);
    res.status(201).send(JSON.parse(JSON.stringify(imgURL)));
  })
  .catch((error) => {
    console.log('error getting img url', error);
    res.status(500).send(error);
  });
}


exports.putHelpClick = (req, res) => {

  const review_id = req.body.review_id;
  console.log('review id in server helpClick: ', review_id);

  const options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${review_id}/helpful`,
    headers: { Authorization: process.env.AUTH_SECRET },
    // data: review_id
  };
  axios(options)
  .then((results) => {
    var data = JSON.parse(JSON.stringify(results.data));
    res.status(204).send(data);
  })
  .catch((error) => {
    console.log('helpful server error: ', error);
    res.status(500).send(error);
  });

};

exports.putReportClick = (req, res) => {

  const review_id = req.body.review_id;
  console.log('review id in server reportClick: ', review_id);

  const options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${review_id}/report`,
    headers: { Authorization: process.env.AUTH_SECRET },
    // data: review_id
  };
  axios(options)
  .then((results) => {
    var data = JSON.parse(JSON.stringify(results.data));
    res.status(204).send(data);
  })
  .catch((error) => {
    console.log('report server error: ', error);
    res.status(500).send(error);
  });

};