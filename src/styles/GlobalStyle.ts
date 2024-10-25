import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`  

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  width: 100%;
  height: 100%;
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0px 0px 64px 0px rgba(30, 41, 59, 0.1);

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
}

body {
  width: 100%;
  height: 100%;
  max-width: 480px;
  font-family: "Pretendard", sans-serif;
  white-space: pre-line;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor:pointer;
  border: none;
  background: transparent;
}

@font-face {
    font-family: "Pretendard";
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  }
`;

export default GlobalStyles;