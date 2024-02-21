import styled from "styled-components";
import getTheme from "@/utils/getTheme";

export default function ThemeButton({ colorTheme, theme, onSetTheme }) {
  return (
    <StyledThemeButton
      $activeTheme={colorTheme === theme}
      onClick={() => onSetTheme(colorTheme)}
    >
      <StyledColorContainer
        $color={getTheme(colorTheme).bgColor}
      ></StyledColorContainer>
      <StyledColorContainer
        $color={getTheme(colorTheme).fontColor}
      ></StyledColorContainer>
      <StyledColorContainer
        $color={getTheme(colorTheme).accentColor}
      ></StyledColorContainer>
      <StyledColorContainer
        $color={getTheme(colorTheme).hColor}
      ></StyledColorContainer>
    </StyledThemeButton>
  );
}

const StyledThemeButton = styled.button`
  all: unset;
  border: ${({ theme, $activeTheme }) =>
    $activeTheme
      ? "3px solid " + theme.accentColor
      : "1px solid " + theme.accentColor};
  display: flex;
  @media (hover: hover) {
    &:hover {
      cursor: ${({ $activeTheme }) => !$activeTheme && "pointer"};
    }
  }
`;

const StyledColorContainer = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${({ $color }) => $color};
`;
