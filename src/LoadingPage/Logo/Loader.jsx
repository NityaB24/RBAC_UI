import React, { useEffect } from 'react';
import gsap from 'gsap';
import './loader_styles.css';
import Nitya from './Nitya'; // Import Nitya component

function Loader() {
  useEffect(() => {
    const svg = document.getElementById('curtain');
    const tl = gsap.timeline();
    const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
    const flat = 'M0 2S175 1 500 1s500 1 500 1V0H0Z';

    // SVG Animation for Loader
    tl.to(svg, {
      duration: 0.8,
      attr: { d: curve },
      ease: 'power2.easeIn',
    })
    .to(svg, {
      duration: 0.8,
      attr: { d: flat },
      ease: 'power2.easeOut',
    })

    // Loader Exit Animation
    .to('.loader-wrap', {
      y: -1500,
      duration: 0.8,
    }, "+=0.8")
    .to('.loader-wrap', {
      zIndex: -1,
      display: 'none',
    })

  }, []);

  return (
    <div>
      {/* Loader Section */}
      <div className="loader-wrap">
        <svg id='drawing' viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path id="curtain" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" fill="#262b34"></path>
        </svg>
      </div>

      <div className="nitya-animation" >
        <Nitya />
      </div>
    </div>
  );
}

export default Loader;