import Image from "next/image";
import styled from "styled-components";
import { devices } from "@/styles/devices";

export const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-block-start: 2rem;
`;

export const StyledInfoImage = styled(Image)`
  border-radius: ${({ $record }) => ($record ? "5px" : "100%")};
  width: 150px;
  height: 150px;
  object-fit: cover;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    width: 300px;
    height: 300px;
  }
`;

export const StyledHeadlineContainer = styled.a`
  text-align: center;
  position: relative;
  h2 {
    display: inline;
  }
  @media (hover: hover) {
    &:hover * {
      color: ${({ theme }) => theme.hColor};
      fill: ${({ theme }) => theme.hColor};
    }
  }
`;

export const StyledTable = styled.table`
  table-layout: fixed;
  th {
    font-family: var(--fontBold);
    color: ${({ theme }) => theme.accentColor};
    text-align: start;
    vertical-align: top;
  }
  td {
    padding-inline: 1rem;
    padding-block: 0 1rem;
  }
  ul {
    all: unset;
    max-width: 400px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  li {
    padding-inline: 0.2rem;
  }
`;
