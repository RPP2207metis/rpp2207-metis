import React, {useState, useEffect} from 'react';
import axios from 'axios';

function useRelatedProductLogic(focusID, setRelated, relatedProductData) {

      var relatedAllData = [];

      (async () => {
        const myAsyncGetRelatedData = async (relatedId) => {
          var relatedObj = {};
          relatedObj.related_id = relatedId;

          // Related Products GET Data
          return axios.get(`/relatedProductData`, { params: { id: relatedId } })
            .then(function (response) {

              relatedObj.related_name = response.data.name;
              relatedObj.related_category = response.data.category;
              relatedObj.related_price = response.data.default_price;
              relatedObj.related_features = response.data.features;

              // Related Products GET Thumbnail
              return axios.get('/relatedProductStylesForThumbnail', { params: { id: relatedId } })
                .then(function (response) {
                  var allStylesArray = response.data.results;
                  for (var i = 0; i < allStylesArray.length; i++) {
                    var currentStyleObj = allStylesArray[i];
                    if (currentStyleObj['default?'] === true) {
                      var photoUrl = currentStyleObj.photos[0].thumbnail_url;
                      relatedObj.related_thumbnail = photoUrl;
                      return relatedObj;
                    }
                    if (i === allStylesArray.length - 1) {
                      var photoUrl = allStylesArray[0].photos[0].thumbnail_url;
                      relatedObj.related_thumbnail = photoUrl;
                      return relatedObj;
                    }
                  }
                })
                .catch(function (error) {
                  console.log('error GET inner RelatedProducts: ', error);
                })
            })
            .catch(function (error) {
              console.log('error GET inner RelatedProducts: ', error);
            })
        }
        const tasks = relatedProductData.map(id => myAsyncGetRelatedData(id))
        try {
          const results = await Promise.all(tasks);
          setRelated(results);
        } catch (err) {
          console.error(err)
        }
      })()
};

export default useRelatedProductLogic;