import React, {useState, useEffect} from 'react';
import axios from 'axios';

function useLocalStorageYourOutfitLogic (setYourOutfitList, setFocusProductId, yourOutfitList) {

  useEffect(() => {
    const savedOutfitState = JSON.parse(localStorage.getItem("yourOutfitState"));

    if (savedOutfitState) {
      if (savedOutfitState.length > 0) {
        setYourOutfitList(savedOutfitState);
      }
    }
    var targetIdInUrl = parseInt(window.location.pathname[4] + window.location.pathname[5] + window.location.pathname[6] + window.location.pathname[7] + window.location.pathname[8]);
    setFocusProductId(targetIdInUrl);
  }, [])

  // Logic for saving the Your Outfit to local storage
  useEffect(() => {
    // console.log('saving to localStorage...', yourOutfitList)
    localStorage.setItem("yourOutfitState", JSON.stringify(yourOutfitList));
  }, [yourOutfitList]);
}

export default useLocalStorageYourOutfitLogic;
