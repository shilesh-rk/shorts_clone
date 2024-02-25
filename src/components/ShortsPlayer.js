import React, { useRef, useState, useEffect } from "react";
import "./Video.css";

const ShortsPlayer = ({ profile, channel, url, id, mobile }) => {
    const [ isVideoPlaying, setVideoPlaying ] = useState(false);
    const [ like, setLike ] = useState(false);
    const [ progress, setProgress ] = useState({ time: 0, duration: 100 });
    const videoRef = useRef(null);

    const onVideoClick = () => {
        if (isVideoPlaying) {
            videoRef.current.pause();
            setVideoPlaying(false);
        } else {
            videoRef.current.play();
            setVideoPlaying(true);
        }
    };

    useEffect(() => {
        const handleScrollPause = () => {
            if (videoRef.current) {
                videoRef.current.pause();
                setVideoPlaying(false);
            }
        };

        const scrollContainer = document.getElementById("shorts-container");

        if (scrollContainer && videoRef.current) {
            scrollContainer.addEventListener("scroll", handleScrollPause);
        }

        return () => {
            if (scrollContainer && videoRef.current) {
                scrollContainer.removeEventListener("scroll", handleScrollPause);
            }
        };
    }, []);

    const handleLike = () => {
        setLike(!like);
    };

    return (
        <div className="player-container">
            <progress className="progress-bar" max={ progress.duration } value={ progress.time }></progress>
            { mobile && (
                <div className="video-header1">
                    <div className="image">
                        <img className="profile " src={ profile } alt="Profile" />
                        <span className="title"> { channel }💠</span>
                    </div>
                    <i className={ `fa-solid fa-${isVideoPlaying ? "pause" : "play"}` } style={ { fontSize: "25px", margin: "0 9px" } }></i>
                </div>
            ) }
            <video
                onTimeUpdate={ e => setProgress({ time: e.target.currentTime, duration: e.target.duration }) }
                className="video-player"
                onClick={ onVideoClick }
                ref={ videoRef }
                src={ url }
                loop
            />
            { !isVideoPlaying && <i className="fa-regular fa-circle-play fa-fade playButton"></i>
            }            <div className="footer-buttons">
                <i className="fa-solid fa-keyboard"></i>
                <i className={ `fa-solid fa-heart ${like ? "fa-fade" : ""}` } style={ { color: like ? "red" : null, cursor: "pointer" } } onClick={ handleLike }></i>
                <i className="fa-solid fa-share-nodes"></i>
            </div>
        </div>
    );
};

export default ShortsPlayer;
