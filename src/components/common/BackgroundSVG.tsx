import React from "react";

interface BackgroundSVGProps {
  color: string;
}

const BackgroundSVG: React.FC<BackgroundSVGProps> = ({ color }) => (
  <svg
    width="39"
    height="30"
    viewBox="0 0 39 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.0052 1.38939C23.5213 -1.37317 33.1231 4.33376 37.8922 15.1489C42.2009 24.6143 21.4535 31.1133 10.3235 28.9814C-0.806502 26.8496 -0.773192 17.4542 4.01153 13.9316C8.79626 10.409 10.4891 4.15195 17.0052 1.38939Z"
      fill={color}
      fillOpacity="0.1"
    />
  </svg>
);

export default BackgroundSVG;
