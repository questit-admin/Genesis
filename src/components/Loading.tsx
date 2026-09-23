import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../styles/loading.css"
import doorOpenSfx from "../assets/door-open-107728.mp3";

interface JapaneseGateIntroProps {
  onFinish: () => void;
}

const JapaneseGateIntro: FC<JapaneseGateIntroProps> = ({ onFinish }) => {

  const [scale, setScale] = useState(1);
  const doorAudioRef = useRef<HTMLAudioElement | null>(null);

  // Play gate opening sound in sync with the door animation
  useEffect(() => {
    const audio = new Audio(doorOpenSfx);
    audio.volume = 0.5; // keep volume low
    doorAudioRef.current = audio;

    // Match the animation delay (1.6s) so the sound starts as doors move
    const timer = window.setTimeout(() => {
      audio.play().catch((err) => {
        console.log("Gate SFX blocked by autoplay policy", err);
      });
    }, 1600);

    return () => {
      window.clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const aspect = Math.min(1.3, (window.innerHeight/1000));
      setScale(Math.max(1, aspect*1.6));

      console.log(aspect, window.innerHeight);
      
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <motion.div style={styles.container}>

    <motion.div style={{
    height: "100vh",
    width: "100vw",
    background: "transparent",
    overflow: "hidden"
    }}
        initial={{ scale: 1, y: 0 }}
        animate={{ scale: window.innerWidth < 500 ? 1 : scale, y: window.innerWidth < 500 ? 0 : 60*scale }}
        transition={ {delay: 0.7, duration: 1} }
        >
        {/* LEFT GATE */}
        <motion.div
            style={{ ...styles.gate, ...styles.leftGate }}
            initial={{ x: 0 }}
            animate={{ x: "-105%" }}
            transition={{ delay: 1.6, duration: 1.4, ease: "easeInOut" }}
            onAnimationComplete={onFinish}
        />

        {/* RIGHT GATE */}
        <motion.div
            style={{ ...styles.gate, ...styles.rightGate }}
            initial={{ x: 0 }}
            animate={{ x: "105%" }}
            transition={{ delay: 1.6, duration: 1.4, ease: "easeInOut" }}
        />
    </motion.div>

      {/* Optional Logo */}
      {/* <motion.div
        style={{
            position: "absolute", // <- make it positioned so zIndex works
            inset: 0,             // <- full-viewport
            width: "100vw",
            height: "100vh",
            backgroundImage: `url("${import.meta.env.BASE_URL}bg.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1    // <- put behind gates (give gates a higher zIndex if needed)
        }}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ duration: 3 }}
      >
        
      </motion.div> */}
    </motion.div>
  );
};

export default JapaneseGateIntro;

// ------------------------------
// STYLES
// ------------------------------
const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "fixed",
    inset: 0,
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    zIndex: 99,
  },

  gate: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "50%",
    backgroundSize: "cover"
  },

  // Wood texture optional — remove if you want flat color
  leftGate: {
    left: 0,
    backgroundImage:
      `url('${import.meta.env.BASE_URL}door2.png')`, // Japanese wood texture
    backgroundPosition: "top right"
  },
  rightGate: {
    right: 0,
    backgroundImage:
      `url('${import.meta.env.BASE_URL}door3.png')`,
    backgroundPosition: "top left"
  },

  logo: {
    position: "absolute",
    inset: 0,
    fontSize: "4rem",
    color: "white",
    fontFamily: "serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
};
