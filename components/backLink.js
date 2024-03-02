import Link from "next/link";
import styled from "styled-components";
import { devices } from "@/styles/devices";
import Icon from "@/components/icons";

export default function BackLink({ children, infoPage, prevPage }) {
  const path = infoPage ? prevPage : "/";

  return (
    <StyledLink href={path} $infoPage={infoPage}>
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
  position: ${({ $infoPage }) => $infoPage && "fixed"};
  bottom: ${({ $infoPage }) => $infoPage && "2rem"};
  @media screen and (min-width: ${devices.desktop + "px"}) {
    position: fixed;
    left: 2%;
    top: ${({ $infoPage }) => ($infoPage ? "100px" : "130px")};
    align-self: flex-start;
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
