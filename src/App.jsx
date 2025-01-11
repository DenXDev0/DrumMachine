import { useState, useEffect } from "react";

const audioClips = {
  Q: {
    id: "Heater-1",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"
  },
  W: {
    id: "Heater-2",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3"
  },
  E: {
    id: "Heater-3",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3"
  },
  A: {
    id: "Heater-4_1",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"
  },
  S: {
    id: "Clap",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3"
  },
  D: {
    id: "Open-HH",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"
  },
  Z: {
    id: "Kick-n'-Hat",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3"
  },
  X: {
    id: "Kick",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3"
  },
  C: {
    id: "Closed-HH",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"
  }
};

const App = () => {
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(0.67);
  const [powerOn, setPowerOn] = useState(true);

  const playSound = (key) => {
    if (powerOn) {
      const audio = document.getElementById(key);
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();
      setDisplay(audioClips[key].id);
    }
  };

  const handleKeyPress = (event) => {
    if (powerOn && audioClips[event.key.toUpperCase()]) {
      playSound(event.key.toUpperCase());
    }
  };

  const togglePower = () => {
    setPowerOn((prev) => !prev);
    setDisplay("");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [powerOn]);

  return (
    <div id="drum-machine">
      <div className="display-container">
        <div id="display">
          <div className="dis1">
            <div className="tit">DRUM MACHINE</div>
            <div className="vol">VOLUME : {Math.round(volume * 100)}%</div>
          </div>
          <div className="dis2">{powerOn ? (display || "Play a sound!") : ""}</div>
        </div>
        <button className="power-button" onClick={togglePower}>
          {powerOn ? "ON" : "OFF"}
        </button>
      </div>

      <div className="volume-control">
        <input
          type="range"
          id="volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
      <div className="drum-pad-container">
        {Object.keys(audioClips).map((key) => (
          <div
            key={key}
            className="drum-pad"
            id={audioClips[key].id}
            onClick={() => playSound(key)}
          >
            {key}
            <audio className="clip" id={key} src={audioClips[key].src}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
