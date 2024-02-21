import { darkTheme, lightTheme, mainTheme } from "@/styles/styles";

export default function getTheme(colorTheme) {
  if (colorTheme === "mainTheme") {
    return mainTheme;
  } else if (colorTheme === "lightTheme") {
    return lightTheme;
  } else {
    return darkTheme;
  }
}
