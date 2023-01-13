// Quick Link to this API Doc: https://learn-2.galvanize.com/cohorts/3414/blocks/94/content_files/Front%20End%20Capstone/project-atelier/qa.md
const axios = require('axios');



exports.getProductQnAControl = (req, res) => {

  var incomingParamProductId = req.query.id;

  const options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${incomingParamProductId}`,
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

exports.postQuestionForm = (req, res) => {
  var incomingQuestion = req.body;
  const options = {
    method: 'POST',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions`,
    headers: {Authorization: process.env.AUTH_SECRET},
    "Content-Type": 'application/json',
    data: incomingQuestion
  }
  axios(options)
  .then(results => {
    console.log('Success: ',results.data);
    var created = JSON.parse(JSON.stringify(results.data));
    res.status(201).send(created);
  })
  .catch(err => {
    console.log('failure in the  Question api server: ', err);
    res.status(500).send(err)
  })
}

exports.postAnswerForm = (req, res) => {
  var incomingAnswer = req.body;
  var questionId = incomingAnswer.questionId;
  delete incomingAnswer.questionId;
  const options = {
    method: 'POST',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/answers`,
    headers: {Authorization: process.env.AUTH_SECRET},
    "Content-Type": 'application/json',
    data: incomingAnswer
  }
  axios(options)
  .then(results => {
    console.log('Success: ', results.data);
    var created = JSON.parse(JSON.stringify(results.data));
    res.status(201).send(created)
  })
  .catch(err => {
    console.log('failure in the Answer api server: ', err);
    res.status(500).send(err)
  })
}

exports.questionHelpfulness = (req, res) => {
  var questionId = req.body.question_id;

  const options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/helpful`,
    headers: {Authorization: process.env.AUTH_SECRET},
  };

  axios(options)
  .then(results => {
    var data = JSON.parse(JSON.stringify(results.data));
    res.status(204).send(data);
  })
  .catch(err => {
    console.log('Error recording helpfulness:', err);
    res.status(500).send(err);
  });
}

exports.questionReported = (req, res) => {
  var questionId = req.body.question_id;

  const options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/report`,
    headers: {Authorization: process.env.AUTH_SECRET}
  };

  axios(options)
  .then(results => {
    var data = JSON.parse(JSON.stringify(results.data));
    res.status(204).send(data);
  })
  .catch(err => {
    console.log('Error recording reported:', err);
    res.status(500).send(err);
  })
}

exports.answerHelpfulness = (req, res) => {
  var answerId = req.body.answer_id;

  const options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/helpful`,
    headers: {Authorization: process.env.AUTH_SECRET}
  };

  axios(options)
  .then(results => {
    var data = JSON.parse(JSON.stringify(results.data));
    res.status(204).send(data);
  })
  .catch(err => {
    console.log('Error recording helpfulness:', err);
    res.status(500).send(err)
  })
}

exports.answerReported = (req,res) => {
  var answerId = req.body.answer_id;

  const options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/report`,
    headers: {Authorization: process.env.AUTH_SECRET}
  };

  axios(options)
  .then(results => {
    var data = JSON.parse(JSON.stringify(results.data));
    res.status(204).send(data);
  })
  .catch(err => {
    console.log('Server error reporting answer:', err);
    res.status(500).send(err);
  })
}