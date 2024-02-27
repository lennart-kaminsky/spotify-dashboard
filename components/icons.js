import styled from "styled-components";

const icons = {
  cancel: {
    title: "cancel",
    viewBox: "0 -960 960 960",
    path: "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z",
  },
  recently: {
    title: "recently",
    viewBox: "0 -960 960 960",
    path: "M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z",
  },
  back: {
    title: "back",
    viewBox: "0 -960 960 960",
    path: "m368-417 202 202-90 89-354-354 354-354 90 89-202 202h466v126H368Z",
  },
};

export default function Icon({ variant, size = 50, ...rest }) {
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icons[variant].viewBox}
      width={size}
      {...rest}
    >
      <title>{icons[variant].viewBox}</title>
      <path d={icons[variant].path} />
    </StyledSVG>
  );
}

const StyledSVG = styled.svg`
  fill: ${({ theme }) => theme.accentColor};
  &:active {
    fill: ${({ theme }) => theme.hColor};
  }
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      fill: ${({ theme }) => theme.hColor};
    }
  }
`;
