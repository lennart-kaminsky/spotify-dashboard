import { darkTheme, lightTheme, mainTheme } from "@/styles/styles";

export default function getTheme(colorTheme) {
  if (colorTheme === "darkTheme") {
    return darkTheme;
  } else if (colorTheme === "lightTheme") {
    return lightTheme;
  } else {
    return mainTheme;
  }
}
