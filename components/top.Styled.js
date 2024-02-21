import styled from "styled-components";

export const StyledTopList = styled.ol`
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: scroll;
  padding-inline: 30px 15px;
  padding-block-end: 250px;
  margin-block-start: 0.5rem;
`;

export const TopListItem = styled.li`
  padding-block-end: 0.2rem;
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
