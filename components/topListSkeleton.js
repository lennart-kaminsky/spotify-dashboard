import { devices } from "@/styles/devices";
import styled from "styled-components";
import { StyledTopList } from "@/components/top.Styled";

export default function TopListSkeleton() {
  return (
    <>
      <StyledTopList>
        {Array.from({ length: 20 }, (_, index) => (
          <StyledListItemSkeleton key={index}>
            <StyledImageSkeleton />
            <StyledTextSkeleton />
          </StyledListItemSkeleton>
        ))}
      </StyledTopList>
    </>
  );
}

const StyledListItemSkeleton = styled.li`
  width: 98%;
  height: 50px;
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: 1rem;
  margin-inline-end: 2%;
  margin-block-end: 0.5rem;
  @media screen and (min-width: ${devices.desktop + "px"}) {
    width: 40%;
  }
`;

const StyledImageSkeleton = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.hColor};
  opacity: 20%;
  border-radius: 5px;
`;

const StyledTextSkeleton = styled.div`
  width: 100%;
  height: 25px;
  background-color: ${({ theme }) => theme.fontColor};
  opacity: 20%;
  border-radius: 5px;
  margin-inline-end: 1rem;
`;
