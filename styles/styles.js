import { createGlobalStyle } from "styled-components";
import { Rubik } from "next/font/google";
import lightenDarkenColor from "@/utils/darkenColor";

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

export const mainTheme = {
  title: "mainTheme",
  bgColor: "#4000EA",
  bgDarker: lightenDarkenColor("#4000EA", -48),
  fontColor: "#FFFFFF",
  accentColor: "#CCEB00",
  hColor: "#D800EB",
};

export const lightTheme = {
  title: "lightTheme",
  bgColor: "#f0edee",
  bgDarker: lightenDarkenColor("#f0edee", -48),
  fontColor: "#0a090c",
  accentColor: "#07393c",
  hColor: "#2c666e",
};

export const darkTheme = {
  title: "darkTheme",
  bgColor: "#171F26",
  bgDarker: "#0c1114",
  fontColor: "#f0edee",
  accentColor: "#8499bf",
  hColor: "#8F9BA6",
};

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
}

html {
  height: 100%;
}

body {
  background-color: ${({ theme }) => theme.bgColor};
  font-family: var(--fontRegular);
  color: ${({ theme }) => theme.fontColor};
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
  padding: 0.4rem 2% 0.2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
  h1 {
    display: inline-block;
    font-size: 1.5rem;
  }
}

main {
  height: 100%;
  padding-block: 3.5rem 0;
}

h1, h2, h3 {
  font-family: var(--fontBold);
  color: ${({ theme }) => theme.accentColor};
  text-transform: uppercase;
  margin: 0;
}

a {
  text-decoration: none;
  color: ${({ theme }) => theme.accentColor};
  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.hColor};
    }
  }
}
`;
