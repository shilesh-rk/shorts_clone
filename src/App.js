import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import { VidData } from './components/data';
import ShortsPlayer from './components/ShortsPlayer';

export default function App() {
  const [ width, setWidth ] = useState(window.innerWidth);
  const [ arr, setArr ] = useState({ right: false, left: false });
  const breakpoint = 768;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleArrowAnimation = (direction) => {
    setArr({ right: direction === 'right', left: direction === 'left' });
    setTimeout(() => {
      setArr({ right: false, left: false });
    }, 300);
  };

  return (
    <div className='App'>
      <center>
        { width < breakpoint ? (
          <div className="shorts-container" id="shorts-container">
            { VidData.map((video, index) => (
              <ShortsPlayer
                key={ index }
                id={ video.id }
                profile={ video.profile }
                channel={ video.channel }
                url={ video.url }
                mobile={ true }
              />
            )) }
          </div>
        ) : (
          <div className="carousel-desktop">
            <Carousel
              showStatus={ true }
              emulateTouch={ true }
              dynamicHeight={ false }
              useKeyboardArrows={ true }
              infiniteLoop
              renderArrowPrev={ (clickHandler) => (
                <div className='leftArrow' onClick={ () => handleArrowAnimation('left') }>
                  <p onClick={ clickHandler }><i className={ `fa-solid fa-square-caret-left ${arr.left && "fa-beat-fade"}` }></i></p>
                </div>
              ) }
              renderArrowNext={ (clickHandler) => (
                <div className='rightArrow' onClick={ () => handleArrowAnimation('right') }>
                  <p onClick={ clickHandler }><i className={ `fa-solid fa-square-caret-right ${arr.right && "fa-beat-fade"}` }></i></p>
                </div>
              ) }
            >
              { VidData.map((video, index) => (
                <div key={ index }>
                  <div className="video-header">
                    <div className="image"><img className="profile" src={ video.profile } alt="Profile" height="20px" width="20px" /><span className="title">{ video.channel }</span></div>
                    <i className={ `fa-solid fa-${video.isPlaying ? "pause" : "play"}` } style={ { fontSize: "25px", margin: "0 -1rem" } }></i>
                  </div>
                  <ShortsPlayer
                    id={ video.id }
                    profile={ video.profile }
                    channel={ video.channel }
                    url={ video.url }
                  />
                </div>
              )) }
            </Carousel>
          </div>
        ) }
      </center>
    </div>
  );
}
