import { devices } from "@/styles/devices";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const StyledTopList = styled.ol`
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: scroll;
  padding-inline: 0 2%;
  padding-block-end: 250px;
  margin-block-start: 0.5rem;
`;

export const TopListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-block-end: 0.5rem;
`;

export const StyledListItemLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-inline-end: 2%;
  margin-block-end: 0.5rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.fontColor};
  transition: background-color 0.7s;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    width: 40%;
  }
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.bgDarker};
      color: ${({ theme }) => theme.fontColor};
    }
  }
`;

export const NoStyleListItem = styled.li`
  list-style-type: none;
  padding-block-end: 0.2rem;
`;

export const NoStyleButton = styled.button`
  all: unset;
  color: ${({ theme }) => theme.hColor};
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const StyledTrackInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledArtist = styled.span`
  color: ${({ theme }) => theme.accentColor};
  font-size: 0.8rem;
`;

export const StyledListImage = styled(Image)`
  border-radius: 5px;
`;

export const StyledTopNumberContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.bgDarker};
  opacity: 65%;
  border-radius: 0px 5px 0px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTopNumber = styled.span`
  font-size: 0.7rem;
  opacity: 100%;
  transform: translate(-1px, 1px);
`;
