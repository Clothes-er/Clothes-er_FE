import { DefaultTheme } from "styled-components";

const colors = {
  purple10: "#F7F5FF",
  purple50: "#F5F3FF",
  purple100: "#F2F0FF",
  purple150: "#E8E4FF",
  purple200: "#D8D1FF",
  purple250: "#A29AFF",
  purple300:"#6952F5",
  purple400:"#8C7CF4",
  purple500:"#796EF2",
  purple600:"#7562EA",
  purple700:"#6952F5",
  purple800:"#5A42EE",

  b100: "#4E4C51",
  b200: "#4B4B4B",
  b400: "#94A3B8",
  b500: "#2E2E44;",
  b700: "#334155;",
  basic: "#CBD5E1",

  gray50: "#FAF9FF",
  gray100: "#F5F5F5",
  gray200: "#EAEAEA",
  gray300: "#DDDDDD",
  gray400: "#D7D7D7",
  gray500: "#C7C7C7",
  gray600: "#C1C1C1",
  gray700: "#C0C0C0",
  gray800: "#A9A9A9",
  gray900: "#8F8F8F",
  gray950: "#626262",
  
  linear_purple: "linear-gradient(180deg, #796EF2 0%, #8677E1 100%)",
  linear_btn:"",
  linear_sub:"",

  red: "#FF4E43",
  green: "#5AB430",
  delete: "#FF6C63",

  white: "#FFFFFF",
  ivory: "#F9F8FF",
  black: "#141414",
} as const;

interface Font {
  weight: number;
  size: number;
}

const FONT = ({ weight, size }: Font): string => {
  return `
    font-family : "Pretendard";
    font-weight : ${weight};
    font-size : ${size}px;
    `;
};

const fonts = {
  //heading
  h1_bold: FONT({
    weight: 700,
    size: 24,
  }),
  h1_semiBold: FONT({
    weight: 600,
    size: 24,
  }),
  h1_medium: FONT({
    weight: 500,
    size: 24,
  }),
  h1_regular: FONT({
    weight: 400,
    size: 24,
  }),

  h2_bold: FONT({
    weight: 700,
    size: 20,
  }),
  h2_semiBold: FONT({
    weight: 600,
    size: 20,
  }),
  h2_medium: FONT({
    weight: 500,
    size: 20,
  }),
  h2_regular: FONT({
    weight: 400,
    size: 20,
  }),

  // body
  b1_bold: FONT({
    weight: 700,
    size: 18,
  }),
  b1_semiBold: FONT({
    weight: 600,
    size: 18,
  }),
  b1_medium: FONT({
    weight: 500,
    size: 18,
  }),
  b1_regular: FONT({
    weight: 400,
    size: 18,
  }),

  b2_bold: FONT({
    weight: 700,
    size: 16,
  }),
  b2_semiBold: FONT({
    weight: 600,
    size: 16,
  }),
  b2_medium: FONT({
    weight: 500,
    size: 16,
  }),
  b2_regular: FONT({
    weight: 400,
    size: 16,
  }),

  b3_bold: FONT({
    weight: 700,
    size: 14,
  }),
  b3_semiBold: FONT({
    weight: 600,
    size: 14,
  }),
  b3_medium: FONT({
    weight: 500,
    size: 14,
  }),
  b3_regular: FONT({
    weight: 400,
    size: 14,
  }),

  // caption
  c1_bold: FONT({
    weight: 700,
    size: 12,
  }),
  c1_semiBold: FONT({
    weight: 600,
    size: 12,
  }),
  c1_medium: FONT({
    weight: 500,
    size: 12,
  }),
  c1_regular: FONT({
    weight: 400,
    size: 12,
  }),
  
  c2_bold: FONT({
    weight: 700,
    size: 11,
  }),
  c2_semiBold: FONT({
    weight: 600,
    size: 11,
  }),
  c2_medium: FONT({
    weight: 500,
    size: 11,
  }),
  c2_regular: FONT({
    weight: 400,
    size: 11,
  }),

  c3_bold: FONT({
    weight: 700,
    size: 10,
  }),
  c3_semiBold: FONT({
    weight: 600,
    size: 10,
  }),
  c3_medium: FONT({
    weight: 500,
    size: 10,
  }),
  c3_regular: FONT({
    weight: 400,
    size: 10,
  }),
};

export type ColorsTypes = typeof colors;
export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
};


const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`

export const MIXINS = {
  // flex
  flexBox: (direction = 'row', align = 'center', justify = 'center') => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,

  // positions
  positionCenter: (type = 'absolute') => {
    if (type === 'absolute' || type === 'fixed')
      return `
        position: ${type};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `
    return
  },
}

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
}