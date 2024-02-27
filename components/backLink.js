import styled from "styled-components";
import Link from "next/link";
import { devices } from "@/styles/devices";
import Icon from "./icons";

export default function BackLink({ children, artistpage }) {
  return (
    <StyledLink href="/" $artistpage={artistpage}>
      <StyledInnerLinkContainer>
        <StyledIcon variant="back" size="1rem" />
        {children}
      </StyledInnerLinkContainer>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  display: inline-block;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.hColor};
  transition: letter-spacing 1s;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    position: fixed;
    left: 2%;
    top: ${({ $artistpage }) => ($artistpage ? "100px" : "130px")};
  }
  @media (hover: hover) {
    &:hover {
      letter-spacing: 0.4rem;
    }
  }
`;
const StyledIcon = styled(Icon)`
  fill: ${({ theme }) => theme.hColor};
`;

const StyledInnerLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;
