import React, { useEffect, useState, useRef} from "react";

function useCarouselSliderLogic() {
  // Main data
  const [relatedProductsData, setRelatedProductsData] = useState([]);
  const [yourOutfitList, setYourOutfitList] = useState([]);
  // First Caroursel
  const [activeSlide, setActiveSlide] = useState(0);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [onceNext, setOnceNext] = useState(false);
  const [oncePrev, setOncePrev] = useState(false);
  const [scrollRelatedProgress, setScrollRelatedProgress] = useState(0);
  const [scrollToggleRelatedProgress, setScrollToggleRelatedProgress] = useState(false);
  var relatedCarourselRef = React.createRef();
  const activeSlideRef = useRef(null);
  const prevSlideRef = useRef(null);
  const nextSlideRef = useRef(null);
  const wrapperRef = useRef(null);
  const firstRenderRef = useRef(true);
  // Second Carousel
  const [activeSlide2, setActiveSlide2] = useState(0);
  const [arrowClicked2, setArrowClicked2] = useState(false);
  const [onceNext2, setOnceNext2] = useState(false);
  const [oncePrev2, setOncePrev2] = useState(false);
  const [scrollYourOutfitProgress, setScrollYourOutfitRelatedProgress] = useState(0);
  const [scrollToggleYourOutfitProgress, setScrollToggleYourOutfitRelatedProgress] = useState(false);
  var yourOutfitCarourselRef = React.createRef();
  const activeSlideRef2 = useRef(null);
  const prevSlideRef2 = useRef(null);
  const nextSlideRef2 = useRef(null);
  const wrapperRef2 = useRef(null);
  const firstRenderRef2 = useRef(true);

  // Related 1
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else if (activeSlideRef.current && arrowClicked && oncePrev) {
      relatedCarourselRef.current.removeEventListener('scroll', handleSideScroll);
      activeSlideRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setOnceNext(false);
      setOncePrev(false);
      return;
    } else if (activeSlideRef.current && nextSlideRef.current && arrowClicked && onceNext) {
      relatedCarourselRef.current.removeEventListener('scroll', handleSideScroll);
      activeSlideRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setOnceNext(false);
      setOncePrev(false);
      return;
    } else if (activeSlideRef.current && !arrowClicked) {
      relatedCarourselRef.current.removeEventListener('scroll', handleSideScroll);
      activeSlideRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [activeSlide]);

  // yourOutfit 2
  useEffect(() => {
    if (firstRenderRef2.current) {
      firstRenderRef2.current = false;
    } else if (activeSlideRef2.current && arrowClicked2 && oncePrev2) {
      yourOutfitCarourselRef.current.removeEventListener('scroll', handleSideScroll);
      activeSlideRef2.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setOnceNext2(false);
      setOncePrev2(false);
      return;
    } else if (activeSlideRef2.current && nextSlideRef2.current && arrowClicked2 && onceNext2) {
      yourOutfitCarourselRef.current.removeEventListener('scroll', handleSideScroll);
      activeSlideRef2.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setOnceNext2(false);
      setOncePrev2(false);
      return;
    } else if (activeSlideRef2.current && !arrowClicked2) {
      yourOutfitCarourselRef.current.removeEventListener('scroll', handleSideScroll);
      activeSlideRef2.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [activeSlide2]);

  // Related 1

  useEffect(() => {
    if (relatedCarourselRef.current) {
      relatedCarourselRef.current.addEventListener('scroll', relatedProductsScrollListener);
      noScrollCheck();
      return () => relatedCarourselRef.current && relatedCarourselRef.current.removeEventListener('scroll', relatedProductsScrollListener);
    }
  });

  // yourOutfit 2
  useEffect(() => {
    if (yourOutfitCarourselRef.current) {
      yourOutfitCarourselRef.current.addEventListener('scroll', yourOutfitScrollListener);
      noScrollCheck2();
      return () => yourOutfitCarourselRef.current && yourOutfitCarourselRef.current.removeEventListener('scroll', yourOutfitScrollListener);
    }
  });

  var relatedProductsScrollListener = () => {
    if (!relatedCarourselRef.current) {
      return;
    }
    const element = relatedCarourselRef.current;
    const windowScroll = element.scrollLeft;
    const totalWidth = element.scrollWidth - element.clientWidth;
    if (windowScroll === 0) {
      return setScrollRelatedProgress(0);
    }
    if (windowScroll > totalWidth) {
      return setScrollRelatedProgress(100);
    }
    setScrollRelatedProgress((windowScroll / totalWidth) * 100);
  }

  var yourOutfitScrollListener = () => {
    if (!yourOutfitCarourselRef.current) {
      return;
    }
    const element = yourOutfitCarourselRef.current;
    const windowScroll = element.scrollLeft;
    const totalWidth = element.scrollWidth - element.clientWidth;
    if (windowScroll === 0) {
      return setScrollYourOutfitRelatedProgress(0);
    }
    if (windowScroll > totalWidth) {
      return setScrollYourOutfitRelatedProgress(100);
    }
    setScrollYourOutfitRelatedProgress((windowScroll / totalWidth) * 100);
  }

  var noScrollCheck = () => {
    if (!relatedCarourselRef.current) {
      return;
    }
    const element = relatedCarourselRef.current;
    const windowScroll = element.scrollLeft;
    const totalWidth = element.scrollWidth - element.clientWidth;

    if (windowScroll < totalWidth) {
      setScrollToggleRelatedProgress(true);
    } else {
      setScrollToggleRelatedProgress(false);
    }
  }
  var noScrollCheck2 = () => {
    if (!yourOutfitCarourselRef.current) {
      return;
    }
    const element = yourOutfitCarourselRef.current;
    const windowScroll = element.scrollLeft;
    const totalWidth = element.scrollWidth - element.clientWidth;

    if (windowScroll < totalWidth) {
      setScrollToggleYourOutfitRelatedProgress(true);
    } else {
      setScrollToggleYourOutfitRelatedProgress(false);
    }
  }

  // Related Carousel
  const moveRight = () => {
    setArrowClicked(true);
    setOnceNext(true);

    if (activeSlide + 1 >= relatedProductsData.length) {
      return setActiveSlide(relatedProductsData.length - 1);
    }
    return setActiveSlide(activeSlide + 1);
  };

  const moveLeft = () => {
    setArrowClicked(true);
    setOncePrev(true);
    if (activeSlide - 1 <= 0) {
      return setActiveSlide(0);
    }
    return setActiveSlide(activeSlide - 1);
  };

  // Your Outfit Carousel
  const moveRight2 = () => {
    setArrowClicked2(true);
    setOnceNext2(true);

    if (activeSlide2 + 1 >= yourOutfitList.length) {
      return setActiveSlide2(yourOutfitList.length - 1);
    }
    return setActiveSlide2(activeSlide2 + 1);
  };

  const moveLeft2 = () => {
    setArrowClicked2(true);
    setOncePrev2(true);
    if (activeSlide2 - 1 <= 0) {
      return setActiveSlide2(0);
    }
    return setActiveSlide2(activeSlide2 - 1);
  };

  // Related Carousel
  const handleSideScroll = (e) => {
    let { width } = relatedCarourselRef.current.getBoundingClientRect();
    let { scrollLeft } = relatedCarourselRef.current;
    setActiveSlide(Math.round(scrollLeft / 274));
  };

  // Your Outfit Carousel
  const handleSideScroll2 = (e) => {
    let { width } = yourOutfitCarourselRef.current.getBoundingClientRect();
    let { scrollLeft } = yourOutfitCarourselRef.current;
    setActiveSlide2(Math.round(scrollLeft / 274));
  };

  return {
    moveRight, moveLeft, handleSideScroll, relatedCarourselRef, activeSlide,
    activeSlideRef, prevSlideRef, nextSlideRef, wrapperRef, scrollRelatedProgress, scrollToggleRelatedProgress,
    scrollYourOutfitProgress, scrollToggleYourOutfitProgress, relatedProductsData, setRelatedProductsData,
    yourOutfitList, setYourOutfitList, moveRight2, moveLeft2, handleSideScroll2, yourOutfitCarourselRef, activeSlide2,
    activeSlideRef2, prevSlideRef2, nextSlideRef2, wrapperRef2, onceNext2, onceNext
  }
};

export default useCarouselSliderLogic;
