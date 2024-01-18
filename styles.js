import { createGlobalStyle } from "styled-components";
import { Rubik } from "next/font/google";
import lightenDarkenColor from "./utils/darkenColor";

const rubik = Rubik({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});
const rubikBold = Rubik({
  subsets: ["latin"],
  weight: "600",
  style: "normal",
});
const rubikItalic = Rubik({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export default createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --fontRegular: ${rubik.style.fontFamily};
  --fontBold: ${rubikBold.style.fontFamily};
  --fontItalic: ${rubikItalic.style.fontFamily};

  --bgColor: #4000EA;
  --bgDarker: ${lightenDarkenColor("#4000EA", -48)};
  --fontColor: #FFFFFF;
  --accentColor: #CCEB00;
  --hColor: #D800EB;
}

html {
  height: 100%;
}

body {
  background-color: var(--bgColor);
  font-family: var(--fontRegular);
  color: var(--fontColor);
  height: 100%;
  margin: 0;
  padding: 2%; 
}
  
#__next {
  height: 100%;
}

header {
  position: fixed;
  top: 0;
  margin-inline: -2%;
  padding: 0.5rem 2%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bgColor);
  h1 {
    display: inline-block;
    font-size: 1.5rem;
  }
}

main {
  overflow: auto; 
  height: 100%;
  padding-block: 40px 100px;
}

h1, h2, h3 {
  font-family: var(--fontBold);
  color: var(--accentColor);
  text-transform: uppercase;
  margin: 0;
}
`;
