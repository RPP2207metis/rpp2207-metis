require('dotenv').config();
const compression = require('compression');
const express = require ("express");
const axios = require ('axios')
const cors = require("cors");
const multer  = require('multer') // for image uploads in Reviews Module

// CONTROLLERS
const ProductsController = require('./api-helpers/ProductsAPI.js');
const ReviewsController = require('./api-helpers/ReviewsAPI.js');
const QuestionsController = require('./api-helpers/QuestionsAPI.js');
const CartController = require("./api-helpers/CartAPI.js");
const InteractionsController = require('./api-helpers/InteractionsAPI.js');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(cors());
app.use(compression())
app.use(express.urlencoded({ extended: false }));

app.use('/ip/:id', express.static(__dirname + '/../client/dist'));

// ==============================================
//       Home Page Init Reroute
// ==============================================

app.get('/', ProductsController.redirectFromHome);

// ==============================================
//       Questions Routes
// ==============================================

app.get('/getProductQnA', QuestionsController.getProductQnAControl);

app.post('/submitQuestion', QuestionsController.postQuestionForm);

app.post('/submitAnswer', QuestionsController.postAnswerForm);

app.put('/helpfulQuestion', QuestionsController.questionHelpfulness);

app.put('/reportedQuestion', QuestionsController.questionReported);

app.put('/helpfulAnswer', QuestionsController.answerHelpfulness);

app.put('/reportAnswer', QuestionsController.answerReported);

// ==============================================
//       Products Routes
// ==============================================

app.get('/currentProduct', ProductsController.overviewData);

// ==============================================
//       Ratings and Reviews Routes
// ==============================================
app.get('/getProductReviews', ReviewsController.initReviewData);

app.get('/cardStars', ReviewsController.getProductReviewsControl);

app.post('/uploadImg', upload.any(), ReviewsController.postImg);

app.post('/submitReview', ReviewsController.postReviewForm);

app.put('/helpClick', ReviewsController.putHelpClick);

app.put('/reportClick', ReviewsController.putReportClick);

// ==============================================
//       Related Routes
// ==============================================

app.get('/relatedProductData', ProductsController.getRelatedProductCardControl);

app.get('/relatedProductStylesForThumbnail', ProductsController.getProductStylesControl);

// app.get('/getProductRelated', ProductsController.getProductRelatedControl); // go in main get product

// ==============================================
//       Interaction Route (Click Tracking)
// ==============================================

app.post('/clickTrackPost', InteractionsController.postClickTrack);

// ==============================================
//       Cart Routes
// ==============================================
app.get('/cart', CartController.getCart);

app.post('/cart', CartController.postAddToCart);

app.delete('/cart', CartController.deleteCart);


app.listen(3000, () => console.log('Our Server is listening on port 3000...'));
