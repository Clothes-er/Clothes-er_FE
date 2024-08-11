import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value}cm`;
}

interface RangeSliderProps {
  minHeight: number;
  maxHeight: number;
  onChange: (newValue: number[]) => void;
}

export default function RangeSlider({
  minHeight,
  maxHeight,
  onChange,
}: RangeSliderProps) {
  const [value, setValue] = React.useState<number[]>([minHeight, maxHeight]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    const updatedValue = newValue as number[];
    setValue(updatedValue);
    onChange(updatedValue);
  };

  return (
    <Box>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={130}
        max={200}
        sx={{
          "& .MuiSlider-thumb": {
            color: "#796EF2",
          },
          "& .MuiSlider-track": {
            color: "#796EF2",
          },
          "& .MuiSlider-rail": {
            color: "#D7D7D7",
          },
          "& .MuiSlider-active": {
            color: "#D8D1FF",
          },
        }}
      />
    </Box>
  );
}
