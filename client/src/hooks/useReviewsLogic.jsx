import React, {useState, useEffect} from 'react';
import axios from 'axios';

function useReviewsLogic(focusProductId, setReviewList, setRating, setReviewMeta) {
  // GET Reviews of Main Product Data

  axios.get('/getProductReviews', { params: { id: focusProductId } })
  .then(function (response) {
    // console.log("🚀 ~ file: App.jsx:190 ~ response", response)
    var reviews = response.data[0].results;
    setReviewList(reviews);
    var average = getAverageRating(reviews);
    setRating(average);

    // Combined Meta Data
    var meta = response.data[1];
    setReviewMeta(meta);
  })
  .catch(function (error) {
    console.log('error GET Reviews Data: ', error);
  });
};

// Helper Function
const getAverageRating = (reviewList) => {
  var total = 0;
  reviewList.forEach((review) => {
    total += review.rating;
  });
  var average = total / reviewList.length;
  var rounded = Math.round(average * 10) / 10;
  return rounded;
}

export { getAverageRating };
export default useReviewsLogic;