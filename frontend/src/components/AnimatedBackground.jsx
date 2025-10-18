import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function AnimatedBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -2 },
        background: { color: "#fdfdfd" },
        particles: {
          number: { value: 40 },
          color: { value: ["#f7accf", "#b6e0fe", "#fbd4e4"] },
          shape: { type: "circle" },
          opacity: { value: 0.3 },
          size: { value: { min: 10, max: 20 } },
          move: { enable: true, speed: 1.5, direction: "none", outModes: "out" },
        },
      }}
    />
  );
}
