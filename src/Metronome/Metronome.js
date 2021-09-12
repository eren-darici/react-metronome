import React, { useState } from "react";
import "./Metronome.css" 

// Add audio file
import click2 from './Audio/click2.wav';
// import a from './Audio/a.wav';

const Metronome = (props) => {
    // Create audio object
    const clickSound= new Audio(click2);
    // const memeSound = new Audio(a);

    // States for features
    const [bpm, setBPM] = useState(100);
    const [timer, setTimer] = useState(10);
    const [isPlaying, setIsPlaying] = useState(false);
    const [count, setCount] = useState(0);
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);

    // Audio handler
    const playClick = () => { 
        clickSound.play();
        // memeSound.play();
        setCount((count + 1) % beatsPerMeasure);
    }


    // Arrow functions for handlers
    // // on BPM Changes
    const handleBPMChange = (e) => {
        if (isPlaying) { 
            clearInterval(timer);
            setTimer(setInterval(playClick, (60 / bpm) * 1000));    

            setCount(0);
            setBPM(e.target.value);
        } else {
            setBPM(e.target.value);
        }
    };
    // // on Start and Stop
    const startStop = () => {
        setIsPlaying(!isPlaying);

        if (isPlaying) {
            clearInterval(timer);
        } else {
            setTimer(setInterval(
                playClick,
                (60 / bpm) * 1000
            ));
            setCount(0);
            playClick();
        }
    }

    // minus plus functions
    const minusBPM = () => setBPM(bpm-1);
    const plusBPM = () => setBPM(bpm+1);

    

    return (
        <div className="metronome">
            <div className="bpm-slider">
                <a><large>{bpm}</large> BPM</a>
                <button onClick={startStop}>{isPlaying ? 'Stop': 'Start'}</button>
                <div className="bpm-buttons">
                    <a className="plus" onClick={plusBPM}>+</a>
                    <a className="minus" onClick={minusBPM}>-</a>
                </div>
                <input 
                type="range" 
                min="60" 
                max="240" 
                value={bpm}
                className="main-slider"
                onChange={handleBPMChange}/>
            </div>

        </div>
    );
}
 
export default Metronome;